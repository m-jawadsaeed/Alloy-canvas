export interface RegisterDto {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginDto {
  identifier: string;
  password: string;
}