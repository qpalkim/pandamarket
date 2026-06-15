import { useParams } from "react-router-dom";

export default function ItemDetailPage() {
  const { productId } = useParams();

  return <div>{productId}번 상품 상세 페이지</div>;
}
