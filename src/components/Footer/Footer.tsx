import styles from "./Footer.module.scss";
import facebook from "@/assets/icons/facebook.svg";
import twitter from "@/assets/icons/twitter.svg";
import youtube from "@/assets/icons/youtube.svg";
import instagram from "@/assets/icons/instagram.svg";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.content}>
        <div className={styles.copyright}>©codeit - 2024</div>
        <ul className={styles.menu}>
          <li>Privacy Policy</li>
          <li>FAQ</li>
        </ul>
        <div className={styles.sns}>
          <img src={facebook} alt="페이스북" draggable={false} />
          <img src={twitter} alt="트위터" draggable={false} />
          <img src={youtube} alt="유튜브" draggable={false} />
          <img src={instagram} alt="인스타그램" draggable={false} />
        </div>
      </div>
    </footer>
  );
}
