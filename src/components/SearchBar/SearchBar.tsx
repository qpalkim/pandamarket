import { useRef, useState } from "react";
import { Search, X } from "lucide-react";
import styles from "./SearchBar.module.scss";

export default function SearchBar({
  onSearch,
}: {
  onSearch(term: string): void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedValue = value.trim();

    onSearch(trimmedValue);
    inputRef.current?.blur();
  };

  return (
    <form
      role="search"
      onSubmit={handleSearchSubmit}
      className={styles.container}
    >
      <input
        type="search"
        className={styles.searchBar}
        ref={inputRef}
        inputMode="search"
        enterKeyHint="search"
        aria-label="검색어 입력"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="검색어를 입력해 주세요"
      />
      <Search aria-hidden className={styles.searchIcon} />
      {value && (
        <button
          type="button"
          aria-label="검색어 삭제"
          onClick={() => {
            setValue("");
            inputRef.current?.focus();
          }}
          className={styles.clearButton}
        >
          <X className={styles.clearIcon} />
        </button>
      )}
    </form>
  );
}
