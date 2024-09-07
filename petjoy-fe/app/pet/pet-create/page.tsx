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
interface Image {
  file: File;
  preview: string;
}

export default function PetRegistrationForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [images, setImages] = useState<Image[]>([]);

  const onSubmit = (data: any) => {
    console.log({ ...data, images });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index: number) => {
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

  return (
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
                name="species"
                control={control}
                defaultValue=""
                rules={{ required: "Loài là bắt buộc" }}
                render={({ field }) => (
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      {...field}
                      onClick={() => field.onChange("dog")}
                      variant={field.value === "dog" ? "contained" : "outlined"}
                      startIcon={<Pets />}
                      sx={{ flex: 1, borderRadius: "15px" }}
                    >
                      Chó
                    </Button>
                    <Button
                      {...field}
                      onClick={() => field.onChange("cat")}
                      variant={field.value === "cat" ? "contained" : "outlined"}
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
              name="date"
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
                name="searchType"
                control={control}
                defaultValue=""
                rules={{ required: "Mong muốn tìm kiếm là bắt buộc" }}
                render={({ field }) => (
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      {...field}
                      onClick={() => field.onChange("love")}
                      variant={
                        field.value === "love" ? "contained" : "outlined"
                      }
                      startIcon={<Pets />}
                      sx={{ flex: 1, borderRadius: "15px" }}
                    >
                      Bạn đời
                    </Button>
                    <Button
                      {...field}
                      onClick={() => field.onChange("friend")}
                      variant={
                        field.value === "friend" ? "contained" : "outlined"
                      }
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
                name="visibility"
                control={control}
                defaultValue=""
                rules={{ required: "Hiển thị là bắt buộc" }}
                render={({ field }) => (
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      {...field}
                      onClick={() => field.onChange("dog")}
                      variant={field.value === "dog" ? "contained" : "outlined"}
                      sx={{ flex: 1, borderRadius: "15px" }}
                    >
                      Chó
                    </Button>
                    <Button
                      {...field}
                      onClick={() => field.onChange("cat")}
                      variant={field.value === "cat" ? "contained" : "outlined"}
                      sx={{ flex: 1, borderRadius: "15px" }}
                    >
                      mèo
                    </Button>
                  </Box>
                )}
              />
            </FormControl>

            <Controller
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
            />
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
              Tải lên 2 bức ảnh để bắt đầu. Thêm 4 bức ảnh / video để hồ sơ của
              bạn được nổi bật.
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
  );
}
