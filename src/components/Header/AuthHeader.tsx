import { Link } from "react-router-dom";
import logo from "@/assets/logo/pandamarket.svg";
import ProfileImage from "@/components/ProfileImage/ProfileImage";
import styles from "./AuthHeader.module.scss";

export default function AuthHeader() {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <div className={styles.navigation}>
          <Link to="/" className={styles.title}>
            <img src={logo} alt="" draggable={false} />
            <span>판다마켓</span>
          </Link>
          <Link to="/items">중고마켓</Link>
          <Link to="/boards">자유게시판</Link>
        </div>
        <ProfileImage src={null} size="lg" clickable />
      </div>
    </header>
  );
}
