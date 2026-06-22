import { useState } from "react";
import type { BaseComment } from "@/types/comment";
import { formatTime } from "@/utils/formatTime";
import { validateComment } from "@/utils/validate";
import ProfileImage from "@/components/ProfileImage/ProfileImage";
import Dropdown from "@/components/Dropdown/Dropdown";
import DeleteItemModal from "@/components/DeleteItemModal/DeleteItemModal";
import Textarea from "../Textarea/Textarea";
import Button from "../Button/Button";
import styles from "./CommentItem.module.scss";

interface CommentItemProps extends BaseComment {
  isMine: boolean;
  onUpdate: (id: number, content: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export default function CommentItem({
  id,
  writer,
  content,
  createdAt,
  updatedAt,
  isMine,
  onUpdate,
  onDelete,
}: CommentItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [contentTouched, setContentTouched] = useState(false);
  const [serverError, setServerError] = useState("");

  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  const options = [
    {
      label: "수정하기",
      onClick: () => {
        setEditedContent(content);
        setIsEditing(true);
      },
    },
    { label: "삭제하기", onClick: () => setIsOpen(true) },
  ];

  const isCommentValid =
    editedContent.trim().length > 0 && !validateComment(editedContent);

  const handleUpdate = async () => {
    setContentTouched(true);
    setServerError("");

    if (!isCommentValid) return;

    try {
      setIsUpdateLoading(true);
      await onUpdate(id, editedContent);
      setIsEditing(false);
      setContentTouched(false);
      setServerError("");
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError("문의 댓글 수정을 실패했습니다.");
      }
    } finally {
      setIsUpdateLoading(false);
    }
  };

  const handleDelete = async () => {
    setServerError("");

    try {
      await onDelete(id);

      setIsOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError("문의 댓글 삭제에 실패했습니다.");
      }
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.author}>
            <ProfileImage src={writer.image} />
            <div className={styles.authorInfo}>
              <p className={styles.authorName}>{writer.nickname}</p>
              <time>
                {formatTime(updatedAt)}
                {updatedAt !== createdAt && "(수정됨)"}
              </time>
            </div>
          </div>
          {isMine && <Dropdown options={options} />}
        </div>
        {isEditing ? (
          <>
            <Textarea
              placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
              value={editedContent}
              onChange={(e) => {
                setEditedContent(e.target.value);
                setServerError("");
              }}
              onBlur={() => setContentTouched(true)}
              error={
                serverError ||
                (contentTouched ? validateComment(editedContent) : "")
              }
            />
            <div className={styles.buttonWrapper}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditedContent(content);
                  setIsEditing(false);
                }}
              >
                취소
              </Button>
              <Button
                onClick={handleUpdate}
                isLoading={isUpdateLoading}
                disabled={
                  !isCommentValid ||
                  editedContent.trim() === content.trim() ||
                  isUpdateLoading
                }
                size="sm"
              >
                수정
              </Button>
            </div>
          </>
        ) : (
          <p className={styles.content}>{content}</p>
        )}
      </div>

      {isOpen && (
        <DeleteItemModal
          isComment
          onClose={() => setIsOpen(false)}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}
