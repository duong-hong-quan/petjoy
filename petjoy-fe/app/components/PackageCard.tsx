import React, { useState } from "react";
import { Card, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Theme } from "@mui/material/styles";
import { PaymentPackage } from "../../type";

interface PackageCardsProps {
  packages: PaymentPackage[];
  onSelect: (selectedPackage: PaymentPackage) => void;
}

const StyledCard = styled(Card)(({ theme }: { theme: Theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[4],
  },
}));

const PackageCards = ({ packages, onSelect }: PackageCardsProps) => {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  const handleSelect = (pkg: PaymentPackage) => {
    setSelectedPackage(pkg.id);
    onSelect(pkg);
  };

  return (
    <Grid container spacing={3}>
      {packages.map((pkg) => (
        <Grid item xs={12} sm={6} key={pkg.id}>
          <StyledCard
            variant="outlined"
            sx={{
              borderColor:
                selectedPackage === pkg.id ? "primary.main" : "grey.300",
            }}
            onClick={() => handleSelect(pkg)}
          >
            <Typography variant="h5" component="div" gutterBottom>
              {pkg.name}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                color: "black",
              }}
              gutterBottom
            >
              {parseInt(pkg.price).toLocaleString()} ₫
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {pkg.description}
            </Typography>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default PackageCards;
