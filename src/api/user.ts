import {
  type BaseUser,
  type UserUpdateRequest,
  type UserUpdateResponse,
  type PasswordUpdateRequest,
  type PasswordUpdateResponse,
  type GetMyProductListParams,
  type GetMyProductListResponse,
  type GetMyFavoriteProductListParams,
  type GetMyFavoriteProductListResponse,
} from "@/types/user";
import { fetchClient } from "./client";

// 내 정보 조회 요청 API
export const getMyProfile = () => {
  return fetchClient<BaseUser>("/users/me");
};

// 내 정보 수정 요청 API
export const updateMyProfile = (data: UserUpdateRequest) => {
  return fetchClient<UserUpdateResponse>("/users/me", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// 비밀번호 변경 요청 API
export const updateMyPassword = (data: PasswordUpdateRequest) => {
  return fetchClient<PasswordUpdateResponse>("/users/me/password", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// 내가 등록한 상품 목록 조회 API
export const getMyProductList = (params: GetMyProductListParams) => {
  const searchParams = new URLSearchParams({
    page: String(params.page),
    pageSize: String(params.pageSize),
  });

  if (params.keyword) searchParams.set("keyword", params.keyword);

  return fetchClient<GetMyProductListResponse>(
    `/users/me/products?${searchParams}`,
  );
};

// 내가 찜한 상품 목록 조회 API
export const getMyFavoriteProductList = (
  params: GetMyFavoriteProductListParams,
) => {
  const searchParams = new URLSearchParams({
    page: String(params.page),
    pageSize: String(params.pageSize),
  });

  if (params.keyword) searchParams.set("keyword", params.keyword);

  return fetchClient<GetMyFavoriteProductListResponse>(
    `/users/me/favorites?${searchParams}`,
  );
};
