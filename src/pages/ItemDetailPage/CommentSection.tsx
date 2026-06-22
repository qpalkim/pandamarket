import { useEffect, useState } from "react";
import type { BaseComment } from "@/types/comment";
import {
  getProductCommentList,
  deleteComment,
  addProductComment,
  updateComment,
} from "@/api/comment";
import { useAuth } from "@/hooks/useAuth";
import { validateComment } from "@/utils/validate";
import CommentItem from "@/components/CommentItem/CommentItem";
import Textarea from "@/components/Textarea/Textarea";
import Button from "@/components/Button/Button";
import empty from "@/assets/icons/defaultComment.svg";
import styles from "./CommentSection.module.scss";

export default function CommentSection({ productId }: { productId: number }) {
  const { user } = useAuth();

  const [comments, setComments] = useState<BaseComment[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [isMoreCommentsLoading, setIsMoreCommentsLoading] = useState(false);

  const [commentContent, setCommentContent] = useState("");
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [valueTouched, setValueTouched] = useState(false);

  const isCommentValid =
    commentContent.trim().length > 0 && !validateComment(commentContent);

  // 상품 문의 댓글 함수
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

  // 문의 댓글 더보기 함수
  const fetchMoreComments = async () => {
    if (!productId) return;
    if (nextCursor === null || isMoreCommentsLoading) return;

    try {
      setIsMoreCommentsLoading(true);

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
      setIsMoreCommentsLoading(false);
    }
  };

  // 문의 댓글 삭제 함수
  const handleDeleteComment = async (id: number) => {
    try {
      await deleteComment(id);

      setComments((prev) => prev.filter((comment) => comment.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // 문의 댓글 등록 함수
  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setValueTouched(true);
    setServerError("");

    if (!productId || !isCommentValid) return;

    try {
      setIsSubmitLoading(true);

      const newComment = await addProductComment(Number(productId), {
        content: commentContent,
      });

      setComments((prev) => [newComment, ...prev]);

      setCommentContent("");
      setValueTouched(false);
      setServerError("");
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError("문의 댓글 등록을 실패했습니다.");
      }
    } finally {
      setIsSubmitLoading(false);
    }
  };

  // 문의 댓글 수정 함수
  const handleUpdateComment = async (id: number, content: string) => {
    try {
      const updatedComment = await updateComment(id, {
        content,
      });

      setComments((prev) =>
        prev.map((comment) => (comment.id === id ? updatedComment : comment)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCommentList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return (
    <div className={styles.commentWrapper}>
      <form className={styles.addComment} onSubmit={handleSubmitComment}>
        <h6 className={styles.sectionTitle}>문의하기</h6>
        <Textarea
          value={commentContent}
          onChange={(e) => {
            setCommentContent(e.target.value);
            setServerError("");
          }}
          onBlur={() => setValueTouched(true)}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          error={
            serverError || (valueTouched ? validateComment(commentContent) : "")
          }
        />
        <Button
          type="submit"
          size="sm"
          disabled={!isCommentValid || isSubmitLoading}
          isLoading={isSubmitLoading}
        >
          등록
        </Button>
      </form>

      {comments.length === 0 ? (
        <div className={styles.empty}>
          <img src={empty} alt="" />
          아직 문의가 없어요.
        </div>
      ) : (
        <>
          <div className={styles.commentList}>
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                isMine={user?.id === comment.writer.id}
                onUpdate={handleUpdateComment}
                onDelete={handleDeleteComment}
                {...comment}
              />
            ))}
          </div>

          {nextCursor !== null && (
            <div className={styles.commentMoreButton}>
              <Button
                variant="outline"
                onClick={fetchMoreComments}
                isLoading={isMoreCommentsLoading}
              >
                댓글 더보기
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
