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
export default function LoginPage() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${background.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Image src={logo.src} alt="Paw logo" width={50} height={50} />
        </Box>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          ĐĂNG NHẬP
        </Typography>
        <TextField fullWidth label="Email" variant="outlined" margin="normal" />
        <TextField
          fullWidth
          label="Mật khẩu"
          type="password"
          variant="outlined"
          margin="normal"
        />
        <Button
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
