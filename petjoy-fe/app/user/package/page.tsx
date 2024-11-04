"use client";
import React, { useEffect, useState } from "react";
import { PaymentPackage } from "../../../type";
import Container from "@mui/material/Container";
import useCallApi from "../../../api/callApi";
import api from "../../../api/config";
import PackageCard from "../../components/PackageCard";
import {
  Box,
  Modal,
  Typography,
  Button,
  Divider,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { toast } from "react-toastify";
import { CheckCircle, Close } from "@mui/icons-material";
import QR139 from "../../../assets/img/QR139.png";
import QR35 from "../../../assets/img/QR35.png";

const Package = () => {
  const [packages, setPackages] = useState<PaymentPackage[]>([]);
  const { callApi } = useCallApi(api);
  const [selectedPackage, setSelectedPackage] = useState<PaymentPackage | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  const fetchData = async () => {
    const response = await callApi("payment-package", "GET");
    if (response.isSuccess) {
      setPackages(response.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSelect = (data: PaymentPackage) => {
    setSelectedPackage(data);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  const handleConfirm = async () => {
    if (selectedPackage) {
      const response = await callApi(`payment`, "POST", {
        userId: user?.id,
        paymentPackageId: selectedPackage.id,
      });
      if (response.isSuccess) {
        fetchData();
        handleClose();
        toast.success(
          "Mua gói thành công. Bạn hãy chờ chúng tôi 1 lát để xác thực "
        );
      } else {
        toast.error("Mua gói thất bại");
      }
    }
    setIsConfirmDialogOpen(false);
  };

  const handleOpenConfirmDialog = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setIsConfirmDialogOpen(false);
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          marginTop: "20px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            margin: "20px 0",
            fontWeight: "bold",
            color: "#1976d2",
          }}
        >
          {"Mua gói quẹt để gia tăng cơ hội gặp gỡ".toUpperCase()}
        </Typography>
        <PackageCard packages={packages} onSelect={onSelect} />
      </Box>
      {selectedPackage && (
        <Modal open={isModalOpen} onClose={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 2,
              p: 0,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                bgcolor: "primary.main",
                color: "primary.contrastText",
                p: 3,
                position: "relative",
              }}
            >
              <Typography variant="h5" component="h2" fontWeight="bold">
                {selectedPackage.name}
              </Typography>

              <Close
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  cursor: "pointer",
                }}
                onClick={handleClose}
              />
            </Box>
            <Box sx={{ p: 3 }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {selectedPackage.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                Giá:
                {parseInt(selectedPackage.price.toString()).toLocaleString()} ₫
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <CheckCircle color="success" sx={{ mr: 1 }} />
                <Typography variant="body2">
                  Sử dụng trong {selectedPackage.duration === 0 ? "7" : "30"}{" "}
                  ngày
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <CheckCircle color="success" sx={{ mr: 1 }} />
                <Typography variant="body2">Hỗ trợ 24/7</Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1">
                  Vui lòng chuyển khoản theo QR bên dưới
                </Typography>
                <CardMedia
                  component="img"
                  image={selectedPackage.id === 1 ? QR139.src : QR35.src}
                  alt="QR Code"
                  sx={{
                    width: "100%",
                    height: "auto",
                    maxWidth: "200px",
                    margin: "auto",
                  }}
                />
              </Box>
              <Button
                variant="contained"
                fullWidth
                onClick={handleOpenConfirmDialog}
                sx={{
                  mt: 2,
                  bgcolor: "secondary.main",
                  "&:hover": {
                    bgcolor: "secondary.dark",
                  },
                }}
              >
                Mua ngay
              </Button>
            </Box>
          </Box>
        </Modal>
      )}
      <Dialog
        open={isConfirmDialogOpen}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">Xác nhận mua gói</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Bạn đã chắc chắn rằng bạn đã chuyển khoản cho chúng tôi thành công chưa ạ 😍 ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Package;