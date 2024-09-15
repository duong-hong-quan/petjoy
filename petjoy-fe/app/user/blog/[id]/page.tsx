"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Chip,
  Skeleton,
  CardMedia,
} from "@mui/material";
import Image from "next/image";
import { Blog } from "@/type";
import useCallApi from "@/api/callApi";
import api from "@/api/config";

export default function PageDetail() {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  console.log(params.id);
  const { loading, error, callApi } = useCallApi(api);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      const response = await callApi(`/blog/${params.id}`, "GET");
      if (response.isSuccess) {
        setBlog(response.data);
      }
    };

    if (params.id) {
      fetchBlogDetails();
    }
  }, [params.id]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Skeleton variant="rectangular" width="100%" height={400} />
        <Skeleton variant="text" sx={{ fontSize: "2rem", mt: 2 }} />
        <Skeleton variant="text" sx={{ fontSize: "1rem", mt: 1 }} width="60%" />
        <Skeleton variant="rectangular" sx={{ mt: 2 }} height={200} />
      </Container>
    );
  }

  if (!blog) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4">Blog post not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ position: "relative", width: "100%", height: "400px", mb: 4 }}>
        <CardMedia
          component="img"
          image={blog.blogImg}
          alt={blog.blogName}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 5,
          }}
        />
      </Box>
      <Typography variant="h3" gutterBottom>
        {blog.blogName}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar
          src={blog.user.profilePicture}
          alt={blog.user.name}
          sx={{ mr: 2 }}
        />
        <Typography variant="subtitle1" sx={{ mr: 2 }}>
          {blog.user.name}
        </Typography>
        <Chip label={blog.category.name} color="primary" size="small" />
      </Box>
      <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </Typography>
    </Container>
  );
}
