"use client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { StyledButton } from "./StyledButton";
import { logout } from "../redux/features/authSlice";
import { Box } from "@mui/material";
function Navbar() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "#0080ff",
        position: "sticky",
        zIndex: "50",
        top: 0,
      }}
    >
      <Toolbar>
        <Link
          href={"/"}
          style={{ flexGrow: 1, fontSize: "2rem", fontWeight: "bold" }}
        >
          PETJOY
        </Link>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            href={"/"}
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: "bold",
              marginRight: 20,
            }}
          >
            Trang chủ
          </Link>
          <Link
            href={"/match"}
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: "bold",
              marginRight: 20,
            }}
          >
            Match
          </Link>
        </Box>
        {user ? (
          <>
            <Link
              href={"/"}
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "1rem",
                fontWeight: "bold",
                marginRight: 20,
              }}
            >
              Hồ sơ
            </Link>
            <Button
              sx={{
                bgcolor: "white",
                color: "#0080ff",
                borderRadius: 10,
                width: 140,
              }}
              variant="outlined"
              onClick={() => dispatch(logout())}
            >
              Đăng xuất
            </Button>
          </>
        ) : (
          <>
            <Link href={"/login"}>Đăng nhập</Link>
            <Button
              color="inherit"
              variant="outlined"
              sx={{
                ml: 2,
                backgroundColor: "white",
                color: "#0080ff",
                borderRadius: 10,
                width: 140,
              }}
            >
              Đăng ký
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
