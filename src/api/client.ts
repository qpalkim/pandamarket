const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchClient = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(
    `${BASE_URL}${endpoint}`,
    options
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message);
  }

  return response.json();
};
