import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Link,
} from "@mui/material";
import { styled } from "@mui/system";
import background from "../../../assets/img/background.png";
import dogcat from "../../../assets/img/dogcat.png";
export default function HomePage() {
  return (
    <>
      <Box>
        <Box
          sx={{
            backgroundImage: `url(${background.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Container>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: "bold",
                color: "#0080ff",
                fontSize: "3rem",
                textAlign: "center",
              }}
              gutterBottom
            >
              KẾT NỐI NHỮNG TRÁI TIM YÊU ĐỘNG VẬT
            </Typography>
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "black",
                fontSize: "1.2rem",
              }}
            >
              Chỉ mất một phút để mang lại niềm vui cho thú cưng của bạn
            </Typography>
            <Button
              sx={{
                mt: 2,
                backgroundColor: "#0080ff",
                color: "white",
                borderRadius: "1rem",
                minWidth: "20rem",
                fontSize: "1.2rem",
              }}
            >
              Tạo tài khoản
            </Button>
            <Typography
              variant="body2"
              sx={{ mt: 2, textAlign: "center", fontSize: "1rem" }}
            >
              <span className="font-bold">
                Bằng cách nhấp vào tiếp tục, bạn đồng ý với
              </span>
              <br />
              <span className="text-[#0080ff] mx-2">Điều khoản dịch vụ</span>và
              <span className="mx-2 text-[#0080ff]">
                Chính sách quyền riêng tư
              </span>
              của chúng tôi
            </Typography>
          </Container>
        </Box>
        <Box>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              backgroundColor: "#0080ff",
              color: "white",
              padding: "1rem",
              fontWeight: "bold",
              width: "fit-content",
              marginTop: "3.8rem",
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
            }}
          >
            VỀ PETJOY
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={6}>
              <div className="px-10 py-4">
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1.2rem",
                  }}
                >
                  PetJoy ra đời với mục đích tạo ra một hệ sinh thái đa năng
                  dành cho thú cưng, cung cấp một nền tảng toàn diện để giúp chủ
                  nhân quản lý và tương tác với thú cưng của mình một cách hiệu
                  quả và thuận tiện.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1.2rem",
                  }}
                >
                  Với PetJoy, người nuôi thú cưng có thể tận hưởng nhiều tiện
                  ích được thiết kế đặc biệt để đáp ứng các nhu cầu đa dạng của
                  thú cưng và chủ nhân.
                </Typography>
                <Button
                  sx={{
                    backgroundColor: "#FDBA13",
                    color: "white",
                    borderRadius: "20px",
                    padding: "4px",
                    fontWeight: "bold",
                    fontSize: "1.4rem",
                    width: "100%",
                  }}
                >
                  THAM GIA NGAY
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                  component="img"
                  height="100"
                  image={dogcat.src}
                  alt="Dog and cat"
                />
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}