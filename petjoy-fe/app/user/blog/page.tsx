"use client";
import useCallApi from "@/api/callApi";
import api from "@/api/config";
import Blogs from "@/app/components/Blogs";
import { Category } from "@/type";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Grid,
  Container,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function Blog() {
  const { loading, error, callApi } = useCallApi(api);
  const [blogs, setBlogs] = useState<Category[]>();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchData = async () => {
    const data = await callApi("/blog", "GET");
    if (data.isSuccess) {
      setBlogs(data.data);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      fetchData();
    } else {
      const filteredBlogs = blogs?.filter((category) =>
        category.blogs.filter((blog) =>
          blog.blogName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      console.log(searchQuery);
      console.log(filteredBlogs);
      setBlogs(filteredBlogs);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ display: "flex", marginBottom: "1rem" }}>
        <TextField
          fullWidth
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm kiếm nội dung..."
          sx={{
            marginRight: "0.5rem",
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              "& fieldset": {
                borderColor: "#0080ff",
              },
              "&:hover fieldset": {
                borderColor: "#0080ff",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#0080ff",
              },
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#0080ff",
              opacity: 0.7,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <Button
          onClick={handleSearch}
          sx={{
            width: "120px",
            borderRadius: "20px",
            backgroundColor: "#FDBA13",
            color: "white",
          }}
        >
          Tìm
        </Button>
      </Box>
      <Grid container spacing={2}>
        {blogs?.map((item, index) => (
          <Grid item xs={12} key={index}>
            <Blogs blogs={item.blogs} id={item.id} name={item.name} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Blog;
