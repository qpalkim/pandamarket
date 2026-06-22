import { useParams } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import CommentSection from "./CommentSection";
import styles from "./ItemDetailPage.module.scss";

export default function ItemDetailPage() {
  const { productId } = useParams();

  return (
    <div className={styles.container}>
      <ProductDetail productId={Number(productId)} />
      <CommentSection productId={Number(productId)} />
    </div>
  );
}
