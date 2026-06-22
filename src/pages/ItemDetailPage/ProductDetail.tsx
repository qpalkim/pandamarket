import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import type { GetProductDetailResponse } from "@/types/product";
import {
  addLikeProduct,
  deleteLikeProduct,
  deleteProduct,
  getProductDetail,
} from "@/api/product";
import { useAuth } from "@/hooks/useAuth";
import { formatTime } from "@/utils/formatTime";
import ProfileImage from "@/components/ProfileImage/ProfileImage";
import Dropdown from "@/components/Dropdown/Dropdown";
import DeleteItemModal from "@/components/DeleteItemModal/DeleteItemModal";
import defaultProduct from "@/assets/icons/defaultProduct.svg";
import styles from "./ProductDetail.module.scss";

export default function ProductDetail({ productId }: { productId: number }) {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [product, setProduct] = useState<GetProductDetailResponse | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { label: "수정하기", onClick: () => {} },
    { label: "삭제하기", onClick: () => setIsOpen(true) },
  ];

  // 상품 상세 정보 함수
  const fetchProduct = async () => {
    try {
      const response = await getProductDetail(productId);
      setProduct(response);
    } catch (error) {
      console.error(error);
    }
  };

  // 좋아요 등록/삭제 함수
  const handleLike = async () => {
    try {
      if (product.isFavorite) {
        await deleteLikeProduct(product.id);

        setProduct((prev) =>
          prev
            ? {
                ...prev,
                isFavorite: false,
                favoriteCount: Math.max(prev.favoriteCount - 1, 0),
              }
            : prev,
        );
      } else {
        await addLikeProduct(product.id);

        setProduct((prev) =>
          prev
            ? {
                ...prev,
                isFavorite: true,
                favoriteCount: prev.favoriteCount + 1,
              }
            : prev,
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 상품 삭제 함수
  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(product.id);

      setIsOpen(false);
      navigate("/items");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  if (!product) return <div>로딩 중</div>;

  const isMyProduct = user?.id === product.ownerId;

  return (
    <>
      <div className={styles.productWrapper}>
        <div className={styles.imageWrapper}>
          <img
            src={product.images[0] ?? defaultProduct}
            alt={product.name ?? "상품 이미지"}
            className={styles.productImage}
          />
        </div>
        <div className={styles.productInfo}>
          <div className={styles.productHeader}>
            <h1 className={styles.name}>{product.name}</h1>
            {isMyProduct && <Dropdown options={options} />}
          </div>
          <h4 className={styles.price}>{product.price.toLocaleString()}원</h4>
          <h6 className={styles.sectionTitle}>상품 소개</h6>
          <p className={styles.desc}>{product.description} </p>

          <h6 className={styles.sectionTitle}>상품 태그</h6>
          <div className={styles.tagWrapper}>
            {product.tags.map((tag) => (
              <span key={tag} className={styles.tags}>
                #{tag}
              </span>
            ))}
          </div>

          <div className={styles.profile}>
            <div className={styles.author}>
              <ProfileImage src={null} size="lg" />
              <div className={styles.authorInfo}>
                <p className={styles.authorName}>{product.ownerNickname}</p>
                <time>{formatTime(product.createdAt)}</time>
              </div>
            </div>

            <div>
              <button
                type="button"
                className={styles.likeButton}
                onClick={handleLike}
              >
                <Heart
                  className={styles.likeIcon}
                  fill={product.isFavorite ? "currentColor" : "none"}
                />
                <span>{product.favoriteCount}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <DeleteItemModal
          onClose={() => setIsOpen(false)}
          onDelete={handleDeleteProduct}
        />
      )}
    </>
  );
}
