import type { LoginRequest, LoginResponse } from "@/types/auth";
import { fetchClient } from "./client"

export const login = async (
  body: LoginRequest
) => {
  return fetchClient<LoginResponse>("/auth/signIn", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  })
};
