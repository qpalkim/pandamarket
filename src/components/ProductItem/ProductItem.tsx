import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import type { ProductListItem } from "@/types/product";
import defaultProduct from "@/assets/icons/defaultProduct.svg";
import styles from "./ProductItem.module.scss";

export default function ProductItem({
  id,
  images,
  name,
  price,
  favoriteCount,
}: ProductListItem) {
  return (
    <Link to={`/items/${id}`} className={styles.container}>
      <div className={styles.imageWrapper}>
        <img
          src={images[0] || defaultProduct}
          alt={name}
          className={styles.image}
          onError={(e) => {
            e.currentTarget.src = defaultProduct;
          }}
        />
      </div>
      <p className={styles.name}>{name}</p>
      <p className={styles.price}>{price.toLocaleString()}원</p>
      <div className={styles.like}>
        <Heart className={styles.likeIcon} />
        <span className={styles.likeCount}>{favoriteCount}</span>
      </div>
    </Link>
  );
}
