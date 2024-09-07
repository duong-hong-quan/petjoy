"use client";
import Image from "next/image";
import {
  Typography,
  Button,
  TextField,
  Box,
  Link,
  Divider,
} from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import background from "../../assets/img/background.png";
import logo from "../../assets/img/paw-logo.png";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { LoginRequestDto } from "../../../petjoy-be/src/user/dto/login-request.dto";
import { loginApi } from "@/api/userApi";
import { toast } from "react-toastify";
import { showError } from "@/utils/utility";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/authSlice";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequestDto>();

  const onSubmit = async (data: LoginRequestDto) => {
    try {
      const response = await loginApi(data);
      if (response.isSuccess) {
        dispatch(login(response.data));
        toast.success("Đăng nhập thành công");
        router.push("/");
      } else {
        showError(response.message);
      }
    } catch (error) {
      showError(["Call API failed"]);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${background.src})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        flexDirection: "column",
        textAlign: "center",
        height: "100vh",
      }}
    >
      <Box>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Image src={logo.src} alt="Paw logo" width={50} height={50} />
        </Box>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          ĐĂNG NHẬP
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Enter a valid email address",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                error={!!errors.username}
                helperText={errors.username ? errors.username.message : ""}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Mật khẩu"
                type="password"
                variant="outlined"
                margin="normal"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "#ffc107",
              color: "white",
              "&:hover": { bgcolor: "#ffa000" },
              borderRadius: 10,
              fontWeight: "bold",
              fontSize: "1.2rem",
            }}
          >
            ĐĂNG NHẬP
          </Button>
        </form>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Link href="#" underline="none">
            Quên mật khẩu
          </Link>
        </Box>
        <Divider sx={{ my: 2 }}>HOẶC</Divider>
        <Button
          fullWidth
          variant="contained"
          startIcon={<GoogleIcon />}
          sx={{
            mb: 2,
            bgcolor: "#4285F4",
            "&:hover": { bgcolor: "#357ae8" },
            fontSize: "1rem",
            borderRadius: "20px",
          }}
          style={{ borderRadius: "20px" }}
        >
          Tiếp tục bằng Gmail
        </Button>
      </Box>
    </Box>
  );
}
