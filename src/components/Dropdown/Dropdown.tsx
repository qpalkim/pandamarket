import useClickOutside from "@/hooks/useClickOutside";
import { useRef, useState } from "react";
import styles from "./Dropdown.module.scss";
import { EllipsisVertical } from "lucide-react";

interface DropdownOption {
  label: string;
  onClick: () => void;
}

interface DropdownProps {
  options: DropdownOption[];
  trigger?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function Dropdown({
  options,
  trigger,
  isOpen: controlledOpen,
  onOpenChange,
}: DropdownProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isOpen = controlledOpen ?? internalOpen;

  const setIsOpen = (open: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(open);
    onOpenChange?.(open);
  };

  useClickOutside(ref, () => setIsOpen(false));

  return (
    <div ref={ref} className={styles.triggerWrapper}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.triggerContent}
      >
        {trigger ?? (
          <EllipsisVertical aria-label="더보기 옵션" className={styles.icon} />
        )}
      </button>

      {isOpen && (
        <ul className={styles.menu}>
          {options.map((option) => (
            <li key={option.label}>
              <button
                className={styles.option}
                onClick={() => {
                  option.onClick();
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
