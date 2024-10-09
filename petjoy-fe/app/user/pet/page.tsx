"use client";
import { Box, Button, Container, Typography } from "@mui/material";
import background from "../../../assets/img/background.png";
import pawLogo from "../../../assets/img/paw-logo.png";
import { useRouter } from "next/navigation";
const IntroCreatePetPage = () => {
  const router = useRouter();
  return (
    <div>
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
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            borderRadius: "10px",
            backgroundColor: "white",
            padding: " 10px 40px",
            border: "1px solid #ccc",
            width: "fit-content",
            boxShadow: "0 0 3px 0",
          }}
        >
          <img src={pawLogo.src} alt="paw-logo" className="my-2" />
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#0080ff",
              fontSize: "2rem",
              textAlign: "center",
            }}
            gutterBottom
          >
            TẠO HỒ SƠ THÚ CƯNG
          </Typography>
          <Typography
            variant="subtitle2"
            gutterBottom
            sx={{
              color: "black",
              fontSize: "1.2rem",
            }}
          >
            Tối thiểu 1 hồ sơ
          </Typography>
          <Button
            sx={{
              backgroundColor: "#FDBA13",
              color: "white",
              borderRadius: "10px",
              padding: "10px 20px",
              fontSize: "1rem",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
              width: "100%",
            }}
            onClick={() => {
              router.push("/user/pet/pet-create");
            }}
          >
            Tạo hồ sơ
          </Button>
        </Container>
      </Box>
    </div>
  );
};

export default IntroCreatePetPage;
