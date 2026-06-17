// 공통 상품 정보 타입
export interface BaseProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  ownerId: number;
  favoriteCount: number;
  createdAt: string;
}

// 공통 상품 정렬 타입
export type OrderBy = "recent" | "favorite";

// 상품 목록 정보 타입
export interface ProductListItem extends BaseProduct {
  updatedAt: string;
}

// 상품 목록 조회 파라미터 타입
export interface GetProductListParams {
  page: number;
  pageSize: number;
  orderBy: OrderBy;
  keyword?: string;
}

// 상품 목록 조회 타입
export interface GetProductListResponse {
  totalCount: number;
  list: ProductListItem[];
}

// 상품 상세 조회 타입
export interface GetProductDetailResponse extends BaseProduct {
  ownerNickname: string;
  isFavorite: boolean;
}

// 상품 등록 요청 타입
export interface AddProductRequest {
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
}

// 상품 등록 응답 타입
export interface AddProductResponse extends BaseProduct {
  ownerNickname: string;
}

// 상품 수정 요청 타입
export type UpdateProductRequest = AddProductRequest;

// 상품 수정 응답 타입
export type UpdateProductResponse = GetProductDetailResponse;

// 상품 삭제 응답 타입
export interface DeleteProductResponse {
  id: number;
}

// 상품 좋아요 등록 응답 타입
export type AddLikeProductResponse = GetProductDetailResponse;

// 상품 좋아요 삭제 응답 타입
export type DeleteLikeProductResponse = GetProductDetailResponse;
