import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { signUp } from "@/api/auth";
import { getMyProfile } from "@/api/user";
import { useAuth } from "@/hooks/useAuth";
import {
  validateEmail,
  validateNickname,
  validatePassword,
  validatePasswordConfirmation,
} from "@/utils/validate";
import { ACCESS_TOKEN_KEY } from "@/constants/storage";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import OAuthButton from "@/components/OAuthButton/OAuthButton";
import logo from "@/assets/logo/pandamarket.svg";
import styles from "./SignUpPage.module.scss";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const [emailTouched, setEmailTouched] = useState(false);
  const [nicknameTouched, setNicknameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordConfirmationTouched, setPasswordConfirmationTouched] =
    useState(false);

  const [showPw, setShowPw] = useState(false);
  const [showPwConfirm, setShowPwConfirm] = useState(false);

  const isEmailValid = !validateEmail(email);
  const isNicknameValid = !validateNickname(nickname);
  const isPasswordValid = !validatePassword(password);
  const isPasswordConfirmationValid = !validatePasswordConfirmation(
    password,
    passwordConfirmation,
  );

  const navigate = useNavigate();

  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailTouched(true);
    setNicknameTouched(true);
    setPasswordTouched(true);
    setPasswordConfirmationTouched(true);
    setServerError("");

    const emailError = validateEmail(email);
    const nicknameError = validateNickname(nickname);
    const passwordError = validatePassword(password);
    const passwordConfirmationError = validatePasswordConfirmation(
      password,
      passwordConfirmation,
    );

    if (
      emailError ||
      nicknameError ||
      passwordError ||
      passwordConfirmationError
    )
      return;

    try {
      setIsLoading(true);
      const data = await signUp({
        email,
        nickname,
        password,
        passwordConfirmation,
      });
      localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
      const user = await getMyProfile();
      setUser(user);
      navigate("/items");
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError("회원가입을 실패했습니다.");
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

      <form className={styles.signUpForm} onSubmit={handleSubmit}>
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
        <Input
          label="닉네임"
          placeholder="닉네임을 입력해 주세요"
          value={nickname}
          onBlur={() => setNicknameTouched(true)}
          onChange={(e) => setNickname(e.target.value)}
          error={nicknameTouched ? validateNickname(nickname) : ""}
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
        <div className={styles.pwContainer}>
          <Input
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 한 번 입력해 주세요"
            type={showPwConfirm ? "text" : "password"}
            value={passwordConfirmation}
            onBlur={() => setPasswordConfirmationTouched(true)}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            error={
              passwordConfirmationTouched
                ? validatePasswordConfirmation(password, passwordConfirmation)
                : ""
            }
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
        <Button
          type="submit"
          size="lg"
          disabled={
            !isEmailValid ||
            !isNicknameValid ||
            !isPasswordValid ||
            !isPasswordConfirmationValid ||
            isLoading
          }
          isLoading={isLoading}
        >
          회원가입
        </Button>
      </form>
      <OAuthButton />

      <p className={styles.loginText}>
        이미 회원이신가요?&nbsp;
        <Link to="/login" className={styles.loginLink}>
          로그인하기
        </Link>
      </p>
    </div>
  );
}
