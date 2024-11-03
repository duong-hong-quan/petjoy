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
import background from "../../../assets/img/background.png";
import logo from "../../../assets/img/paw-logo.png";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { parseJwt, showError } from "@/utils/utility";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/features/authSlice";
import { useRouter } from "next/navigation";
import { LoginRequestDto } from "@/type";
import { auth, googleProvider } from "../../../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { useEffect } from "react";
import useCallApi from "../../../api/callApi";
import api from "@/api/config";
import { LoadingOverlay } from "../../components/LoadingOverlay";
import { RootState } from "../../redux/store";
import { debug } from "console";

export default function LoginPage() {
  const { error, loading, callApi } = useCallApi(api);
  const user = useSelector((state: RootState) => state.auth.user || null);
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequestDto>();
  const fetchData = async () => {
    const response = await callApi(`/pet/by-user-id/${user?.id}`, "GET");
    if (response.isSuccess) {
      if (response.data.length == 0) {
        router.push(`/user/pet`);
      }
    }
  };
  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);
  const onSubmit = async (data: LoginRequestDto) => {
    debugger;
    const response = await callApi("user/login", "POST", data);
    if (response) {
      if (response.isSuccess) {
        dispatch(login(response.data.user));
        toast.success("Đăng nhập thành công");
      } else {
        if (error) {
          showError(error);
        }
      }
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const tokenFromStorage = localStorage.getItem("token");

    if (tokenFromStorage || token || user) {
      if (token) {
        localStorage.setItem("token", token);
      }
      router.push("/");
    }
  }, [user, router]);
  const handleGoogleLogin = async () => {
    try {
      debugger;
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();
      localStorage.setItem("token", token);
      try {
        const decodedToken = parseJwt(token);
        if (decodedToken) {
          const response = await callApi(
            `user/email/${decodedToken.email}`,
            "GET"
          );
          if (response) {
            if (response.isSuccess) {
              dispatch(login(response.data));

              document.cookie = `isAdmin=${
                response.data.isAdmin
              }; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`;
            } else if (
              !response.isSuccess &&
              response.message.includes("User is banned")
            ) {
              return showError(["User is banned"]);
            } else if (
              !response.isSuccess &&
              !response.message.includes("User is banned")
            ) {
              debugger;
              const response = await callApi("user", "POST", {
                email: decodedToken.email,
                password: "google123@",
                name: result.user.displayName,
                profilePicture: user.photoURL,
              });
              if (response?.isSuccess) {
                dispatch(login(response.data));

                document.cookie = `isAdmin=${
                  response.data.isAdmin
                }; path=/; max-age=${
                  7 * 24 * 60 * 60
                }; secure; samesite=strict`;
              } else {
                if (error) {
                  showError(error);
                }
              }
            }
          }
        }
      } catch (error) {
        console.error("Invalid token:", error);
      }
      toast.success("Đăng nhập bằng Google thành công");
      router.push("/");
    } catch (error) {
      showError(["Google login failed"]);
    }
  };

  return loading ? (
    <LoadingOverlay loading={loading} />
  ) : (
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
          onClick={handleGoogleLogin}
        >
          Tiếp tục bằng Gmail
        </Button>
      </Box>
    </Box>
  );
}
