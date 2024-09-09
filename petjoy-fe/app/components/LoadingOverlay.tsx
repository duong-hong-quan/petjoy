"use client";

import { CircularProgress, Box } from "@mui/material";

interface LoadingOverlayProps {
  loading: boolean;
}

export const LoadingOverlay = ({ loading }: LoadingOverlayProps) => {
  if (loading) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          zIndex: 9999,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return null; // Return null or some other fallback UI when not loading
};
