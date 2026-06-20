import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Heart } from "lucide-react";
import type { GetProductDetailResponse } from "@/types/product";
import type { BaseComment } from "@/types/comment";
import {
  getProductDetail,
  addLikeProduct,
  deleteLikeProduct,
} from "@/api/product";
import { getProductCommentList } from "@/api/comment";
import { useAuth } from "@/hooks/useAuth";
import { formatTime } from "@/utils/formatTime";
import CommentItem from "@/components/CommentItem/CommentItem";
import ProfileImage from "@/components/ProfileImage/ProfileImage";
import Textarea from "@/components/Textarea/Textarea";
import Button from "@/components/Button/Button";
import defaultProduct from "@/assets/icons/defaultProduct.svg";
import empty from "@/assets/icons/defaultComment.svg";
import styles from "./ItemDetailPage.module.scss";
import Dropdown from "@/components/Dropdown/Dropdown";

const options = [
  { label: "수정하기", onClick: () => {} },
  { label: "삭제하기", onClick: () => {} },
];

export default function ItemDetailPage() {
  const { productId } = useParams();

  const { user } = useAuth();

  const [product, setProduct] = useState<GetProductDetailResponse | null>(null);
  const [comments, setComments] = useState<BaseComment[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProduct = async () => {
    if (!productId) return;

    try {
      const response = await getProductDetail(Number(productId));
      setProduct(response);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCommentList = async () => {
    if (!productId) return;

    try {
      const res = await getProductCommentList({
        productId: Number(productId),
        limit: 6,
      });

      setComments(res.list);
      setNextCursor(res.nextCursor);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMoreComments = async () => {
    if (!productId) return;
    if (nextCursor === null || isLoading) return;

    try {
      setIsLoading(true);

      const res = await getProductCommentList({
        productId: Number(productId),
        limit: 6,
        cursor: nextCursor,
      });

      setComments((prev) => [...prev, ...res.list]);
      setNextCursor(res.nextCursor);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async () => {
    if (!product) return;

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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProduct();
    fetchCommentList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  if (!product) return <div>로딩 중</div>;

  const isMyProduct = user?.id === product.ownerId;

  return (
    <div className={styles.container}>
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

      <div className={styles.commentWrapper}>
        <div className={styles.addComment}>
          <h6 className={styles.sectionTitle}>문의하기</h6>
          <Textarea placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다." />
          <Button size="sm" disabled>
            등록
          </Button>
        </div>

        {comments.length === 0 ? (
          <div className={styles.empty}>
            <img src={empty} alt="" />
            아직 문의가 없어요.
          </div>
        ) : (
          <>
            <div className={styles.commentList}>
              {comments.map((comment) => (
                <CommentItem key={comment.id} isMine={false} {...comment} />
              ))}
            </div>

            {nextCursor !== null && (
              <div className={styles.commentMoreButton}>
                <Button
                  variant="outline"
                  onClick={fetchMoreComments}
                  isLoading={isLoading}
                >
                  댓글 더보기
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
