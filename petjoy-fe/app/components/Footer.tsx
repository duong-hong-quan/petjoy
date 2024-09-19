"use client";
import useCallApi from "@/api/callApi";
import api from "@/api/config";
import { PaymentPackage } from "@/type";
import { Typography, Container, Grid, Box, Link } from "@mui/material";
import { useEffect, useState } from "react";
function Footer() {
  const { callApi, error, loading } = useCallApi(api);
  const [packages, setPackkages] = useState<PaymentPackage[]>();
  const fetchData = async () => {
    const response = await callApi("payment-package", "GET");
    if (response.isSuccess) {
      setPackkages(response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box
      position={"static"}
      sx={{
        bgcolor: "#0080ff",
        color: "white",
        mt: 4,
        py: 4,
        bottom: 0,
        zIndex: 50,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
              PETJOY
            </Typography>
            <Typography variant="body1">Trang chủ</Typography>
            <Typography variant="body1">Quẹt</Typography>
            <Typography variant="body1">Hồ sơ</Typography>
            <Typography variant="body1">Lượt thích</Typography>
            <Typography variant="body1">Khám phá</Typography>
            <Typography variant="body1">Mẹo vặt</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Tìm hiểu thêm
            </Typography>
            <Typography variant="body1">Câu hỏi thường gặp</Typography>
            <Typography variant="body1">Chính sách & quyền riêng tư</Typography>
            <Typography variant="body1">Thỏa thuận sử dụng</Typography>
            <Typography variant="body1">Điều khoản</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "#FDBA13", fontWeight: "bold" }}
            >
              Các gói tính năng cao cấp
            </Typography>
            {packages &&
              packages.length > 0 &&
              packages.map((item) => (
                <Typography variant="body1">
                  {item?.duration === 0 ? "Gói tuần" : "Gói tháng"}:{" "}
                  {item.price}
                </Typography>
              ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
