import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useClickOutside } from "@/hooks/useClickOutside";
import styles from "./Modal.module.scss";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, onClose);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return createPortal(
    <div role="dialog" aria-modal="true" className={styles.overlay}>
      <div ref={ref} className={styles.modal}>
        {children}
      </div>
    </div>,
    document.body,
  );
}
