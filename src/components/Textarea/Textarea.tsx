import {
  forwardRef,
  useId,
  type TextareaHTMLAttributes,
  type LabelHTMLAttributes,
  type ReactNode,
} from "react";
import styles from "./Textarea.module.scss";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  children: ReactNode;
}

function Label({ required, children, className, ...props }: LabelProps) {
  return (
    <label className={`${styles.label} ${className ?? ""}`} {...props}>
      {children}
      {required && <span className={styles.required}>*</span>}
    </label>
  );
}

function Error({ children }: { children: ReactNode }) {
  return <span className={styles.error}>{children}</span>;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, required, error, className, ...props }, ref) => {
    const id = useId();

    const textareaClassName = [
      styles.textarea,
      error && styles["textarea--error"],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div>
        {label && (
          <Label required={required} htmlFor={id}>
            {label}
          </Label>
        )}

        <textarea
          id={id}
          ref={ref}
          required={required}
          aria-invalid={!!error}
          className={textareaClassName}
          {...props}
        />
        {error && <Error>{error}</Error>}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
