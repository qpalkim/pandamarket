import { useState } from "react";
import { ArrowUpNarrowWide, ChevronDown } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Dropdown from "../Dropdown/Dropdown";
import styles from "./SelectOption.module.scss";

interface Option {
  label: string;
  value: string | number;
}

interface SelectOptionProps {
  options: Option[];
  value: string | number;
  onSelect: (option: Option) => void;
  disabled?: boolean;
}

export default function SelectOption({
  options,
  value,
  onSelect,
  disabled,
}: SelectOptionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selected = options.find((opt) => opt.value === value) ?? options[0];

  const isMobile = useMediaQuery("(max-width: 767px)");

  const dropdownOptions = options.map((opt) => ({
    label: opt.label,
    onClick: () => {
      onSelect(opt);
      setIsOpen(false);
    },
  }));

  return (
    <Dropdown
      options={dropdownOptions}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      trigger={
        <button
          className={`${styles.container} ${disabled ? styles.disabled : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label="옵션 선택"
        >
          {isMobile ? (
            <ArrowUpNarrowWide
              aria-hidden
              className={`${styles.icon} ${isOpen ? styles.open : ""}`}
            />
          ) : (
            <>
              <span className={styles.label}>{selected.label}</span>
              <ChevronDown
                aria-hidden
                className={`${styles.icon} ${isOpen ? styles.open : ""}`}
              />
            </>
          )}
        </button>
      }
    />
  );
}
