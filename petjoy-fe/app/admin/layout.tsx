"use client";

import React, { useState, useEffect, useLayoutEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  useMediaQuery,
  Theme,
  Avatar,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PeopleIcon from "@mui/icons-material/People";
import Link from "next/link";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import { usePathname, useRouter } from "next/navigation";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const drawerWidth = 240;

const menuItems = [
  {
    label: "Bảng điều khiển",
    icon: <DashboardIcon />,
    link: "/admin/dashboard",
  },
  {
    label: "Các thanh toán",
    icon: <PaymentsOutlinedIcon />,
    link: "/admin/payment",
  },
  {
    label: "Gói đăng kí",
    icon: <MonetizationOnIcon />,
    link: "/admin/payment-package",
  },
  { label: "Người dùng", icon: <PeopleIcon />, link: "/admin/user" },
];

const theme = createTheme({});

function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const user = useSelector((state: RootState) => state.auth.user);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const drawer = (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: [1],
          marginTop: "30px",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.7rem",
            color: "#007EFF",
            flex: 1,
          }}
        >
          <Link href={"/"}> PETJOY</Link>
        </Typography>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.label}
            disablePadding
            sx={{ display: "block", borderRadius: "20px" }}
          >
            <ListItemButton
              component={Link}
              href={item.link}
              selected={pathname === item.link}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        {/* <CssBaseline /> */}
        <Box
          position="fixed"
          sx={{
            borderRadius: "300px",
            marginTop: "10px",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            backgroundColor: "white",
          }}
        >
          {isMobile && (
            <Box
              sx={{
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                backgroundColor: "white",
                marginBottom: "10px",
                position: "fixed",
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                edge="start"
                sx={{ mr: 2, color: "#007EFF" }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap sx={{ color: "#007EFF" }}>
                Hello {user?.name}
              </Typography>
              <Avatar />
            </Box>
          )}
        </Box>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isMobile ? (
            <Drawer
              variant="temporary"
              open={open}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  borderRight: "0",
                  // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                },
              }}
            >
              {drawer}
            </Drawer>
          ) : (
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  borderRight: "0",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          )}
        </Box>
        <Container
          sx={{
            flexGrow: 1,
            p: 3,
          }}
        >
          {/* <Toolbar /> */}
          {!isMobile && (
            <Box
              sx={{
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                borderRadius: "20px",
                zIndex: 9999,
                padding: 2,
              }}
            >
              <Typography variant="h6" noWrap sx={{ color: "#007EFF" }}>
                Hello {user?.name}
              </Typography>
              <Avatar src={user?.profilePicture} />
            </Box>
          )}
          <Box sx={{ marginTop: "35px" }}>{children}</Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
