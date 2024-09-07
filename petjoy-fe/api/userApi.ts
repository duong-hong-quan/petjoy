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
