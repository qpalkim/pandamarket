import styles from "./Button.module.scss";

type ButtonVariant = "primary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  ariaLabel?: string;
  isLoading?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  type = "button",
  disabled = false,
  ariaLabel,
  isLoading = false,
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  const classList = [
    styles.button,
    styles[variant],
    styles[size],
    isDisabled ? styles.disabled : "",
    isLoading ? styles.loading : "",
  ]
    .filter(Boolean)
    .join(" ");

  const content = isLoading ? <span className={styles.spinner} /> : children;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={classList}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
