// 공통 댓글 작성자 정보 타입
export interface BaseWriter {
  id: number;
  image: string | null;
  nickname: string;
}

// 공통 댓글 정보 타입
export interface BaseComment {
  writer: BaseWriter;
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// 공통 댓글 목록 정보 타입
export interface BaseCommentList {
  list: BaseComment[];
  nextCursor: number | null;
}

// 공통 댓글 요청 정보 타입
export interface CommentRequest {
  content: string;
}

// 상품 댓글 목록 조회 파라미터 타입
export interface GetProductCommentListParams {
  productId: number;
  limit: number;
  cursor?: number;
}

// 상품 댓글 목록 조회 타입
export type GetProductCommentListResponse = BaseCommentList;

// 상품 댓글 등록 요청 타입
export type AddProductCommentRequest = CommentRequest;

// 상품 댓글 등록 응답 타입
export type AddProductCommentResponse = BaseComment;

// 게시글 댓글 목록 조회 파라미터 타입
export interface GetArticleCommentListParams {
  articleId: number;
  limit: number;
  cursor?: number;
}

// 게시글 댓글 목록 조회 타입
export type GetArticleCommentListResponse = BaseCommentList;

// 게시글 댓글 등록 요청 타입
export type AddArticleCommentRequest = CommentRequest;

// 게시글 댓글 등록 응답 타입
export type AddArticleCommentResponse = BaseComment;

// 댓글 수정 요청 타입
export type UpdateCommentRequest = CommentRequest;

// 댓글 수정 응답 타입
export type UpdateCommentResponse = BaseComment;

// 댓글 삭제 응답 타입
export interface DeleteCommentResponse {
  id: number;
}
