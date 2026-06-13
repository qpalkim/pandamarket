import {
  type GetProductListParams,
  type GetProductListResponse,
  type GetProductDetailResponse,
  type AddProductRequest,
  type AddProductResponse,
  type UpdateProductRequest,
  type UpdateProductResponse,
  type DeleteProductResponse,
  type AddLikeProductResponse,
  type DeleteLikeProductResponse,
} from "@/types/product";
import { fetchClient } from "./client";

// 상품 목록 조회 API
export const getProductList = (params: GetProductListParams) => {
  const searchParams = new URLSearchParams({
    page: String(params.page),
    pageSize: String(params.pageSize),
    orderBy: String(params.orderBy),
  });

  if (params.keyword) searchParams.set("keyword", params.keyword);

  return fetchClient<GetProductListResponse>(`/products?${searchParams}`);
};

// 상품 상세 조회 API
export const getProductDetail = (id: number) => {
  return fetchClient<GetProductDetailResponse>(`/products/${id}`);
};

// 상품 등록 요청 API
export const addProduct = (data: AddProductRequest) => {
  return fetchClient<AddProductResponse>("/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// 상품 수정 요청 API
export const updateProduct = (id: number, data: UpdateProductRequest) => {
  return fetchClient<UpdateProductResponse>(`/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// 상품 삭제 요청 API
export const deleteProduct = (id: number) => {
  return fetchClient<DeleteProductResponse>(`/products/${id}`, {
    method: "DELETE",
  });
};

// 상품 좋아요 등록 요청 API
export const addLikeProduct = (id: number) => {
  return fetchClient<AddLikeProductResponse>(`/products/${id}/favorite`, {
    method: "POST",
  });
};

// 상품 좋아요 삭제 요청 API
export const deleteLikeProduct = (id: number) => {
  return fetchClient<DeleteLikeProductResponse>(`/products/${id}/favorite`, {
    method: "DELETE",
  });
};
