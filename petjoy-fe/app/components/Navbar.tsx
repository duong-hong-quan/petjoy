"use client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          PETJOY
        </Typography>
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
