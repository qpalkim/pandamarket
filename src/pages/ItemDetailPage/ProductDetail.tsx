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
  const navigate = useNavigate();

  const { user } = useAuth();

  const [product, setProduct] = useState<GetProductDetailResponse | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // 좋아요 등록/삭제 함수
  const handleLike = async () => {
    if (!user) {
      alert("로그인 후, 이용 가능합니다.");
      return;
    }

    if (!product) return;

    try {
      await (product.isFavorite
        ? deleteLikeProduct(product.id)
        : addLikeProduct(product.id));

      setProduct((prev) => {
        if (!prev) return prev;

        const isFavorite = !prev.isFavorite;

        return {
          ...prev,
          isFavorite,
          favoriteCount: isFavorite
            ? prev.favoriteCount + 1
            : Math.max(prev.favoriteCount - 1, 0),
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  // 상품 삭제 함수
  const handleDeleteProduct = async () => {
    if (!product) return;

    try {
      await deleteProduct(product.id);

      setIsOpen(false);
      navigate("/items");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // 상품 상세 정보 함수
    const fetchProduct = async () => {
      try {
        const res = await getProductDetail(productId);
        setProduct(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) return <div>로딩 중</div>;

  const options = [
    { label: "수정하기", onClick: () => navigate(`/edititem/${productId}`) },
    { label: "삭제하기", onClick: () => setIsOpen(true) },
  ];

  const isMyProduct = user?.id === product.ownerId;

  return (
    <>
      <div className={styles.productWrapper}>
        <div className={styles.imageWrapper}>
          <img
            src={product.images[0] || defaultProduct}
            alt={product.name}
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

      {isOpen && (
        <DeleteItemModal
          onClose={() => setIsOpen(false)}
          onDelete={handleDeleteProduct}
        />
      )}
    </>
  );
}
