import ProfileImage from "@/components/ProfileImage/ProfileImage";
import Dropdown from "@/components/Dropdown/Dropdown";
import styles from "./CommentItem.module.scss";

interface CommentItemProps {
  images: string | null;
  name: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isMine: boolean;
}

const options = [
  { label: "수정하기", onClick: () => {} },
  { label: "삭제하기", onClick: () => {} },
];

export default function CommentItem({
  images,
  name,
  content,
  createdAt,
  updatedAt,
  isMine,
}: CommentItemProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.author}>
          <ProfileImage src={images} />
          <div className={styles.authorInfo}>
            <p className={styles.authorName}>{name}</p>
            <time>{updatedAt || createdAt}</time>
          </div>
        </div>
        {isMine && <Dropdown options={options} />}
      </div>
      <p className={styles.content}>{content}</p>
    </div>
  );
}
