import google from "@/assets/icons/google.svg";
import kakao from "@/assets/icons/kakao.svg";
import styles from "./OAuthButton.module.scss";

export default function OAuthButton() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p>간편 로그인하기</p>
        <div className={styles.oauthButtons}>
          <img src={google} alt="구글" draggable={false} />
          <img src={kakao} alt="카카오톡" draggable={false} />
        </div>
      </div>
    </div>
  );
}
