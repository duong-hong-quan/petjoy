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

      <TableContainer
        component={Paper}
        sx={{
          overflowX: "auto",
          borderRadius: "16px", // Apply border radius to the container
        }}
      >
        <Table>
          <TableHead
            sx={{
              backgroundColor: "#007EFF",
              "& th:first-of-type": {
                borderTopLeftRadius: "16px", // Apply border radius to the first cell
                borderBottomLeftRadius: "16px",
              },
              "& th:last-of-type": {
                borderTopRightRadius: "16px", // Apply border radius to the last cell
                borderBottomRightRadius: "16px",
              },
            }}
          >
            <TableRow>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "1.1rem", color: "white" }}
              >
                ID
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "1.1rem", color: "white" }}
              >
                Người dùng
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "1.1rem", color: "white" }}
              >
                Gói
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "1.1rem", color: "white" }}
              >
                Giá tiền
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "1.1rem", color: "white" }}
              >
                Ngày
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "1.1rem", color: "white" }}
              >
                Trạng thái
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", fontSize: "1.1rem", color: "white" }}
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
                <TableCell align="center">
                  {parseInt(payment.amount.toString()).toLocaleString()} ₫
                </TableCell>
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
