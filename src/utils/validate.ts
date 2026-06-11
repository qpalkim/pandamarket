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
