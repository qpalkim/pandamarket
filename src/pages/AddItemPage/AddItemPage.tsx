import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, X } from "lucide-react";
import { addProduct } from "@/api/product";
import { uploadImageFile } from "@/api/image";
import {
  validateImage,
  validateProductName,
  validateProductDesc,
  validateProductPrice,
  validateProductTags,
} from "@/utils/validate";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Textarea from "@/components/Textarea/Textarea";
import styles from "./AddItemPage.module.scss";

export default function AddItemPage() {
  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [tagInputError, setTagInputError] = useState("");

  const [nameTouched, setNameTouched] = useState(false);
  const [descTouched, setDescTouched] = useState(false);
  const [priceTouched, setPriceTouched] = useState(false);
  const [tagsTouched, setTagsTouched] = useState(false);

  const isNameValid = !validateProductName(name);
  const isDescValid = !validateProductDesc(desc);
  const isPriceValid = !validateProductPrice(price);
  const isTagsValid = !validateProductTags(tags);

  // 이미지 파일 등록 함수
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageError = validateImage(file);

    if (imageError) {
      setServerError(imageError);
      return;
    }

    setServerError("");
    setImage(file);

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // 등록된 이미지 제거 함수
  const handleRemoveImage = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setImage(null);
    setPreviewUrl("");

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // 태그 등록 함수
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== "Enter") return;
    e.preventDefault();

    const value = e.currentTarget.value.replace(/\s+/g, "").trim();
    if (!value) return;

    if (tags.includes(value)) return setTagInputError("중복된 태그입니다.");
    if (value.length > 20)
      return setTagInputError("최대 20자 이내로 입력해 주세요.");
    if (tags.length >= 6)
      return setTagInputError("최대 6개까지 입력 가능합니다.");

    setTags((prev) => [...prev, value]);
    setTagInput("");
    setTagInputError("");
  };

  // 등록된 태그 제거 함수
  const removeTag = (idx: number) => {
    setTags((prev) => prev.filter((_, i) => i !== idx));
    setTagInputError("");
  };

  // 상품 등록 폼 함수
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setNameTouched(true);
    setDescTouched(true);
    setPriceTouched(true);
    setTagsTouched(true);

    setServerError("");

    const nameError = validateProductName(name);
    const descError = validateProductDesc(desc);
    const priceError = validateProductPrice(price);
    const tagsError = validateProductTags(tags);

    if (nameError || descError || priceError || tagsError) return;

    if (!image) {
      setServerError("상품 이미지를 등록해 주세요.");
      return;
    }

    try {
      setIsLoading(true);

      const { url } = await uploadImageFile(image);

      const data = await addProduct({
        images: [url],
        name,
        description: desc,
        price: Number(price),
        tags,
      });
      navigate(`/items/${data.id}`, {
        replace: true,
      });
    } catch {
      setServerError("상품 등록을 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className={styles.container}>
      <form className={styles.addProductForm} onSubmit={handleSubmit}>
        <div className={styles.header}>
          <h1 className={styles.title}>상품 등록하기</h1>
          <Button
            type="submit"
            size="sm"
            disabled={
              !image ||
              !isNameValid ||
              !isDescValid ||
              !isPriceValid ||
              !isTagsValid ||
              isLoading
            }
            isLoading={isLoading}
          >
            등록
          </Button>
        </div>

        <div className={styles.imageSection}>
          <h2 className={styles.sectionTitle}>상품 이미지</h2>

          <div className={styles.imageWrapper}>
            <label htmlFor="product-image" className={styles.imageButton}>
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="상품 이미지"
                  className={styles.previewImage}
                />
              ) : (
                <>
                  <Plus className={styles.imageIcon} />
                  <span>이미지 등록</span>
                </>
              )}
            </label>

            {previewUrl && (
              <button
                type="button"
                className={styles.removeImageButton}
                onClick={handleRemoveImage}
                aria-label="상품 이미지 삭제"
              >
                <X size={20} />
              </button>
            )}

            <input
              id="product-image"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </div>
        </div>

        <Input
          label="상품명"
          placeholder="상품명을 입력해 주세요"
          value={name}
          onBlur={() => setNameTouched(true)}
          onChange={(e) => setName(e.target.value)}
          error={serverError || (nameTouched ? validateProductName(name) : "")}
        />

        <Textarea
          label="상품 소개"
          placeholder="상품 소개를 입력해 주세요"
          value={desc}
          onBlur={() => setDescTouched(true)}
          onChange={(e) => setDesc(e.target.value)}
          error={descTouched ? validateProductDesc(desc) : ""}
        />

        <Input
          inputMode="numeric"
          type="number"
          label="판매 가격"
          placeholder="판매 가격을 입력해 주세요"
          value={price}
          onBlur={() => setPriceTouched(true)}
          onChange={(e) => setPrice(e.target.value)}
          error={priceTouched ? validateProductPrice(price) : ""}
        />

        <Input
          label="태그"
          placeholder="태그를 입력해 주세요"
          value={tagInput}
          onBlur={() => setTagsTouched(true)}
          onChange={(e) => {
            setTagInput(e.target.value);
            setTagInputError("");
          }}
          onKeyDown={handleTagKeyDown}
          error={
            tagInputError || (tagsTouched ? validateProductTags(tags) : "")
          }
        />
        <div className={styles.tagWrapper}>
          {tags.map((tag, idx) => (
            <span key={tag} className={styles.tag}>
              #{tag}
              <button
                type="button"
                aria-label="태그 삭제"
                onClick={() => removeTag(idx)}
                className={styles.removeTagButton}
              >
                <X className={styles.removeTagIcon} />
              </button>
            </span>
          ))}
        </div>
      </form>
    </div>
  );
}
