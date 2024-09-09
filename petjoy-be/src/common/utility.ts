import { AppActionResultDto } from "./dto/app-action-result.dto";

export const buildError = (message: string): AppActionResultDto => {
  return {
    data: null,
    message: [message],
    isSuccess: false,
  };
};
