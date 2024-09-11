"use client";

import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PeopleIcon from "@mui/icons-material/People";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const drawerWidth = 240;

const menuItems = [
  {
    label: "Bảng điều khiển",
    icon: <DashboardIcon />,
    link: "/admin/dashboard",
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

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const drawer = (
    <>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: [1],
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
          PETJOY
        </Typography>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ display: "block" }}>
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
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            borderRadius: "300px",
            marginTop: "10px",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            backgroundColor: "white",
          }}
        >
          <Toolbar
            sx={{
              boxShadow: "none",
              display: "flex",
              justifyContent: "space-between",
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
              Hello Admin
            </Typography>
            <Avatar />
          </Toolbar>
        </AppBar>
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
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
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
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            minHeight: "100dvh",
          }}
        >
          <Toolbar />
          {children}
        </Box>
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
