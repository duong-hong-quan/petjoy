"use client";
import useCallApi from "@/api/callApi";
import api from "@/api/config";
import { LoadingOverlay } from "@/app/components/LoadingOverlay";
import { BanReport, User } from "@/type";
import {
  Typography,
  TextField,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { useState, useEffect } from "react";
import BlockIcon from "@mui/icons-material/Block";
import KeyIcon from "@mui/icons-material/Key";
function ManagementUser() {
  const { callApi, loading } = useCallApi(api);
  const [users, setUsers] = useState<User[]>([]);
  const [reports, setReports] = useState<BanReport[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const fetchData = async () => {
    if (value === 0) {
      const response = await callApi("/user", "GET");
      if (response.isSuccess) {
        setUsers(response.data);
      }
    } else {
      const response = await callApi("/ban-report", "GET");
      if (response.isSuccess) {
        setReports(response.data);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [value]);

  const handleSearch = () => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setUsers(filtered);
  };
  const bannedUser = async (id: number) => {
    const response = await callApi(`/user/ban/${id}`, "PUT");
    if (response.isSuccess) {
      fetchData();
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);
  if (loading) {
    return <LoadingOverlay loading={loading} />;
  }
  return (
    <>
      <Box sx={{ padding: 3, minHeight: "100vh", paddingBlock: 0 }}>
        <Typography
          variant="h4"
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
          Người Dùng Tại PetJoy
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 4,
            gap: 2,
          }}
        >
          <TextField
            variant="filled"
            label="Tìm kiếm người dùng"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Tài khoản" />
          <Tab label="Báo cáo" />
        </Tabs>
        <TableContainer
          component={Paper}
          sx={{
            overflowX: "auto",
            borderRadius: "16px", // Apply border radius to the container
          }}
        >
          {value === 0 && (
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
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      color: "white",
                    }}
                  >
                    Avatar
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      color: "white",
                    }}
                  >
                    Tên
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      color: "white",
                    }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      color: "white",
                    }}
                  >
                    Trạng thái
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      color: "white",
                    }}
                  >
                    Hành động
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell align="center">
                      <Avatar
                        src={user.profilePicture}
                        sx={{
                          width: 50,
                          height: 50,
                          border: "2px solid #007EFF",
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">{user.name}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">
                      {user.isBanned ? "Banned" : "Hoạt động"}
                    </TableCell>

                    <TableCell align="center">
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "#007EFF", color: "white" }}
                        onClick={() => {
                          bannedUser(user.id);
                        }}
                      >
                        {user.isBanned ? <KeyIcon /> : <BlockIcon />}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {value === 1 && (
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
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      color: "white",
                    }}
                  >
                    STT
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      color: "white",
                    }}
                  >
                    Tên người báo cáo
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      color: "white",
                    }}
                  >
                    Tên người bị báo cáo
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      color: "white",
                    }}
                  >
                    Lí do
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      color: "white",
                    }}
                  >
                    Trạng thái
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      color: "white",
                    }}
                  >
                    Hành động
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.map((report, index) => (
                  <TableRow key={report.id} hover>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{report.reporter.name}</TableCell>
                    <TableCell align="center">{report.reported.name}</TableCell>
                    <TableCell align="center">{report.reason}</TableCell>
                    <TableCell align="center">
                      {report.isResolved ? "Đã xử lý" : "Chưa xử lý"}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "#007EFF", color: "white" }}
                        onClick={() => {
                          bannedUser(report.reported.id);
                        }}
                      >
                        {report.reported.isBanned ? <KeyIcon /> : <BlockIcon />}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Box>
    </>
  );
}
export default ManagementUser;
