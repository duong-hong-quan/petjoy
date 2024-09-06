"use client";
import { Typography, Container, Grid, Box, Link } from "@mui/material";
function Footer() {
  return (
    <Box sx={{ bgcolor: "#0080ff", color: "white", mt: 4, py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              PETJOY
            </Typography>
            <Typography variant="body2">Trang chủ</Typography>
            <Typography variant="body2">Quet</Typography>
            <Typography variant="body2">Hồ sơ</Typography>
            <Typography variant="body2">Lượt thích</Typography>
            <Typography variant="body2">Khám phá</Typography>
            <Typography variant="body2">Mèo vặt</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Tìm hiểu thêm
            </Typography>
            <Typography variant="body2">Câu hỏi thường gặp</Typography>
            <Typography variant="body2">Chính sách & quyền riêng tư</Typography>
            <Typography variant="body2">Thỏa thuận sử dụng</Typography>
            <Typography variant="body2">Điều khoản</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "#FDBA13", fontWeight: "bold" }}
            >
              Các gói tính năng cao cấp
            </Typography>
            <Typography variant="body2">Theo tuần: 35.000đ/ tuần</Typography>
            <Typography variant="body2">Theo tháng: 138.000đ/ tháng</Typography>
            <Typography variant="h6" gutterBottom>
              Liên hệ
            </Typography>
            <Link
              href="https://petjoy.com.vn"
              color="inherit"
              underline="hover"
            >
              Petjoy.com.vn
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
