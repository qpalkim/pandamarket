import type { BaseUser } from "./user";

// 사용자 정보 타입
export interface UserDetail extends BaseUser {
  email: string;
}

// 로그인 요청 타입
export interface LoginRequest {
  email: string;
  password: string;
}

// 로그인 응답 타입
export interface LoginResponse {
  user: UserDetail;
  accessToken: string;
  refreshToken: string;
}

// 회원가입 요청 타입
export interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

// 회원가입 응답 타입
export interface SignUpResponse {
  user: UserDetail;
  accessToken: string;
  refreshToken: string;
}

// 토큰 갱신 요청 타입
export interface RefreshTokenUpdateRequest {
  refreshToken: string;
}

// 토큰 갱신 응답 타입
export interface RefreshTokenUpdateResponse {
  accessToken: string;
}
