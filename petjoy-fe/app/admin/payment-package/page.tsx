"use client";
import useCallApi from "@/api/callApi";
import api from "@/api/config";
import { LoadingOverlay } from "@/app/components/LoadingOverlay";
import PackageCards from "@/app/components/PackageCard";
import { PaymentPackage } from "@/type";
import {
  Typography,
  TextField,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ManagementPaymentPackage = () => {
  const { callApi, loading } = useCallApi(api);
  const [packages, setPackages] = useState<PaymentPackage[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PaymentPackage | null>(
    null
  );
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    duration: 0,
  } as PaymentPackage);

  const fetchData = async () => {
    const data = await callApi("/payment-package", "GET");
    if (data.isSuccess) {
      setPackages(data.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectChange = (event: SelectChangeEvent<number>) => {
    setFormData({ ...formData, duration: Number(event.target.value) });
  };

  const handleOpen = (pkg: PaymentPackage) => {
    setSelectedPackage(pkg);
    setFormData({
      name: pkg.name,
      price: pkg.price,
      description: pkg.description,
      duration: pkg.duration,
    } as PaymentPackage);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPackage(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (selectedPackage) {
      const response = await callApi(
        `/payment-package/${selectedPackage.id}`,
        "PUT",
        formData
      );
      if (response.isSuccess) {
        toast.success("Update successfully");
      }
    }
    fetchData();
    handleClose();
  };

  return (
    <Box sx={{ padding: 3, minHeight: "100vh" }}>
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
            CÁC GÓI ĐĂNG KÝ TẠI PETJOY
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 4,
              gap: 2,
            }}
          >
            <TextField variant="filled" label="Tìm kiếm gói" />
          </Box>
          <PackageCards packages={packages} onSelect={handleOpen} />
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Cập Nhật Gói</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Tên Gói"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                disabled
              />

              <FormControl fullWidth margin="dense">
                <InputLabel id="duration-label">Thời Gian</InputLabel>
                <Select
                  labelId="duration-label"
                  name="duration"
                  value={formData.duration}
                  onChange={handleSelectChange}
                  label="Thời Gian"
                  disabled
                >
                  <MenuItem value={0}>Tuần</MenuItem>
                  <MenuItem value={1}>Tháng</MenuItem>
                </Select>
              </FormControl>
              <TextField
                autoFocus
                margin="dense"
                name="description"
                label="Mô tả"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.description}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                name="price"
                label="Giá"
                type="number"
                fullWidth
                variant="outlined"
                value={formData.price}
                onChange={handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Hủy
              </Button>
              <Button onClick={handleSubmit} color="secondary">
                Cập Nhật
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <LoadingOverlay loading={loading} />
      )}
    </Box>
  );
};

export default ManagementPaymentPackage;
