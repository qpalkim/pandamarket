import defaultProfile from "@/assets/icons/defaultProfile.svg";
import styles from "./ProfileImage.module.scss";

type ProfileImageSize = "sm" | "lg";

interface ProfileImageProps {
  size?: ProfileImageSize;
  src: string | null;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  clickable?: boolean;
}

export default function ProfileImage({
  size = "sm",
  src,
  onClick,
  clickable = false,
}: ProfileImageProps) {
  return (
    <div
      className={`${styles.profileImage} ${styles[size]} ${clickable ? styles.clickable : ""}`}
      onClick={clickable ? onClick : undefined}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label={clickable ? "사용자 프로필" : undefined}
    >
      <img
        className={styles.image}
        src={src || defaultProfile}
        alt="사용자 프로필 이미지"
        onError={(e) => {
          e.currentTarget.src = defaultProfile;
        }}
      />
    </div>
  );
}
