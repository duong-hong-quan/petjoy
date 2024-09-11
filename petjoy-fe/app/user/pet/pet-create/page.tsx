"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  FormControl,
  FormLabel,
  InputAdornment,
  Select,
  MenuItem,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Input,
} from "@mui/material";
import { DateRange, CloudUpload, Pets, Delete } from "@mui/icons-material";
import useCallApi from "@/api/callApi";
import api from "@/api/config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { LoadingOverlay } from "@/app/components/LoadingOverlay";
import AuthWrapper from "@/app/auth-route/AuthWrapper";
import { storage } from "@/firebase/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

interface Image {
  file: File;
  preview: string;
  url?: string;
}

const PetRegistrationForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { error, loading, callApi } = useCallApi(api);

  const [images, setImages] = useState<Image[]>([]);
  const user = useSelector((state: RootState) => state.auth.user || null);
  const onSubmit = async (data: any) => {
    if (user) {
      const uploadedImages = await Promise.all(
        images.map(async (image) => {
          const storageRef = ref(storage, `images/${image.file.name}`);
          await uploadBytes(storageRef, image.file);
          const url = await getDownloadURL(storageRef);
          return url;
        })
      );
      debugger;
      if (user) {
        const response = await callApi("pet", "POST", {
          name: data.name,
          dob: data.dob,
          breed: data.breed,
          profilePicture: uploadedImages[0] || "string",
          ownerId: user.id,
          petTypeId: Number(data.petTypeId),
          isHiringPetTypeId: Number(data.isHiringPetTypeId),
          filterPetTypeId: Number(data.filterPetTypeId),
        });
        if (response.isSuccess) {
          toast.success("Hồ sơ thú cưng đã được tạo");
        }
      }
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = async (index: number) => {
    const imageToRemove = images[index];
    if (imageToRemove.url) {
      const storageRef = ref(storage, imageToRemove.url);
      await deleteObject(storageRef);
    }
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  // Custom styles for rounded corners and labels
  const roundedStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "15px",
    },
    "& .MuiSelect-select": {
      borderRadius: "15px",
    },
    "& .MuiInputLabel-root": {
      fontWeight: "bold",
      color: "#007EFF",
    },
  };

  // Custom style for form labels
  const labelStyle = {
    fontWeight: "bold",
    color: "#007EFF",
    marginBottom: 1,
  };

  return loading ? (
    <LoadingOverlay loading />
  ) : (
    <AuthWrapper>
      <Box sx={{ padding: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            color: "#007EFF",
            fontWeight: "bold",
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          Tạo hồ sơ thú cưng
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: "Tên là bắt buộc" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Tên thú cưng"
                    variant="outlined"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                    sx={{ ...roundedStyle, marginBottom: 2 }}
                  />
                )}
              />
              <Controller
                name="breed"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Giống"
                    variant="outlined"
                    fullWidth
                    sx={{ ...roundedStyle, marginBottom: 2 }}
                  />
                )}
              />
              <FormControl
                component="fieldset"
                sx={{ marginBottom: 2, width: "100%" }}
              >
                <FormLabel component="legend" sx={labelStyle}>
                  Loài
                </FormLabel>
                <Controller
                  name="petTypeId"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Loài là bắt buộc" }}
                  render={({ field }) => (
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button
                        {...field}
                        onClick={() => field.onChange("1")}
                        variant={field.value === "1" ? "contained" : "outlined"}
                        startIcon={<Pets />}
                        sx={{ flex: 1, borderRadius: "15px" }}
                      >
                        Chó
                      </Button>
                      <Button
                        {...field}
                        onClick={() => field.onChange("2")}
                        variant={field.value === "2" ? "contained" : "outlined"}
                        startIcon={<Pets />}
                        sx={{ flex: 1, borderRadius: "15px" }}
                      >
                        Mèo
                      </Button>
                    </Box>
                  )}
                />
              </FormControl>

              <Controller
                name="dob"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Ngày sinh"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DateRange />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ ...roundedStyle, marginBottom: 2 }}
                  />
                )}
              />

              <FormControl
                component="fieldset"
                sx={{ marginBottom: 2, width: "100%" }}
              >
                <FormLabel component="legend" sx={labelStyle}>
                  Mong muốn tìm kiếm
                </FormLabel>
                <Controller
                  name="isHiringPetTypeId"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Mong muốn tìm kiếm là bắt buộc" }}
                  render={({ field }) => (
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button
                        {...field}
                        onClick={() => field.onChange("1")}
                        variant={field.value === "1" ? "contained" : "outlined"}
                        startIcon={<Pets />}
                        sx={{ flex: 1, borderRadius: "15px" }}
                      >
                        Bạn đời
                      </Button>
                      <Button
                        {...field}
                        onClick={() => field.onChange("2")}
                        variant={field.value === "2" ? "contained" : "outlined"}
                        startIcon={<Pets />}
                        sx={{ flex: 1, borderRadius: "15px" }}
                      >
                        Giao lưu
                      </Button>
                    </Box>
                  )}
                />
              </FormControl>

              <FormControl
                component="fieldset"
                sx={{ marginBottom: 2, width: "100%" }}
              >
                <FormLabel component="legend" sx={labelStyle}>
                  Hiển thị
                </FormLabel>
                <Controller
                  name="filterPetTypeId"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Hiển thị là bắt buộc" }}
                  render={({ field }) => (
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button
                        {...field}
                        onClick={() => field.onChange("1")}
                        variant={field.value === "1" ? "contained" : "outlined"}
                        sx={{ flex: 1, borderRadius: "15px" }}
                      >
                        Chó
                      </Button>
                      <Button
                        {...field}
                        onClick={() => field.onChange("2")}
                        variant={field.value === "2" ? "contained" : "outlined"}
                        sx={{ flex: 1, borderRadius: "15px" }}
                      >
                        mèo
                      </Button>
                    </Box>
                  )}
                />
              </FormControl>

              {/* <Controller
              name="area"
              control={control}
              defaultValue=""
              rules={{ required: "Khu vực là bắt buộc" }}
              render={({ field }) => (
                <FormControl fullWidth sx={{ marginBottom: 2 }}>
                  <FormLabel sx={labelStyle}>Khu vực</FormLabel>
                  <Select {...field} displayEmpty sx={roundedStyle}>
                    <MenuItem value="" disabled>
                      Chọn khu vực
                    </MenuItem>
                    <MenuItem value="hanoi">Hà Nội</MenuItem>
                    <MenuItem value="hochiminh">Hồ Chí Minh</MenuItem>
                  </Select>
                </FormControl>
              )}
            /> */}
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <FormLabel sx={labelStyle}>Ảnh hồ sơ</FormLabel>
                <Input
                  type="file"
                  onChange={handleImageChange}
                  disableUnderline
                  fullWidth
                  endAdornment={
                    <InputAdornment position="end">
                      <CloudUpload />
                    </InputAdornment>
                  }
                />
              </FormControl>
              {images.length > 0 && (
                <ImageList
                  sx={{ width: "100%", height: 450 }}
                  cols={3}
                  rowHeight={164}
                >
                  {images.map((image, index) => (
                    <ImageListItem key={index}>
                      <img
                        src={image.preview}
                        alt={`Preview ${index + 1}`}
                        loading="lazy"
                        style={{ height: "100%", objectFit: "cover" }}
                      />
                      <ImageListItemBar
                        sx={{
                          background:
                            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                            "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                        }}
                        position="top"
                        actionIcon={
                          <IconButton
                            sx={{ color: "white" }}
                            onClick={() => handleRemoveImage(index)}
                          >
                            <Delete />
                          </IconButton>
                        }
                        actionPosition="right"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              )}
              <Typography variant="body1">
                Tải lên 2 bức ảnh để bắt đầu. Thêm 4 bức ảnh / video để hồ sơ
                của bạn được nổi bật.
              </Typography>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  borderRadius: "15px",
                  color: "white",
                  bgcolor: "#FDBA13",
                  marginTop: 2,
                }}
              >
                LƯU HỒ SƠ{" "}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </AuthWrapper>
  );
};
export default PetRegistrationForm;
