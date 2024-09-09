"use client";
import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps): JSX.Element => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user || null);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return children as JSX.Element;
};

export default AuthWrapper;
