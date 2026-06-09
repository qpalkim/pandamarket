import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import OAuthButton from "@/components/OAuthButton/OAuthButton";
import logo from "@/assets/logo/pandamarket.svg";
import styles from "./LoginPage.module.scss";

export default function LoginPage() {
  const [showPw, setShowPw] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <Link to="/" aria-label="홈페이지 이동" className={styles.logo}>
          <img src={logo} alt="" draggable={false} />
          <span>판다마켓</span>
        </Link>
      </div>

      <form className={styles.loginForm}>
        <Input label="이메일" placeholder="이메일을 입력해 주세요" />
        <div className={styles.pwContainer}>
          <Input
            type={showPw ? "text" : "password"}
            label="비밀번호"
            placeholder="비밀번호를 입력해 주세요"
          />
          <button
            type="button"
            className={styles.pwToggle}
            onClick={() => setShowPw(!showPw)}
            aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            {showPw ? (
              <Eye className={styles.pwIcon} strokeWidth={1} />
            ) : (
              <EyeOff className={styles.pwIcon} strokeWidth={1} />
            )}
          </button>
        </div>
        <Button type="submit" size="lg" disabled>
          로그인
        </Button>
      </form>
      <OAuthButton />

      <p className={styles.signupText}>
        판다마켓이 처음인가요?&nbsp;
        <Link
          to="/signup"
          aria-label="회원가입 페이지 이동"
          className={styles.signupLink}
        >
          회원가입하기
        </Link>
      </p>
    </div>
  );
}
