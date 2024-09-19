"use client";
import React from "react";
import { Box, Grid, Typography, Container, Fade } from "@mui/material";
import BlogCard from "./BlogCard";
import { Blog, Category } from "@/type";
import { useRouter } from "next/navigation";

const Blogs: React.FC<Category> = ({ name, id, blogs }) => {
  const route = useRouter();
  const onClick = (id: number) => {
    route.push(`/user/blog/${id}`);
  };
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Fade in={true} timeout={1000}>
        <Box>
          <Typography
            variant="h4"
            sx={{
              backgroundColor: "#0080ff",
              color: "white",
              padding: "1rem 2rem",
              fontWeight: "bold",
              width: "fit-content",
              marginBottom: "2rem",
              borderRadius: "0 20px 20px 0",

              boxShadow: 3,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-20px",
                width: "20px",
                height: "100%",
                backgroundColor: "#0080ff",
              },
              fontSize: "1.4rem",
              textWrap: "nowrap",
            }}
          >
            {name}
          </Typography>
        </Box>
      </Fade>

      {blogs.length > 0 ? (
        <Grid container spacing={3}>
          {blogs.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Fade
                in={true}
                timeout={1000}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Box>
                  <BlogCard
                    id={item.id}
                    title={item.blogName}
                    imageSrc={item.blogImg}
                    onClick={onClick}
                  />
                </Box>
              </Fade>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No content available for this category.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Blogs;
