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

function Navbar() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);

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
        <ListItem component={Link} href="/match">
          <ListItemText primary="Match" />
        </ListItem>
        {user ? (
          <>
            <ListItem component={Link} href="/">
              <ListItemText primary="Hồ sơ" />
            </ListItem>
            <ListItem onClick={() => dispatch(logout())}>
              <ListItemText primary="Đăng xuất" />
            </ListItem>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              marginTop: 4,
            }}
          >
            <ListItem component={Link} href="/login">
              <ListItemText primary="Đăng nhập" />
            </ListItem>
            <ListItem component={Link} href="/register">
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
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
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
              Hồ sơ
            </Link>
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
              }}
              variant="outlined"
              onClick={() => dispatch(logout())}
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
              },
              sm: { display: "flex-col" },
            }}
          >
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
