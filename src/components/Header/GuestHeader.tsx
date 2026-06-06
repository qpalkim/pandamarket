import { Link } from "react-router-dom";
import styles from "./GuestHeader.module.scss";
import Button from "@/components/Button/Button";
import logo from "@/assets/logo/pandamarket.svg";

export default function GuestHeader() {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link to="/" aria-label="판다마켓 홈" className={styles.title}>
          <img src={logo} alt="" draggable={false} />
          <span>판다마켓</span>
        </Link>
        <Link to="/login">
          <Button size="sm">로그인</Button>
        </Link>
      </div>
    </header>
  )
}
