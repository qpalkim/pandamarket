import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import type { BaseArticle } from "@/types/article";
import { formatTime } from "@/utils/formatTime";
import ProfileImage from "@/components/ProfileImage/ProfileImage";
import defaultProduct from "@/assets/icons/defaultProduct.svg";
import styles from "./BoardItem.module.scss";

export default function BoardItem({
  id,
  title,
  writer,
  likeCount,
  image,
  updatedAt,
}: BaseArticle) {
  return (
    <Link to={`/board/${id}`} className={styles.container}>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <img
          src={image || defaultProduct}
          alt={title}
          className={styles.productImage}
          onError={(e) => {
            e.currentTarget.src = defaultProduct;
          }}
        />
      </div>
      <div className={styles.author}>
        <div className={styles.authorInfo}>
          <ProfileImage src={null} />
          <p className={styles.authorName}>{writer.nickname}</p>
          <time>{formatTime(updatedAt)}</time>
        </div>
        <div className={styles.like}>
          <Heart className={styles.likeIcon} />
          <span className={styles.likeCount}>{likeCount}</span>
        </div>
      </div>
    </Link>
  );
}
