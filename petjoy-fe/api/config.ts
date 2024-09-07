import axios, {
  AxiosRequestConfig,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from "axios";

// Define the type for ImportMetaEnv
interface ImportMetaEnv {
  readonly NEXT_PUBLIC_API_URL: string;
}

// Define the type for ImportMeta
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Access the environment variable
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const config: AxiosRequestConfig = {
  baseURL: baseUrl,
  timeout: 3000000,
  headers: {
    "Content-Type": "application/json",
  },
};

const api = axios.create(config);

const handleBefore = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = localStorage.getItem("accessToken")?.replaceAll('"', "");
  if (config.headers) {
    config.headers.set("Authorization", `Bearer ${token}`);
  } else {
    config.headers = new AxiosHeaders();
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
};

const handleError = (error: AxiosError): Promise<AxiosError> => {
  console.error(error);
  return Promise.reject(error);
};

api.interceptors.request.use(handleBefore, handleError);
// api.interceptors.response.use(null, handleError);

export default api;
