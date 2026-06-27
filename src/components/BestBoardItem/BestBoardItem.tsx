import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import type { BaseArticle } from "@/types/article";
import bestBadge from "@/assets/icons/bestBadge.svg";
import defaultProduct from "@/assets/icons/defaultProduct.svg";
import styles from "./BestBoardItem.module.scss";

export default function BestBoardItem({
  id,
  title,
  image,
  likeCount,
}: BaseArticle) {
  return (
    <Link to={`/board/${id}`} className={styles.container}>
      <div className={styles.badge}>
        <img
          src={bestBadge}
          alt="베스트 뱃지 아이콘"
          className={styles.badgeIcon}
        />
        <span>Best</span>
      </div>
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
      <div className={styles.like}>
        <Heart className={styles.likeIcon} />
        <span className={styles.likeCount}>{likeCount}</span>
      </div>
    </Link>
  );
}
