"use client";
import React, {
  DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES,
} from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

interface BlogCardProps {
  title: string;
  imageSrc: string;
  id: number;
  onClick: (id: any) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  imageSrc,
  onClick,
}) => {
  return (
    <Card
      onClick={() => onClick(id)}
      sx={{
        maxWidth: 345,
        borderRadius: 5,
        boxShadow: 3,
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 6,
        },
        minHeight: 350,
        maxHeight: 350,
      }}
    >
      <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
        <CardMedia
          component="img"
          image={imageSrc}
          alt={title}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 5,
          }}
        />
      </Box>
      <CardContent sx={{ bgcolor: "background.paper", py: 2 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
