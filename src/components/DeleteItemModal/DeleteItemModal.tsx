import { AlertCircle } from "lucide-react";
import Modal from "@/components/Modal/Modal";
import Button from "@/components/Button/Button";
import styles from "./DeleteItemModal.module.scss";

interface DeleteItemModalProps {
  onClose: () => void;
  onDelete: () => void;
  isComment?: boolean;
}

export default function DeleteItemModal({
  onClose,
  onDelete,
  isComment,
}: DeleteItemModalProps) {
  return (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.alertWrapper}>
          <AlertCircle className={styles.icon} aria-hidden="true" />
        </div>
        <div className={styles.content}>
          <h2 aria-labelledby="delete-modal-title" className={styles.title}>
            {isComment
              ? "문의를 삭제하시겠습니까?"
              : "등록한 상품을 삭제하시겠습니까?"}
          </h2>
          <p className={styles.desc}>삭제 후, 복구할 수 없습니다.</p>
        </div>
        <div className={styles.buttonWrapper}>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            ariaLabel="삭제 취소"
          >
            취소하기
          </Button>
          <Button size="sm" onClick={onDelete} ariaLabel="삭제 확인">
            삭제하기
          </Button>
        </div>
      </div>
    </Modal>
  );
}
