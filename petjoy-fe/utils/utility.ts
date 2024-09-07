import { toast } from "react-toastify";

export const showError = (error: string[]) => {
  toast.error(error.join("\n"));
};
