// 공통 작성자 정보 타입
export interface BaseWriter {
  id: number;
  nickname: string;
}

// 공통 게시글 정보 타입
export interface BaseArticle {
  id: number;
  title: string;
  content: string;
  image: string;
  writer: BaseWriter;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
}

// 공통 게시글 정렬 타입
export type OrderBy = "recent" | "like";

// 게시글 목록 조회 파라미터 타입
export interface GetArticleListParams {
  page: number;
  pageSize: number;
  orderBy: OrderBy;
  keyword?: string;
}

// 게시글 목록 조회 타입
export interface GetArticleListResponse {
  totalCount: number;
  list: BaseArticle[];
}

// 게시글 상세 조회 타입
export type GetArticleDetailResponse = BaseArticle;

// 게시글 등록 요청 타입
export interface AddArticleRequest {
  title: string;
  content: string;
  image: string;
}

// 게시글 등록 응답 타입
export type AddArticleResponse = BaseArticle;

// 게시글 수정 요청 타입
export type UpdateArticleRequest = AddArticleRequest;

// 게시글 수정 응답 타입
export interface UpdateArticleResponse extends BaseArticle {
  isLiked: boolean;
}

// 게시글 삭제 응답 타입
export interface DeleteArticleResponse {
  id: number;
}

// 게시글 좋아요 등록 응답 타입
export interface AddLikeArticleResponse extends BaseArticle {
  isLiked: boolean;
}

// 게시글 좋아요 삭제 응답 타입
export interface DeleteLikeArticleResponse extends BaseArticle {
  isLiked: boolean;
}
