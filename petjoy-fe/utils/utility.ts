import { toast } from "react-toastify";

export const showError = (error: string[]) => {
  toast.error(error.join("\n"));
};
export function parseJwt(token: string) {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}
