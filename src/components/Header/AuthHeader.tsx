import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLogout } from "@/hooks/useLogout";
import ProfileImage from "@/components/ProfileImage/ProfileImage";
import Dropdown from "@/components/Dropdown/Dropdown";
import logo from "@/assets/logo/pandamarket.svg";
import styles from "./AuthHeader.module.scss";

export default function AuthHeader() {
  const { user } = useAuth();
  const logout = useLogout();

  const options = [
    { label: "마이 페이지", onClick: () => {} },
    { label: "로그아웃", onClick: logout },
  ];

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
        <Dropdown
          options={options}
          trigger={<ProfileImage src={user.image} size="lg" clickable />}
        />
      </div>
    </header>
  );
}
