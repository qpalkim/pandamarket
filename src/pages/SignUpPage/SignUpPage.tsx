import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import OAuthButton from "@/components/OAuthButton/OAuthButton";
import logo from "@/assets/logo/pandamarket.svg";
import styles from "./SignUpPage.module.scss";

export default function SignUpPage() {
  const [showPw, setShowPw] = useState(false);
  const [showPwConfirm, setShowPwConfirm] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <Link to="/" aria-label="홈페이지 이동" className={styles.logo}>
          <img src={logo} alt="" draggable={false} />
          <span>판다마켓</span>
        </Link>
      </div>

      <form className={styles.signUpForm}>
        <Input label="이메일" placeholder="이메일을 입력해 주세요" />
        <Input label="닉네임" placeholder="닉네임을 입력해 주세요" />
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
        <div className={styles.pwContainer}>
          <Input
            type={showPwConfirm ? "text" : "password"}
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 한 번 입력해 주세요"
          />
          <button
            type="button"
            className={styles.pwToggle}
            onClick={() => setShowPwConfirm(!showPwConfirm)}
            aria-label={showPwConfirm ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            {showPwConfirm ? (
              <Eye className={styles.pwIcon} strokeWidth={1} />
            ) : (
              <EyeOff className={styles.pwIcon} strokeWidth={1} />
            )}
          </button>
        </div>

        <Button type="submit" size="lg" disabled>
          회원가입
        </Button>
      </form>
      <OAuthButton />

      <p className={styles.loginText}>
        이미 회원이신가요?&nbsp;
        <Link
          to="/login"
          aria-label="로그인 페이지 이동"
          className={styles.loginLink}
        >
          로그인하기
        </Link>
      </p>
    </div>
  );
}
