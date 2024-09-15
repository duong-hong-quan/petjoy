"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CardMedia,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { Blog, Category } from "@/type";
import useCallApi from "@/api/callApi";
import api from "@/api/config";
import dynamic from "next/dynamic";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { toast } from "react-toastify";

const AdminBlogsPage: React.FC = () => {
  const { callApi, loading } = useCallApi(api);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [dialogAction, setDialogAction] = useState<
    "view" | "edit" | "delete" | "add"
  >("view");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    const fetchData = async () => {
      const blogsResponse = await callApi("/blog/all", "GET");
      if (blogsResponse.isSuccess) {
        setBlogs(blogsResponse.data);
      }

      const categoriesResponse = await callApi("/category", "GET");
      if (categoriesResponse.isSuccess) {
        setCategories(categoriesResponse.data);
      }
    };
    fetchData();
  }, []);

  const handleOpenDialog = (
    action: "view" | "edit" | "delete" | "add",
    blog?: Blog
  ) => {
    setDialogAction(action);
    setSelectedBlog(
      blog ||
        ({
          id: 0,
          blogName: "",
          blogImg: "",
          content: "",
          userId: 0,
          categoryId: 0,
        } as Blog)
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBlog(null);
    setImageFile(null);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleImageDelete = async () => {
    if (selectedBlog && selectedBlog.blogImg) {
      const storage = getStorage();
      const imageRef = ref(storage, selectedBlog.blogImg);
      try {
        await deleteObject(imageRef);
        setSelectedBlog({ ...selectedBlog, blogImg: "" });
      } catch (error) {
        console.error("Error deleting image from Firebase:", error);
      }
    }
  };

  const uploadImageToFirebase = async (file: File): Promise<string> => {
    const storage = getStorage();
    const imageRef = ref(storage, `blog-images/${uuidv4()}`);
    await uploadBytes(imageRef, file);
    return getDownloadURL(imageRef);
  };

  const handleSave = async (blog: Blog) => {
    let updatedBlog = { ...blog };
    if (imageFile) {
      const imageUrl = await uploadImageToFirebase(imageFile);
      updatedBlog.blogImg = imageUrl;
    }

    if (blog.id) {
      const data = await callApi(`/blog`, "PUT", {
        ...updatedBlog,
        userId: user?.id,
      });
      if (data.isSuccess) {
        toast.success("Cập nhật thành công");
      } else {
        toast.error("Cập nhật thất bại");
      }
    } else {
      const data = await callApi("/blog", "POST", {
        ...updatedBlog,
        userId: user?.id,
      });
      if (data.isSuccess) {
        toast.success("Cập nhật thành công");
      } else {
        toast.error("Cập nhật thất bại");
      }
    }
    const response = await callApi("/blog/all", "GET");
    if (response.isSuccess) {
      setBlogs(response.data);
      handleCloseDialog();
    }
  };

  const handleDelete = async (id: number) => {
    await callApi(`/blog/${id}`, "DELETE");
    const response = await callApi("/blog/all", "GET");
    if (response.isSuccess) {
      setBlogs(response.data);
      handleCloseDialog();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
        <Typography
          sx={{
            textAlign: "center",
            color: "#007EFF",
            fontWeight: "bold",
            marginBottom: 4,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
          variant="h4"
          gutterBottom
        >
          Quản lý Blog
        </Typography>
      </Box>
      <Box display="flex" justifyContent="end" alignItems="center" mb={2}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#007EFF", color: "white" }}
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog("add")}
        >
          Thêm Blog Mới
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          overflowX: "auto",
          borderRadius: "16px", // Apply border radius to the container
        }}
      >
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
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  color: "white",
                }}
              >
                ID
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  color: "white",
                }}
              >
                Tên Blog
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  color: "white",
                }}
              >
                ID Người Dùng
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  color: "white",
                }}
              >
                Phân Loại
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  color: "white",
                }}
              >
                Hành Động
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>{blog.id}</TableCell>
                <TableCell>{blog.blogName}</TableCell>
                <TableCell>{blog.user.name}</TableCell>
                <TableCell>{blog.category.name}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog("view", blog)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDialog("edit", blog)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDialog("delete", blog)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {dialogAction === "view" && "Xem Blog"}
          {dialogAction === "edit" && "Chỉnh Sửa Blog"}
          {dialogAction === "delete" && "Xóa Blog"}
          {dialogAction === "add" && "Thêm Blog Mới"}
        </DialogTitle>
        <DialogContent>
          {dialogAction === "delete" ? (
            <DialogContentText>
              Bạn có chắc chắn muốn xóa blog này không?
            </DialogContentText>
          ) : (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Tên Blog"
                type="text"
                fullWidth
                value={selectedBlog?.blogName || ""}
                onChange={(e) =>
                  setSelectedBlog((prev) => ({
                    ...prev!,
                    blogName: e.target.value,
                  }))
                }
                disabled={dialogAction === "view"}
              />
              <Box mt={2} mb={2}>
                <Typography variant="subtitle1" gutterBottom>
                  Hình Ảnh Blog
                </Typography>
                {selectedBlog?.blogImg && (
                  <Box mb={2}>
                    <CardMedia
                      component="img"
                      image={selectedBlog.blogImg}
                      sx={{ objectFit: "cover" }}
                    />
                    {dialogAction !== "view" && (
                      <Button onClick={handleImageDelete} color="error">
                        Xóa Hình Ảnh
                      </Button>
                    )}
                  </Box>
                )}
                {dialogAction !== "view" && (
                  <input
                    accept="image/*"
                    type="file"
                    onChange={handleImageChange}
                  />
                )}
              </Box>
              <Box mt={2} mb={2}>
                <Typography variant="subtitle1" gutterBottom>
                  Nội Dung
                </Typography>
                <ReactQuill
                  theme="snow"
                  value={selectedBlog?.content || ""}
                  onChange={(content) =>
                    setSelectedBlog((prev) => ({
                      ...prev!,
                      content: content,
                    }))
                  }
                  readOnly={dialogAction === "view"}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, false] }],
                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                      ],
                      ["link", "image"],
                      ["clean"],
                    ],
                  }}
                />
              </Box>

              <FormControl fullWidth margin="dense">
                <InputLabel>Phân loại</InputLabel>
                <Select
                  value={selectedBlog?.categoryId || ""}
                  onChange={(e) =>
                    setSelectedBlog((prev) => ({
                      ...prev!,
                      categoryId: Number(e.target.value),
                    }))
                  }
                  disabled={dialogAction === "view"}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          {dialogAction === "delete" && (
            <Button
              onClick={() => handleDelete(selectedBlog!.id)}
              color="error"
            >
              Xóa
            </Button>
          )}
          {(dialogAction === "edit" || dialogAction === "add") && (
            <Button onClick={() => handleSave(selectedBlog!)}>Lưu</Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminBlogsPage;
