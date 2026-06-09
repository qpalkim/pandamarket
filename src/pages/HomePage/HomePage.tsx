import { Link } from "react-router-dom";
import Button from "@/components/Button/Button";
import heroImage from "@/assets/home/heroImage.svg";
import hotItemImage from "@/assets/home/hotItemImage.svg";
import searchImage from "@/assets/home/searchImage.svg";
import registerImage from "@/assets/home/registerImage.svg";
import footerImage from "@/assets/home/footerImage.svg";
import styles from "./HomePage.module.scss";

export default function HomePage() {
  return (
    <>
      <section className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              일상의 모든 물건을 <br />
              거래해 보세요
            </h1>
            <Link to="/items" aria-label="상품 목록 페이지 이동">
              <Button>구경하러 가기</Button>
            </Link>
          </div>
          <img
            className={styles.heroImage}
            src={heroImage}
            draggable={false}
            alt="메인 일러스트"
          />
        </div>
      </section>

      <section className={styles.featureContainer}>
        <div className={styles.featureContent}>
          <div className={styles.featureItem}>
            <img
              className={styles.featureImage}
              src={hotItemImage}
              draggable={false}
              alt="핫 아이템 일러스트"
            />
            <div className={styles.featureText}>
              <span className={styles.featureBadge}>Hot Item</span>
              <h2 className={styles.featureTitle}>
                인기 상품을 <br />
                확인해 보세요
              </h2>
              <p className={styles.featureDesc}>
                가장 HOT한 중고 거래 물품을 <br />
                판다마켓에서 확인해 보세요
              </p>
            </div>
          </div>

          <div className={`${styles.featureItem} ${styles.featureItemReverse}`}>
            <img
              className={styles.featureImage}
              src={searchImage}
              draggable={false}
              alt="검색 일러스트"
            />
            <div className={styles.featureText}>
              <span className={styles.featureBadge}>Search</span>
              <h2 className={styles.featureTitle}>
                구매를 원하는 <br />
                상품을 검색하세요
              </h2>
              <p className={styles.featureDesc}>
                구매하고 싶은 물품을 검색해서 <br />
                쉽게 찾아보세요
              </p>
            </div>
          </div>

          <div className={styles.featureItem}>
            <img
              className={styles.featureImage}
              src={registerImage}
              draggable={false}
              alt="등록 일러스트"
            />
            <div className={styles.featureText}>
              <span className={styles.featureBadge}>Register</span>
              <h2 className={styles.featureTitle}>
                판매를 원하는 <br />
                상품을 등록하세요
              </h2>
              <p className={styles.featureDesc}>
                어떤 물건이든 판매하고 싶은 상품을 <br />
                쉽게 등록하세요
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <h3 className={styles.footerTitle}>
            믿을 수 있는 <br /> 판다마켓 중고 거래
          </h3>
          <img
            className={styles.footerImage}
            src={footerImage}
            alt="푸터 일러스트"
          />
        </div>
      </section>
    </>
  );
}
