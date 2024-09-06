"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import LanguageIcon from "@mui/icons-material/Language";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0088ff",
    },
    background: {
      default: "#000000",
    },
  },
});

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M12 6.76c-1.41 1.41-3.29 2.24-5.36 2.24-2.07 0-3.95-.83-5.36-2.24-2.83-2.83-2.83-7.43 0-10.26 1.41-1.41 3.29-2.24 5.36-2.24 2.07 0 3.95.83 5.36 2.24 2.83 2.83 2.83 7.43 0 10.26z' fill='%230088ff' fill-opacity='0.2'/%3E%3C/svg%3E")`,
  backgroundRepeat: "repeat",
  minHeight: "100vh",
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const ImageUploadBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: 200,
  border: "2px dashed #0088ff",
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
}));

export default function PetRegistrationForm() {
  return (
    <ThemeProvider theme={theme}>
      <StyledContainer maxWidth="md">
        <Box sx={{ mt: 4, bgcolor: "background.paper", p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Thông tin thú cưng
          </Typography>

          <form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tên thú cưng của bạn"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Loài</InputLabel>
                  <Select label="Loài">
                    <MenuItem value="dog">Chó</MenuItem>
                    <MenuItem value="cat">Mèo</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Giới tính</InputLabel>
                  <Select label="Giới tính">
                    <MenuItem value="male">Đực</MenuItem>
                    <MenuItem value="female">Cái</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Ảnh thú cưng
                </Typography>
                <Grid container spacing={2}>
                  {[1, 2, 3, 4].map((index) => (
                    <Grid item xs={3} key={index}>
                      <ImageUploadBox>
                        <AddIcon color="primary" fontSize="large" />
                      </ImageUploadBox>
                    </Grid>
                  ))}
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Khu vực sinh sống</InputLabel>
                  <Select label="Khu vực sinh sống">
                    <MenuItem value="urban">Thành thị</MenuItem>
                    <MenuItem value="rural">Nông thôn</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                >
                  Lưu hồ sơ
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </StyledContainer>
    </ThemeProvider>
  );
}
