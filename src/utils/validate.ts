export const validateEmail = (
  email: string
) => {
  if (!email.trim()) {
    return ("이메일은 필수 입력입니다")
  }

  const emailRegex = /\S+@\S+\.\S+/;

  if (!emailRegex.test(email)) {
    return ("유효한 이메일 형식이 아닙니다")
  }

  return ""
};

export const validatePassword = (
  password: string
) => {
  if (!password.trim()) {
    return "비밀번호는 필수 입력입니다";
  }

  if (password.length < 8) {
    return "최소 8자 이상 입력해 주세요";
  }

  return "";
};
