"use client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
function Navbar() {
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
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
