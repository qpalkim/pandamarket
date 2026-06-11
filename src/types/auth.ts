// 로그인 요청 타입
export interface LoginRequest {
  email: string;
  password: string;
};

// 로그인 응답 타입
export interface LoginResponse {
  user: {
    id: number
    email: string;
    image: string;
    nickname: string;
    updatedAt: string;
    createdAt: string;
  }
  accessToken: string;
  refreshToken: string;
};
