import { AppActionResultDto, LoginRequestDto } from "@/type";
import api from "./config";

export const loginApi = async (
  data: LoginRequestDto
): Promise<AppActionResultDto> => {
  try {
    const response = await api.post("user/login", data);
    if (response) {
      return response.data as AppActionResultDto;
    }
  } catch (error) {
    throw error;
  }
  return {
    data: null,
    message: ["Call API failed"],
    isSuccess: false,
  };
};
export const getUserByEmail = async (
  email: string
): Promise<AppActionResultDto> => {
  try {
    const response = await api.get(`user/email/${email}`);
    if (response) {
      return response.data as AppActionResultDto;
    }
  } catch (error) {
    throw error;
  }
  return {
    data: null,
    message: ["Call API failed"],
    isSuccess: false,
  } as AppActionResultDto;
};
export const createUser = async (data: any): Promise<AppActionResultDto> => {
  try {
    const response = await api.post("user", data);
    if (response) {
      return response.data as AppActionResultDto;
    }
  } catch (error) {
    throw error;
  }
  return {
    data: null,
    message: ["Call API failed"],
    isSuccess: false,
  };
};
