"use client";
import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
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

const barChartData = [
  { name: "Jan", count: 400 },
  { name: "Feb", count: 300 },
  { name: "Mar", count: 200 },
  { name: "Apr", count: 278 },
  { name: "May", count: 189 },
];

const pieChartData = [
  { name: "Active", value: 400 },
  { name: "Completed", value: 300 },
  { name: "Violated", value: 300 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Bảng thống kê
      </Typography>

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
              <Typography variant="h4">1,000</Typography>
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
              <Typography variant="h4">750</Typography>
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
              <Typography variant="h4">1.000.000đ</Typography>
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
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
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
                Case Status Distribution
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
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
