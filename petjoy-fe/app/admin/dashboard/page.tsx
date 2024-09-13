"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import useCallApi from "@/api/callApi";
import api from "@/api/config";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const Dashboard = () => {
  const { callApi } = useCallApi(api);

  const [data, setData] = useState({
    totalUsers: 0,
    totalPayments: 0,
    totalPaymentAmount: 0,
    monthlyPayments: [],
    paymentsByStatus: {},
  });

  // Calculate start and end dates of the current month
  const currentDate = new Date();
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const [from, setFrom] = useState<string>(
    startOfMonth.toISOString().split("T")[0]
  );
  const [to, setTo] = useState<string>(endOfMonth.toISOString().split("T")[0]);

  const fetchData = async () => {
    const endpoint = from && to ? `/reports?from=${from}&to=${to}` : "/reports";
    const response = await callApi(endpoint, "GET");
    if (response.isSuccess) {
      setData(response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Bảng thống kê
      </Typography>
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Từ ngày"
            type="date"
            fullWidth
            value={to}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setFrom(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Đến ngày"
            type="date"
            fullWidth
            value={from}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setTo(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={fetchData}>
            Lọc dữ liệu
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Tổng khách hàng
              </Typography>
              <Typography variant="h4">{data.totalUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Tổng giao dịch
              </Typography>
              <Typography variant="h4">{data.totalPayments}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Lợi nhuận ròng
              </Typography>
              <Typography variant="h4">
                {new Intl.NumberFormat("VI", {
                  style: "currency",
                  currency: "VND",
                }).format(data.totalPaymentAmount)}
              </Typography>{" "}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Số lượng giao dịch theo tháng
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.monthlyPayments}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Trạng thái giao dịch
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={Object.entries(data.paymentsByStatus).map(
                        ([name, value]) => ({
                          name: !name ? "GD Thất bại" : "GD Thành công",
                          value,
                        })
                      )}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {Object.entries(data.paymentsByStatus).map(
                        ([name], index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        )
                      )}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
