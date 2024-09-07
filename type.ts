export interface LoginRequestDto {
  username: string;
  password: string;
}

export interface AppActionResultDto {
  data: any;
  message: string[];
  isSuccess: boolean;
}
