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

export function getCookie(name: string): string | null {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1, c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }

  return null;
}
export const calculateAge = (dob: string): string => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  if (age < 1) {
    const months =
      (today.getFullYear() - birthDate.getFullYear()) * 12 + monthDifference;
    if (months < 1) {
      const days = Math.floor(
        (today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      return `${days} ngày tuổi`;
    }
    return `${months} tháng tuổi`;
  }

  return `${age} tuổi`;
};
