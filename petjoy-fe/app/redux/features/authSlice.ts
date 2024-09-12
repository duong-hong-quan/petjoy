"use client";

import { Pet } from "./../../../type";
import { User } from "@/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export interface AuthState {
  user: User | null;
  pet: Pet | null;
}

const initialState: AuthState = {
  user: null,
  pet: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.pet = null;
      localStorage.removeItem("token");
      document.cookie = `isAdmin=false; path=/; max-age=${
        7 * 24 * 60 * 60
      }; secure; samesite=strict`;
      toast.success("Đăng xuất thành công");
    },
    setPet: (state, action: PayloadAction<Pet>) => {
      state.pet = action.payload;
    },
  },
});

export const { login, logout, setPet } = authSlice.actions;
export default authSlice.reducer;
