import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  disabled?: boolean;
}

const PAGE_COUNT = 5;

export default function Pagination({
  currentPage,
  totalPages,
  onChange,
  disabled,
}: PaginationProps) {
  const currentGroup = Math.ceil(currentPage / PAGE_COUNT);
  const firstPage = (currentGroup - 1) * PAGE_COUNT + 1;
  const lastPage = Math.min(firstPage + PAGE_COUNT - 1, totalPages);

  const pages = Array.from(
    { length: lastPage - firstPage + 1 },
    (_, i) => firstPage + i,
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onChange(page);
  };

  return (
    <nav aria-label="페이지네이션" className={styles.container}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={disabled || currentPage === 1}
        aria-label="이전 페이지로 이동"
        className={styles.navButton}
      >
        <ChevronLeft className={styles.icon} aria-hidden />
      </button>

      <div className={styles.pages}>
        {pages.map((page) => (
          <button
            key={page}
            disabled={disabled}
            onClick={() => handlePageChange(page)}
            className={styles.pageButton}
            aria-label={`${page} 페이지`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={disabled || currentPage === totalPages}
        aria-label="다음 페이지로 이동"
        className={styles.navButton}
      >
        <ChevronRight className={styles.icon} aria-hidden />
      </button>
    </nav>
  );
}
