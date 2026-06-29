import { useParams } from "react-router-dom";

export default function BoardDetailPage() {
  const { boardId } = useParams();

  return (
    <>
      <div>{boardId}번째 게시글</div>
    </>
  );
}
