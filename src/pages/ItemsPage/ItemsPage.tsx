import { useEffect, useState } from "react";
import type { OrderBy, ProductListItem } from "@/types/product";
import { getProductList } from "@/api/product";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import ProductItem from "@/components/ProductItem/ProductItem";
import Button from "@/components/Button/Button";
import SearchBar from "@/components/SearchBar/SearchBar";
import SelectOption from "@/components/SelectOption/SelectOption";
import Pagination from "@/components/Pagination/Pagination";
import empty from "@/assets/icons/defaultProduct.svg";
import styles from "./ItemsPage.module.scss";

const options = [
  { label: "최신순", value: "recent" },
  { label: "좋아요순", value: "favorite" },
];

export default function ItemsPage() {
  const [bestProducts, setBestProducts] = useState<ProductListItem[]>([]);
  const [allProducts, setAllProducts] = useState<ProductListItem[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState<OrderBy>("recent");
  const [keyword, setKeyword] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width:1199px)");

  const bestProductCount = isMobile ? 1 : isTablet ? 2 : 4;
  const allProductCount = isMobile ? 4 : isTablet ? 6 : 10;
  const totalPages = Math.ceil(totalCount / allProductCount);

  const fetchBestProducts = async () => {
    const response = await getProductList({
      page: 1,
      pageSize: 4,
      orderBy: "favorite",
    });

    setBestProducts(response.list);
  };

  const fetchAllProducts = async ({
    page,
    orderBy,
    keyword,
  }: {
    page?: number;
    orderBy?: OrderBy;
    keyword?: string;
  }) => {
    const response = await getProductList({
      page: page ?? currentPage,
      pageSize: allProductCount,
      orderBy: orderBy ?? "recent",
      keyword,
    });

    setAllProducts(response.list);
    setTotalCount(response.totalCount);
  };

  const handleSearch = async (term: string) => {
    setKeyword(term);
    setCurrentPage(1);

    await fetchAllProducts({
      keyword: term,
      page: 1,
      orderBy,
    });
  };

  const handleOrderChange = (value: OrderBy) => {
    setCurrentPage(1);
    setOrderBy(value);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBestProducts();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAllProducts({
      page: currentPage,
      orderBy,
      keyword,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, orderBy, keyword, allProductCount]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>베스트 상품</h2>
      <div className={styles.bestProductList}>
        {bestProducts.slice(0, bestProductCount).map((product) => (
          <ProductItem key={product.id} {...product} />
        ))}
      </div>

      {isMobile ? (
        <div className={styles.menu}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>전체 상품</h2>
            <Button size="sm">상품 등록하기</Button>
          </div>

          <div className={styles.order}>
            <SearchBar onSearch={handleSearch} />
            <SelectOption
              options={options}
              value={orderBy}
              onSelect={(opt) => handleOrderChange(opt.value as OrderBy)}
            />
          </div>
        </div>
      ) : (
        <div className={styles.toolbar}>
          <h2 className={styles.title}>전체 상품</h2>
          <div className={styles.controls}>
            <Button size="sm">상품 등록하기</Button>
            <SearchBar onSearch={handleSearch} />
            <SelectOption
              options={options}
              value={orderBy}
              onSelect={(opt) => handleOrderChange(opt.value as OrderBy)}
            />
          </div>
        </div>
      )}

      {totalCount === 0 ? (
        <div className={styles.empty}>
          <img src={empty} alt="검색 결과 0개 이미지" />
          {`'${keyword}'에 대한 검색 결과가 없어요.`}
        </div>
      ) : (
        <>
          <div className={styles.allProductList}>
            {allProducts.map((product) => (
              <ProductItem key={product.id} {...product} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
}
