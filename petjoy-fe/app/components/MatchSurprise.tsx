"use client";
import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, Typography, Box } from "@mui/material";
import { Favorite as HeartIcon } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF4081",
    },
    secondary: {
      main: "#9C27B0",
    },
  },
});

interface MatchSurpriseProps {
  open: boolean;
  onClose: () => void;
}

const MatchSurprise: React.FC<MatchSurpriseProps> = ({ open, onClose }) => {
  const [scale, setScale] = useState(0);

  useEffect(() => {
    if (open) {
      setScale(1);
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setScale(0);
    }
  }, [open, onClose]);

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogContent
          sx={{
            background: "linear-gradient(45deg, #FF4081 30%, #9C27B0 90%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
          }}
        >
          <Box
            sx={{
              transform: `scale(${scale})`,
              transition: "transform 0.3s ease-in-out",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <HeartIcon sx={{ fontSize: 64, color: "white", mb: 2 }} />
            <Typography
              variant="h4"
              sx={{ color: "white", fontWeight: "bold", mb: 1 }}
            >
              It's a Match!
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default MatchSurprise;
