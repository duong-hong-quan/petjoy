"use client";
import { Button, styled } from "@mui/material";

export const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "20px",
  fontWeight: "bold",
  fontSize: "1.4rem",
  padding: theme.spacing(1, 4),
}));
