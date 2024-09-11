import React from "react";
import { Box, Card, Grid, Typography, Button } from "@mui/material";
import { PaymentPackage } from "../../type";

interface PackageCardsProps {
  packages: PaymentPackage[];
  onSelect: (selectedPackage: PaymentPackage) => void;
}

const PackageCards = ({ packages, onSelect }: PackageCardsProps) => {
  return (
    <Grid container spacing={3}>
      {packages.map((pkg) => (
        <Grid item xs={12} sm={6} md={4} key={pkg.id}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-10px)",
                boxShadow: "0 12px 20px rgba(0, 0, 0, 0.1)",
              },
              borderRadius: "16px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Box
              sx={{
                background: (theme) =>
                  `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                p: 3,
                color: "white",
              }}
            >
              <Typography
                variant="h5"
                component="div"
                gutterBottom
                fontWeight="bold"
              >
                {pkg.name}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                }}
                gutterBottom
              >
                {parseInt(pkg.price.toString()).toLocaleString()} ₫
              </Typography>
            </Box>
            <Box sx={{ p: 3, flexGrow: 1 }}>
              <Typography variant="body1" color="text.secondary">
                {pkg.description}
              </Typography>
            </Box>
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: "auto",
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
              onClick={() => onSelect(pkg)}
            >
              Chọn Gói
            </Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PackageCards;
