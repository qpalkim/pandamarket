import type { AddImageFileResponse } from "@/types/image";
import { fetchClient } from "./client";

// 이미지 등록 요청 API 함수
export const uploadImageFile = (file: File) => {
  const formData = new FormData();

  formData.append("image", file);

  return fetchClient<AddImageFileResponse>("/images/upload", {
    method: "POST",
    body: formData,
  });
};
