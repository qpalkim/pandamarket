import { Plus } from "lucide-react";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Textarea from "@/components/Textarea/Textarea";
import styles from "./AddItemPage.module.scss";

export default function AddItemPage() {
  return (
    <div className={styles.container}>
      <form className={styles.addProductForm}>
        <div className={styles.header}>
          <h2 className={styles.title}>상품 등록하기</h2>
          <Button type="submit" size="sm" disabled>
            등록
          </Button>
        </div>

        <div className={styles.imageSection}>
          <h2 className={styles.sectionTitle}>상품 이미지</h2>
          <label htmlFor="product-image" className={styles.imageButton}>
            <Plus className={styles.imageIcon} />
            <span>이미지 등록</span>
          </label>
          <input
            id="product-image"
            type="file"
            accept="image/*"
            className={styles.fileInput}
          />
        </div>

        <Input label="상품명" placeholder="상품명을 입력해 주세요" />

        <Textarea label="상품 소개" placeholder="상품 소개를 입력해 주세요" />

        <Input
          inputMode="numeric"
          type="number"
          label="판매 가격"
          placeholder="판매 가격을 입력해 주세요"
        />

        <Input label="태그" placeholder="태그를 입력해 주세요" />
      </form>
    </div>
  );
}
