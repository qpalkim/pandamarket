import {
  type LoginRequest,
  type LoginResponse,
  type SignUpRequest,
  type SignUpResponse,
  type RefreshTokenUpdateRequest,
  type RefreshTokenUpdateResponse,
} from "@/types/auth";
import { fetchClient } from "./client";

// 로그인 요청 API
export const login = async (body: LoginRequest) => {
  return fetchClient<LoginResponse>("/auth/signIn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

// 회원가입 요청 API
export const signUp = async (body: SignUpRequest) => {
  return fetchClient<SignUpResponse>("/auth/signUp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

// 토큰 갱신 요청 API
export const refreshTokenUpdate = async (
  body: RefreshTokenUpdateRequest,
): Promise<RefreshTokenUpdateResponse> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) throw new Error("토큰 갱신에 실패했습니다.");

  return response.json();
};
