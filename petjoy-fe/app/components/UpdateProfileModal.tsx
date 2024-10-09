import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { User } from "@/type";
import { storage } from "@/firebase/firebase"; // Import the storage instance
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import necessary functions from Firebase Storage

interface ProfileUpdateModalProps {
  open: boolean;
  onClose: () => void;
  user: User;
  onUpdateProfile: (userData: Partial<User>) => Promise<void>;
}

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const ProfileUpdateModal: React.FC<ProfileUpdateModalProps> = ({
  open,
  onClose,
  user,
  onUpdateProfile,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: user.password,
      });
      setAvatarPreview(user.profilePicture);
    }
  }, [user]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let profilePictureUrl = user.profilePicture;

      if (avatar) {
        const storageRef = ref(storage, `avatars/${avatar.name}`);
        await uploadBytes(storageRef, avatar);
        profilePictureUrl = await getDownloadURL(storageRef);
      }

      // Update the user profile
      await onUpdateProfile({
        ...formData,
        password: user.password,
        profilePicture: profilePictureUrl,
      });

      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="profile-update-modal"
      aria-describedby="update-your-profile-information"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#0080ff",
            fontSize: "1rem",
            textTransform: "uppercase",
          }}
        >
          Cập nhật thông tin của tôi
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Box sx={{ position: "relative" }}>
                <Avatar
                  src={avatarPreview}
                  sx={{ width: 100, height: 100 }}
                  alt={formData.name}
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  sx={{
                    position: "absolute",
                    bottom: -8,
                    right: -8,
                    bgcolor: "background.paper",
                  }}
                >
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleAvatarChange}
                    accept="image/*"
                  />
                  <PhotoCamera />
                </IconButton>
              </Box>
            </Box>

            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "flex-end",
                mt: 2,
              }}
            >
              <Button onClick={onClose} disabled={loading}>
                Huỷ
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                Cập nhật thông tin
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default ProfileUpdateModal;
