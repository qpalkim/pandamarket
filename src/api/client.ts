import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants/storage";
import { refreshTokenUpdate } from "./auth";

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchClient = async <T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  let response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options?.headers ?? {}),
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
    },
  });

  if (response.status === 401) {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

    if (!refreshToken) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      throw new Error("로그인이 만료되었습니다.");
    }

    try {
      const tokenData = await refreshTokenUpdate({
        refreshToken,
      });

      localStorage.setItem(ACCESS_TOKEN_KEY, tokenData.accessToken);

      response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          ...(options?.headers ?? {}),
          Authorization: `Bearer ${tokenData.accessToken}`,
        },
      });
    } catch {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      throw new Error("로그인이 만료되었습니다.");
    }
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};
