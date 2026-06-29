import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { BaseArticle, OrderBy } from "@/types/article";
import { getArticleList } from "@/api/article";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import BestBoardItem from "@/components/BestBoardItem/BestBoardItem";
import BoardItem from "@/components/BoardItem/BoardItem";
import Button from "@/components/Button/Button";
import SearchBar from "@/components/SearchBar/SearchBar";
import SelectOption from "@/components/SelectOption/SelectOption";
import Pagination from "@/components/Pagination/Pagination";
import empty from "@/assets/icons/defaultProduct.svg";
import styles from "./BoardsPage.module.scss";

const options = [
  { label: "최신순", value: "recent" },
  { label: "좋아요순", value: "like" },
];

export default function BoardsPage() {
  const [bestBoards, setBestBoards] = useState<BaseArticle[]>([]);
  const [allBoards, setAllBoards] = useState<BaseArticle[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState<OrderBy>("recent");
  const [keyword, setKeyword] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width:1199px)");

  const bestBoardCount = isMobile ? 1 : isTablet ? 2 : 3;
  const totalPages = Math.max(1, Math.ceil(totalCount / 6));

  const fetchBestBoards = async () => {
    const response = await getArticleList({
      page: 1,
      pageSize: 3,
      orderBy: "like",
    });

    setBestBoards(response.list);
  };

  const fetchAllBoards = async ({
    page,
    orderBy,
    keyword,
  }: {
    page?: number;
    orderBy?: OrderBy;
    keyword?: string;
  }) => {
    const response = await getArticleList({
      page: page ?? currentPage,
      pageSize: 6,
      orderBy,
      keyword,
    });

    setAllBoards(response.list);
    setTotalCount(response.totalCount);
  };

  const handleSearch = (term: string) => {
    setKeyword(term);
    setCurrentPage(1);
  };

  const handleOrderChange = (value: OrderBy) => {
    setCurrentPage(1);
    setOrderBy(value);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBestBoards();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAllBoards({
      page: currentPage,
      orderBy,
      keyword,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, orderBy, keyword]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>베스트 게시글</h2>
      <div className={styles.bestBoardList}>
        {bestBoards.slice(0, bestBoardCount).map((board) => (
          <BestBoardItem key={board.id} {...board} />
        ))}
      </div>

      <div className={styles.titleRow}>
        <h2 className={styles.title}>게시글</h2>
        <Link to="/addboard">
          <Button size="sm">글쓰기</Button>
        </Link>
      </div>
      <div className={styles.controls}>
        <SearchBar onSearch={handleSearch} />
        <SelectOption
          options={options}
          value={orderBy}
          onSelect={(opt) => handleOrderChange(opt.value as OrderBy)}
        />
      </div>

      {totalCount === 0 ? (
        <div className={styles.empty}>
          <img src={empty} alt="검색 결과 0개 이미지" />
          {`'${keyword}'에 대한 검색 결과가 없어요.`}
        </div>
      ) : (
        <>
          <div className={styles.allBoardList}>
            {allBoards.map((board) => (
              <BoardItem key={board.id} {...board} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
