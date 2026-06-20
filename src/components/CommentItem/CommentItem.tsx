import { useState } from "react";
import type { BaseComment } from "@/types/comment";
import { formatTime } from "@/utils/formatTime";
import ProfileImage from "@/components/ProfileImage/ProfileImage";
import Dropdown from "@/components/Dropdown/Dropdown";
import DeleteItemModal from "@/components/DeleteItemModal/DeleteItemModal";
import styles from "./CommentItem.module.scss";

interface CommentItemProps extends BaseComment {
  isMine: boolean;
  onDelete: (id: number) => Promise<void>;
}

export default function CommentItem({
  id,
  writer,
  content,
  createdAt,
  updatedAt,
  isMine,
  onDelete,
}: CommentItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { label: "수정하기", onClick: () => {} },
    { label: "삭제하기", onClick: () => setIsOpen(true) },
  ];

  const handleDelete = async () => {
    await onDelete(id);
    setIsOpen(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.author}>
            <ProfileImage src={writer.image} />
            <div className={styles.authorInfo}>
              <p className={styles.authorName}>{writer.nickname}</p>
              <time>{formatTime(updatedAt || createdAt)}</time>
            </div>
          </div>
          {isMine && <Dropdown options={options} />}
        </div>
        <p className={styles.content}>{content}</p>
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
