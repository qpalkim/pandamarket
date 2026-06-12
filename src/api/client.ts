import { ACCESS_TOKEN_KEY } from "@/constants/storage";

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchClient = async <T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options?.headers ?? {}),
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
    },
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message);
  }

  return response.json();
};
