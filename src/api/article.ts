import {
  type GetArticleListParams,
  type GetArticleListResponse,
  type GetArticleDetailResponse,
  type AddArticleRequest,
  type AddArticleResponse,
  type UpdateArticleRequest,
  type UpdateArticleResponse,
  type DeleteArticleResponse,
  type AddLikeArticleResponse,
  type DeleteLikeArticleResponse,
} from "@/types/article";
import { fetchClient } from "./client";

// 게시글 목록 조회 API
export const getArticleList = (params: GetArticleListParams) => {
  const searchParams = new URLSearchParams({
    page: String(params.page),
    pageSize: String(params.pageSize),
    orderBy: String(params.orderBy),
  });

  if (params.keyword) searchParams.set("keyword", params.keyword);

  return fetchClient<GetArticleListResponse>(`/articles?${searchParams}`);
};

// 게시글 상세 조회 API
export const getArticleDetail = (id: number) => {
  return fetchClient<GetArticleDetailResponse>(`/articles/${id}`);
};

// 게시글 등록 요청 API
export const addArticle = (data: AddArticleRequest) => {
  return fetchClient<AddArticleResponse>("/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// 게시글 수정 요청 API
export const updateArticle = (id: number, data: UpdateArticleRequest) => {
  return fetchClient<UpdateArticleResponse>(`/articles/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// 게시글 삭제 요청 API
export const deleteArticle = (id: number) => {
  return fetchClient<DeleteArticleResponse>(`/articles/${id}`, {
    method: "DELETE",
  });
};

// 게시글 좋아요 등록 요청 API
export const addLikeArticle = (id: number) => {
  return fetchClient<AddLikeArticleResponse>(`/articles/${id}/like`, {
    method: "POST",
  });
};

// 게시글 좋아요 삭제 요청 API
export const deleteLikeArticle = (id: number) => {
  return fetchClient<DeleteLikeArticleResponse>(`/articles/${id}/like`, {
    method: "DELETE",
  });
};
