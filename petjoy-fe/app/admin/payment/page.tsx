"use client";
import useCallApi from "@/api/callApi";
import api from "@/api/config";
import React, { useState, useEffect } from "react";
import { Payment } from "../../../type";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";

export default function ManagementPayment() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const { loading, error, callApi } = useCallApi(api);

  const fetchData = async () => {
    const data = await callApi("/payment", "GET");
    if (data.isSuccess) {
      setPayments(data.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleStatus = async (payment: Payment) => {
    payment.status = true;
    const data = await callApi(`/payment`, "PUT", payment);
    if (data.isSuccess) {
      toast.success("Update successfully");
      await fetchData();
    }
  };
  return (
    <Box sx={{ padding: 3, minHeight: "100vh", paddingBlock: 0 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          textAlign: "center",
          color: "#007EFF",
          fontWeight: "bold",
          marginBottom: 4,
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        Quản lý thanh toán
      </Typography>
      {loading && (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginBottom: 4 }}
        >
          <CircularProgress />
        </Box>
      )}

      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
              >
                ID
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
              >
                Người dùng
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
              >
                Gói
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
              >
                Giá tiền
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
              >
                Ngày
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
              >
                Trạng thái
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
              >
                Hành động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id} hover>
                <TableCell align="center">{payment.id}</TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Avatar
                      src={payment.user.profilePicture}
                      sx={{ width: 50, height: 50, marginRight: 2 }}
                    />
                    <Box>
                      <Typography>{payment.user.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {payment.user.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  {payment.paymentPackage.name}
                </TableCell>
                <TableCell align="center">{payment.amount}</TableCell>
                <TableCell align="center">
                  {new Date(payment.paymentDate).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                  {payment.status === true
                    ? "Đã thanh toán"
                    : "Chưa thanh toán"}
                </TableCell>
                <TableCell align="center">
                  {!payment.status && (
                    <Button onClick={() => handleStatus(payment)}>
                      ĐÃ NHẬN TIỀN
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
