export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message?: string;
  metadata?: {
    account?: Account;
    tokens?: Tokens;
  };
  options?: {};
  status?: number;
}

export interface LoginFailureResponse {
  error: {
    status?: number;
    type?: string;
    resultCd?: number;
    stack?: string;
    message?: string;
  };
}

export interface Account {
  email?: string;
  isVerified?: boolean;
  role?: string;
  status?: boolean;
  _id?: string;
  userInfo: UserInfo;
}

export interface UserInfo {
  dob?: string;
  firstName?: string;
  gender?: boolean;
  _id?: string;
}

export interface Tokens {
  accessToken?: string;
  refreshToken?: string;
}

export interface SendEmailRequest {
  email?: string;
}
