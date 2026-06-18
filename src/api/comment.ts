import {
  type GetProductCommentListParams,
  type GetProductCommentListResponse,
  type AddProductCommentRequest,
  type AddProductCommentResponse,
  type GetArticleCommentListParams,
  type GetArticleCommentListResponse,
  type AddArticleCommentRequest,
  type AddArticleCommentResponse,
  type UpdateCommentRequest,
  type UpdateCommentResponse,
  type DeleteCommentResponse,
} from "@/types/comment";
import { fetchClient } from "./client";

// 상품 댓글 목록 조회 API
export const getProductCommentList = (params: GetProductCommentListParams) => {
  const searchParams = new URLSearchParams({
    limit: String(params.limit),
  });

  if (params.cursor !== undefined)
    searchParams.set("cursor", String(params.cursor));

  return fetchClient<GetProductCommentListResponse>(
    `/products/${params.productId}/comments?${searchParams.toString()}`,
  );
};

// 상품 댓글 등록 요청 API
export const addProductComment = (
  productId: number,
  data: AddProductCommentRequest,
) => {
  return fetchClient<AddProductCommentResponse>(
    `/products/${productId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
};

// 게시글 댓글 목록 조회 API
export const getArticleCommentList = (params: GetArticleCommentListParams) => {
  const searchParams = new URLSearchParams({
    limit: String(params.limit),
  });

  if (params.cursor !== undefined)
    searchParams.set("cursor", String(params.cursor));

  return fetchClient<GetArticleCommentListResponse>(
    `/articles/${params.articleId}/comments?${searchParams.toString()}`,
  );
};

// 게시글 댓글 등록 요청 API
export const addArticleComment = (
  articleId: number,
  data: AddArticleCommentRequest,
) => {
  return fetchClient<AddArticleCommentResponse>(
    `/articles/${articleId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
};

// 댓글 수정 요청 API
export const updateComment = (id: number, data: UpdateCommentRequest) => {
  return fetchClient<UpdateCommentResponse>(`/comments/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

// 댓글 삭제 요청 API
export const deleteComment = (id: number) => {
  return fetchClient<DeleteCommentResponse>(`/comments/${id}`, {
    method: "DELETE",
  });
};
