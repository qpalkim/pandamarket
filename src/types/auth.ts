// 공통 유저 타입
export interface User {
  id: number;
  email: string;
  image: string | null;
  nickname: string;
  updatedAt: string;
  createdAt: string;
}

// 로그인 요청 타입
export interface LoginRequest {
  email: string;
  password: string;
}

// 로그인 응답 타입
export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// 회원가입 요청 타입
export interface SignUpReauest {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

// 회원가입 응답 타입
export interface SignUpResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
