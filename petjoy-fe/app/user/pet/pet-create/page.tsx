"use client";
import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { Pet } from "@/type";
import { set } from "firebase/database";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

interface Image {
  file: File;
  preview: string;
  url?: string;
}

const PetRegistrationForm = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  console.log(id);
  const [initialData, setInitialData] = useState<Pet | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialData || {},
  });
  const { error, loading, callApi } = useCallApi(api);
  const [images, setImages] = useState<Image[]>([]);
  const user = useSelector((state: RootState) => state.auth.user || null);

  useEffect(() => {
    if (id) {
      const fetchPet = async () => {
        const response = await callApi(`pet/${id}`, "GET");
        if (response.isSuccess) {
          const pet = response.data as Pet;
          setInitialData(pet);
          reset(pet); // Reset form with fetched data
          setImages([
            {
              file: new File([], ""),
              preview: pet.profilePicture,
              url: pet.profilePicture,
            },
          ]);
        }
      };
      fetchPet();
    }
  }, [id, reset]);

  const onSubmit = async (data: any) => {
    if (!id) {
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
            profilePicture: uploadedImages[0] || "",
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
    } else {
      const uploadedImages = await Promise.all(
        images.map(async (image) => {
          const storageRef = ref(storage, `images/${image.file.name}`);
          await uploadBytes(storageRef, image.file);
          const url = await getDownloadURL(storageRef);
          return url;
        })
      );
      if (user) {
        const response = await callApi(`pet/${id}`, "PUT", {
          name: data.name,
          dob: data.dob,
          breed: data.breed,
          profilePicture: uploadedImages[0] || "",
          ownerId: user.id,
          petTypeId: Number(data.petTypeId),
          isHiringPetTypeId: Number(data.isHiringPetTypeId),
          filterPetTypeId: Number(data.filterPetTypeId),
        });
        if (response.isSuccess) {
          toast.success("Hồ sơ thú cưng đã được lưu");
        }
      }
    }
  };
  console.log(images);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = async (index: number) => {
    debugger;
    const imageToRemove = images[index];
    if (imageToRemove.url) {
      try {
        const storageRef = ref(storage, imageToRemove.url);
        const response = await deleteObject(storageRef);
      } catch (e) {
        console.log(e);
      }
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
  console.log(dayjs.utc(initialData?.dob).format("YYYY-MM-DD"));
  return loading ? (
    <LoadingOverlay loading />
  ) : (
    <AuthWrapper>
      <Box
        sx={{
          padding: 24,
          borderRadius: "20px",
          marginTop: "50px",
          border: "1px solid #ccc",
        }}
      >
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
          {id ? "Chỉnh sửa" : "Tạo"} hồ sơ thú cưng
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Controller
                name="name"
                control={control}
                defaultValue={initialData?.name || ""}
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
                  defaultValue={initialData?.petTypeId || ""}
                  rules={{ required: "Loài là bắt buộc" }}
                  render={({ field }) => (
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button
                        {...field}
                        onClick={() => field.onChange("1")}
                        variant={field.value == "1" ? "contained" : "outlined"}
                        startIcon={<Pets />}
                        sx={{ flex: 1, borderRadius: "15px" }}
                      >
                        Chó
                      </Button>
                      <Button
                        {...field}
                        onClick={() => field.onChange("2")}
                        variant={field.value == "2" ? "contained" : "outlined"}
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
                name="breed"
                control={control}
                defaultValue={initialData?.breed || ""}
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

              <Controller
                name="dob"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Ngày sinh"
                    type="date"
                    value={
                      field.value
                        ? dayjs.utc(field.value).format("YYYY-MM-DD")
                        : ""
                    }
                    fullWidth
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <DateRange />
                          </InputAdornment>
                        ),
                      },
                    }}
                    sx={{ ...roundedStyle, marginBottom: 2 }}
                    onChange={(e) =>
                      field.onChange(dayjs(e.target.value).format("YYYY-MM-DD"))
                    }
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
                  defaultValue={initialData?.isHiringPetTypeId || ""}
                  rules={{ required: "Mong muốn tìm kiếm là bắt buộc" }}
                  render={({ field }) => (
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button
                        {...field}
                        onClick={() => field.onChange("1")}
                        variant={field.value == "1" ? "contained" : "outlined"}
                        startIcon={<Pets />}
                        sx={{ flex: 1, borderRadius: "15px" }}
                      >
                        Bạn đời
                      </Button>
                      <Button
                        {...field}
                        onClick={() => field.onChange("2")}
                        variant={field.value == "2" ? "contained" : "outlined"}
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
                  defaultValue={initialData?.filterPetTypeId || ""}
                  rules={{ required: "Hiển thị là bắt buộc" }}
                  render={({ field }) => (
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button
                        {...field}
                        onClick={() => field.onChange("1")}
                        variant={field.value == "1" ? "contained" : "outlined"}
                        sx={{ flex: 1, borderRadius: "15px" }}
                      >
                        Chó
                      </Button>
                      <Button
                        {...field}
                        onClick={() => field.onChange("2")}
                        variant={field.value == "2" ? "contained" : "outlined"}
                        sx={{ flex: 1, borderRadius: "15px" }}
                      >
                        mèo
                      </Button>
                    </Box>
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <FormLabel sx={labelStyle}>
                  Tải hình thú cưng của bạn lên
                </FormLabel>
                <Input
                  type="file"
                  onChange={handleImageChange}
                  disableUnderline
                  fullWidth
                  inputProps={{ multiple: true }}
                  sx={{
                    display: "none",
                  }}
                  id="upload-button"
                />
                <label htmlFor="upload-button">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUpload />}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: "#007EFF",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "#005BB5",
                      },
                    }}
                  >
                    Tải ảnh lên
                  </Button>
                </label>
              </FormControl>
              <Typography variant="h6">Tải ảnh để bắt đầu</Typography>

              {images.length > 0 && (
                <Box sx={{ marginTop: 2 }}>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(150px, 1fr))",
                      gap: 2,
                    }}
                  >
                    {images.map((image, index) => (
                      <Box
                        key={index}
                        sx={{
                          position: "relative",
                          borderRadius: 2,
                          overflow: "hidden",
                          boxShadow: 3,
                        }}
                      >
                        <img
                          src={image.preview}
                          alt={`Preview ${index + 1}`}
                          loading="lazy"
                          style={{
                            width: "100%",
                            height: "150px",
                            objectFit: "cover",
                          }}
                        />
                        <Box
                          sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            background: "rgba(0, 0, 0, 0.5)",
                            borderRadius: "0 0 0 8px",
                          }}
                        >
                          <IconButton
                            sx={{ color: "white" }}
                            onClick={() => handleRemoveImage(index)}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}

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
                {id ? "LƯU THAY ĐỔI" : "LƯU"} HỒ SƠ
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </AuthWrapper>
  );
};
export default PetRegistrationForm;
