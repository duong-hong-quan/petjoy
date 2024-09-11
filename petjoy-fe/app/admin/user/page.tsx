"use client";
import useCallApi from "@/api/callApi";
import api from "@/api/config";
import { LoadingOverlay } from "@/app/components/LoadingOverlay";
import { User } from "@/type";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  TextField,
  Box,
  Button,
  InputAdornment,
  IconButton,
  Chip,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

function ManagementUser() {
  const { callApi, loading } = useCallApi(api);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const fetchData = async () => {
    const response = await callApi("/user", "GET");
    if (response.isSuccess) {
      setUsers(response.data);
      setFilteredUsers(response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleClear = () => {
    setSearchTerm("");
    setFilteredUsers(users);
  };
  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  return (
    <Box sx={{ padding: 3 }}>
      {!loading ? (
        <>
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
          {/* <TableContainer
            sx={{
              padding: "20px",
              borderRadius: "8px",
              width: "100%",
              overflowX: "auto",
            }}
          >
            <Box sx={{ minWidth: 650 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                    >
                      Avatar
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                    >
                      Tên
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                    >
                      Email
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
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} hover>
                      <TableCell
                        align="center"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
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
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#007EFF",
                            color: "white",
                          }}
                          onClick={() => {}}
                        >
                          Ban
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </TableContainer> */}
        </>
      ) : (
        <LoadingOverlay loading={loading} />
      )}
    </Box>
  );
}

export default ManagementUser;
