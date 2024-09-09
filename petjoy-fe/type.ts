export interface LoginRequestDto {
  username: string;
  password: string;
}

export interface AppActionResultDto {
  data: any;
  message: string[];
  isSuccess: boolean;
}
export interface User {
  id: number;

  email: string;

  password: string;

  name: string;

  profilePicture: string;
}
