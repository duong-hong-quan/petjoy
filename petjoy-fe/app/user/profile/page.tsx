"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Box,
  Chip,
} from "@mui/material";
import {
  Person as PersonIcon,
  Pets as PetsIcon,
  AttachMoney as MoneyIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { Payment, Pet } from "@/type";
import useCallApi from "@/api/callApi";
import api from "@/api/config";
import { calculateAge } from "@/utils/utility";
const UserProfile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [pets, setPets] = useState<Pet[] | []>();
  const [payments, setPayments] = useState<Payment[] | []>();

  const { loading, callApi, error } = useCallApi(api);
  const fetchData = async () => {
    const data = await callApi(`pet/by-user-id/${user?.id}`, "GET");
    if (data.isSuccess) {
      setPets(data.data);
    }
    const dataPayment = await callApi(`/payment/${user?.id}`, "GET");
    if (dataPayment.isSuccess) {
      setPayments(dataPayment.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  // const payments = [
  //   {
  //     id: 1,
  //     amount: 50.0,
  //     date: "2024-09-01",
  //     method: "Credit Card",
  //   },
  //   {
  //     id: 2,
  //     amount: 35.5,
  //     date: "2024-08-15",
  //     method: "PayPal",
  //   },
  //   {
  //     id: 3,
  //     amount: 75.25,
  //     date: "2024-07-30",
  //     method: "Bank Transfer",
  //   },
  //   {
  //     id: 4,
  //     amount: 60.0,
  //     date: "2024-07-15",
  //     method: "Credit Card",
  //   },
  // ];
  const getStatusLabel = (status: boolean) => {
    switch (status) {
      case false:
        return "Đang kiểm duyệt";
        break;
      case true:
        return "Đang hoạt động";
        break;
    }
  };
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* User Information */}
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              mb: 2,
              backgroundColor: "#1976d2",
              color: "white",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                mr: 3,
                border: "3px solid white",
              }}
              src={user?.profilePicture}
            ></Avatar>
            <Box>
              <Typography variant="h4" gutterBottom fontWeight="bold">
                {user?.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <PersonIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                {user?.email}
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Pet Profiles */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ display: "flex", alignItems: "center" }}
            >
              <PetsIcon sx={{ mr: 1 }} />
              Hồ sơ thú cưng
            </Typography>
            <List>
              {pets &&
                pets.length > 0 &&
                pets.map((pet, index) => (
                  <React.Fragment key={pet.id}>
                    <ListItem
                      sx={{ flexDirection: "column", alignItems: "flex-start" }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="h6" color="primary">
                            {pet.name}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Giống: {pet.breed}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Đang tìm kiếm: {pet.isHiringPetType.name}
                            </Typography>
                            <Chip
                              label={pet.petType.name}
                              sx={{ mr: 1, mb: 1 }}
                              color="secondary"
                              size="small"
                            />
                            <Chip
                              label={`${calculateAge(pet.dob.toString())} `}
                              sx={{ mr: 1, mb: 1 }}
                              color="info"
                              size="small"
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < pets.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
            </List>
          </Paper>
        </Grid>

        {/* Payment History */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ display: "flex", alignItems: "center" }}
            >
              <MoneyIcon sx={{ mr: 1 }} />
              Lịch sử thanh toán
            </Typography>
            <List>
              {payments &&
                payments.length > 0 &&
                payments.map((payment, index) => (
                  <React.Fragment key={payment.id}>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="h6" color="primary">
                            {new Intl.NumberFormat("VN", {
                              currency: "VND",
                            }).format(payment.amount)}
                            VNĐ
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Ngày: {payment.paymentDate.toString()}
                            </Typography>
                            <Chip
                              label={getStatusLabel(payment.status)}
                              sx={{ mt: 1 }}
                              color="success"
                              size="small"
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < payments.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;
