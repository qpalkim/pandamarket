import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { login } from "@/api/auth";
import { getMyProfile } from "@/api/user";
import { useAuth } from "@/hooks/useAuth";
import { validateEmail, validatePassword } from "@/utils/validate";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants/storage";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import OAuthButton from "@/components/OAuthButton/OAuthButton";
import logo from "@/assets/logo/pandamarket.svg";
import styles from "./LoginPage.module.scss";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [showPw, setShowPw] = useState(false);

  const isEmailValid = !validateEmail(email);
  const isPasswordValid = !validatePassword(password);

  const navigate = useNavigate();

  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailTouched(true);
    setPasswordTouched(true);
    setServerError("");

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) return;

    try {
      setIsLoading(true);
      const data = await login({ email, password });
      localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
      const user = await getMyProfile();
      setUser(user);
      navigate("/items");
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError("로그인을 실패했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoWrapper}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="" draggable={false} />
          <span>판다마켓</span>
        </Link>
      </div>

      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <Input
          label="이메일"
          placeholder="이메일을 입력해 주세요"
          value={email}
          onBlur={() => setEmailTouched(true)}
          onChange={(e) => {
            setEmail(e.target.value);
            setServerError("");
          }}
          error={serverError || (emailTouched ? validateEmail(email) : "")}
        />
        <div className={styles.pwContainer}>
          <Input
            label="비밀번호"
            placeholder="비밀번호를 입력해 주세요"
            type={showPw ? "text" : "password"}
            value={password}
            onBlur={() => setPasswordTouched(true)}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordTouched ? validatePassword(password) : ""}
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
        <Button
          type="submit"
          size="lg"
          disabled={!isEmailValid || !isPasswordValid || isLoading}
          isLoading={isLoading}
        >
          로그인
        </Button>
      </form>
      <OAuthButton />

      <p className={styles.signUpText}>
        판다마켓이 처음인가요?&nbsp;
        <Link to="/signup" className={styles.signUpLink}>
          회원가입하기
        </Link>
      </p>
    </div>
  );
}
