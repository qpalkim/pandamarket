import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
  type ReactNode,
} from "react";
import styles from "./Input.module.scss";

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

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, required, error, className, ...props }, ref) => {
    const id = useId();

    const inputClassName = [
      styles.input,
      error && styles["input--error"],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div>
        {label && (
          <Label htmlFor={id} required={required}>
            {label}
          </Label>
        )}

        <input
          id={id}
          ref={ref}
          required={required}
          aria-invalid={!!error}
          className={inputClassName}
          {...props}
        />
        {error && <Error>{error}</Error>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
