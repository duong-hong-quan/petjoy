import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Link,
} from "@mui/material";
import background from "../../assets/img/background.png";
import dogcat from "../../assets/img/dogcat.png";
import { StyledTypography } from "../components/StyledTypography";
import { StyledButton } from "../components/StyledButton";

export default function HomePage() {
  return (
    <Box>
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={background.src}
          alt="Pets"
          sx={{
            maxWidth: "100%",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            padding: 2,
          }}
        >
          <StyledTypography
            variant="h4"
            sx={{
              color: "#0080ff",
              fontSize: "3.5rem",
              mb: 2,
            }}
          >
            KẾT NỐI NHỮNG TRÁI TIM YÊU ĐỘNG VẬT
          </StyledTypography>
          <StyledTypography
            variant="subtitle1"
            sx={{
              color: "black",
              fontSize: "1.4rem",
              mb: 2,
            }}
          >
            Chỉ mất một phút để mang lại niềm vui cho thú cưng của bạn
          </StyledTypography>
          <StyledButton
            variant="contained"
            sx={{
              backgroundColor: "#0080ff",
              color: "white",
              minWidth: "20rem",
            }}
          >
            Tạo tài khoản
          </StyledButton>
          <Typography
            variant="body2"
            sx={{ mt: 2, textAlign: "center", fontSize: "1.2rem" }}
          >
            <Box component="span" fontWeight="bold">
              Bằng cách nhấp vào tiếp tục, bạn đồng ý với
            </Box>{" "}
            <br />
            <Link href="#" color="primary" sx={{ mx: 1 }}>
              Điều khoản dịch vụ
            </Link>
            và
            <Link href="#" color="primary" sx={{ mx: 1 }}>
              Chính sách quyền riêng tư
            </Link>
            của chúng tôi
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 4, padding: "3rem" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    backgroundColor: "#0080ff",
                    color: "white",
                    borderRadius: "20px",
                    padding: "1rem",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  VỀ PETJOY
                </Typography>
                <Box sx={{ px: 2, py: 2 }}>
                  <Typography variant="body1" paragraph>
                    PetJoy ra đời với mục đích tạo ra một hệ sinh thái đa năng
                    dành cho thú cưng, cung cấp một nền tảng toàn diện để giúp
                    chủ nhân quản lý và tương tác với thú cưng của mình một cách
                    hiệu quả và thuận tiện.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Với PetJoy, người nuôi thú cưng có thể tận hưởng nhiều tiện
                    ích được thiết kế đặc biệt để đáp ứng các nhu cầu đa dạng
                    của thú cưng và chủ nhân.
                  </Typography>
                  <StyledButton
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: "#FDBA13",
                      color: "white",
                    }}
                  >
                    THAM GIA NGAY
                  </StyledButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                image={dogcat.src}
                alt="Dog and cat"
                sx={{ height: "100%", objectFit: "cover" }}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
