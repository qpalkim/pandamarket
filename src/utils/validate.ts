// 이메일 유효성 검사
export const validateEmail = (email: string) => {
  if (!email.trim()) return "이메일은 필수 입력입니다.";

  const emailRegex = /\S+@\S+\.\S+/;

  if (!emailRegex.test(email)) return "유효한 이메일 형식이 아닙니다.";

  return "";
};

// 닉네임 유효성 검사
export const validateNickname = (nickname: string) => {
  if (!nickname.trim()) return "닉네임은 필수 입력입니다.";

  if (nickname.length > 20) return "최대 20자까지 입력 가능합니다.";

  return "";
};

// 비밀번호 유효성 검사
export const validatePassword = (password: string) => {
  if (!password.trim()) return "비밀번호는 필수 입력입니다.";

  if (password.length < 8) return "최소 8자 이상 입력해 주세요.";

  return "";
};

// 비밀번호 확인 유효성 검사
export const validatePasswordConfirmation = (
  password: string,
  passwordConfirmation: string,
) => {
  if (!passwordConfirmation) return "비밀번호 확인은 필수 입력입니다.";

  if (password !== passwordConfirmation) return "비밀번호가 일치하지 않습니다.";
};

// 문의 댓글 유효성 검사
export const validateComment = (comment: string) => {
  if (comment.length > 100) return "100자 이내로 입력해 주세요.";
};

// 상품 등록 상품명 유효성 검사
export const validateProductName = (name: string) => {
  if (!name.trim()) return "상품명은 필수 입력입니다.";

  if (name.length > 30) return "최대 30자까지 입력 가능합니다.";
};

// 상품 등록 상품 소개 유효성 검사
export const validateProductDesc = (desc: string) => {
  if (!desc.trim()) return "상품 소개는 필수 입력입니다.";

  if (desc.length > 500) return "최대 500자까지 입력 가능합니다.";
};

// 상품 등록 상품 가격 유효성 검사
export const validateProductPrice = (price: string) => {
  if (!price.trim()) return "상품 가격은 필수 입력입니다.";
};

// 상품 등록 태그 유효성 검사
export const validateProductTags = (tags: string[]) => {
  const trimmedTags = tags.map((tag) => tag.trim()).filter(Boolean);

  if (trimmedTags.length === 0) return "태그는 필수 입력입니다.";

  if (trimmedTags.length > 6) return "태그는 최대 6개까지 입력 가능합니다.";
};

// 이미지 파일 유효성 검사
export const validateImage = (image: File): string | undefined => {
  const supportedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

  if (!supportedTypes.includes(image.type))
    return "지원되지 않는 이미지 파일입니다.";

  if (image.size > 5 * 1024 * 1024) return "5MB 이하의 파일만 등록 가능합니다.";
};
