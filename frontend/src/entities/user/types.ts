export interface User {
  id: number;
  username: string;
  email: string;
}

export interface AuthResponse {
  refresh_token: string;
  token: string;
  user: User;
}
