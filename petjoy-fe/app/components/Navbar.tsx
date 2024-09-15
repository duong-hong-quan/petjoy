"use client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/features/authSlice";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Navbar() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  const drawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem component={Link} href="/">
          <ListItemText primary="Trang chủ" />
        </ListItem>
        <ListItem component={Link} href="/user/blog">
          <ListItemText primary="Blog" />
        </ListItem>
        {user ? (
          <>
            <ListItem component={Link} href="/user/match">
              <ListItemText primary="Quẹt" />
            </ListItem>
            <ListItem component={Link} href="/user/package">
              <ListItemText primary="Gói" />
            </ListItem>
            <ListItem component={Link} href="/user/profile">
              <ListItemText primary="Hồ sơ" />
            </ListItem>
            {user.isAdmin && (
              <ListItem component={Link} href="/admin/dashboard">
                <ListItemText primary="Quản lý" />
              </ListItem>
            )}
            <ListItem onClick={() => dispatch(logout())}>
              <ListItemText primary="Đăng xuất" />
            </ListItem>
          </>
        ) : (
          <Box
            sx={{
              display: {
                sm: "flex-col",
              },
              alignItems: "center",
              justifyContent: "center",
              gap: {
                md: 2,
              },
              marginTop: {
                md: 4,
              },
            }}
          >
            <ListItem component={Link} href="/user/login">
              <ListItemText primary="Đăng nhập" />
            </ListItem>
            <ListItem component={Link} href="/user/register">
              <ListItemText primary="Đăng ký" />
            </ListItem>
          </Box>
        )}
      </List>
    </Box>
  );

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
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, display: { xs: "block", md: "none" } }}
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Link
          href={"/"}
          style={{ flexGrow: 1, fontSize: "2rem", fontWeight: "bold" }}
        >
          PETJOY
        </Link>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
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
              display: "inline-block",
            }}
          >
            Trang chủ
          </Link>
          <Link
            href={"/user/blog"}
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: "bold",
              display: "inline-block",
              marginRight: "10px",
            }}
          >
            Blog
          </Link>
        </Box>
        {user ? (
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <Link
              href={"/user/match"}
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "1rem",
                fontWeight: "bold",
                marginRight: 20,
              }}
            >
              Quẹt
            </Link>
            <Link
              href={"/user/package"}
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "1rem",
                fontWeight: "bold",
                marginRight: 20,
              }}
            >
              Gói
            </Link>
            <Link
              href={"/user/profile"}
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "1rem",
                fontWeight: "bold",
                marginRight: 20,
                textWrap: "nowrap",
              }}
            >
              Hồ sơ
            </Link>
            {user.isAdmin && (
              <Link
                href={"/admin/dashboard"}
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  marginRight: 20,
                  textWrap: "nowrap",
                }}
              >
                Quản lý
              </Link>
            )}
            <Button
              sx={{
                bgcolor: "white",
                color: "#0080ff",
                borderRadius: 10,
                width: 140,
                cursor: "pointer",
                ":hover": {
                  cursor: "pointer",
                },
                textWrap: "nowrap",
              }}
              variant="outlined"
              onClick={() => {
                dispatch(logout());
                router.push("/");
              }}
            >
              Đăng xuất
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
                gap: 2,
                justifyContent: "space-between",
                alignItems: "center",
                fontWeight: "bold",
                sm: { display: "flex-col" },
              },
            }}
          >
            <Link href={"/user/login"}>Đăng nhập</Link>
            {/* <Button
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
            </Button> */}
          </Box>
        )}
      </Toolbar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
