// 내 정보 조회 타입
export interface UserResponse {
  id: number;
  nickname: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

// 공통 상품 정보 조회 타입
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  ownerId: number;
  ownerNickname: string;
  favoriteCount: number;
  createdAt: string;
}

// 내 정보 수정 요청 타입
export interface UserUpdateRequest {
  image: string | null;
}

// 내 정보 수정 응답 타입
export type UserUpdateResponse = UserResponse;

// 비밀번호 변경 요청 타입
export interface PasswordUpdateRequest {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}

// 비밀번호 변경 응답 타입
export type PasswordUpdateResponse = UserResponse;

// 내가 등록한 상품 목록 조회 파라미터 타입
export interface GetMyProductListParams {
  page: number;
  pageSize: number;
  keyword?: string;
}

// 내가 등록한 상품 목록 조회 타입
export interface GetMyProductListResponse {
  totalCount: number;
  list: Product[];
}

// 내가 찜한 상품 목록 조회 파라미터 타입
export interface GetMyFavoriteProductListParams {
  page: number;
  pageSize: number;
  keyword?: string;
}

// 내가 찜한 상품 목록 조회 타입
export interface GetMyFavoriteProductListResponse {
  totalCount: number;
  list: Product[];
}
