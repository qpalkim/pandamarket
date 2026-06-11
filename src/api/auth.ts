import {
  type LoginRequest,
  type LoginResponse,
  type SignUpReauest,
  type SignUpResponse,
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
export const signUp = async (body: SignUpReauest) => {
  return fetchClient<SignUpResponse>("/auth/signUp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};
