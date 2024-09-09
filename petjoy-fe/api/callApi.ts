import { buildError } from "./../../petjoy-be/src/common/utility";
import { useState } from "react";
import { AxiosInstance, AxiosRequestConfig } from "axios";
import { showError } from "@/utils/utility";
import { AppActionResultDto } from "@/type";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const useCallApi = <T>(api: AxiosInstance) => {
  const [error, setError] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const callApi = async (
    endpoint: string,
    method: HttpMethod,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<AppActionResultDto> => {
    setLoading(true);
    try {
      debugger;
      let result;
      switch (method) {
        case "GET":
          result = await api.get<AppActionResultDto>(endpoint, config);
          break;
        case "POST":
          result = await api.post<AppActionResultDto>(endpoint, data, config);
          break;
        case "PUT":
          result = await api.put<AppActionResultDto>(endpoint, data, config);
          break;
        case "DELETE":
          result = await api.delete<AppActionResultDto>(endpoint, config);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
      if (result.data.isSuccess === false) {
        result.data.message.forEach((m) => {
          setError((prev) => [...(prev || []), m]);
        });
      }
      return result.data;
    } catch (err) {
      if (err instanceof Error) {
        setError([err.message]);
        showError([err.message || "Call API failed"]);
      } else {
        setError(["Call API failed"]);
        showError(["Call API failed"]);
      }
    } finally {
      setLoading(false);
    }
    return {
      data: null,
      message: ["Call API failed"],
      isSuccess: false,
    };
  };

  return { error, loading, callApi };
};

export default useCallApi;
