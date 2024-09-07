"use client";
"use client";
import React, { useState, useRef } from "react";
import { AddCircleOutlineOutlined, Close, Favorite } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  Typography,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useSwipeable } from "react-swipeable";
import dogcat from "../../assets/img/dogcat.png";

const userCards = [
  {
    id: 1,
    name: "Mon",
    age: 23,
    image: dogcat.src,
    description: "Love traveling and trying new foods!",
  },
  {
    id: 2,
    name: "Alex",
    age: 25,
    image: dogcat.src,
    description: "Passionate about photography and nature.",
  },
  {
    id: 3,
    name: "Sam",
    age: 28,
    image: dogcat.src,
    description: "Fitness enthusiast and book lover.",
  },
  {
    id: 4,
    name: "Jordan",
    age: 22,
    image: dogcat.src,
    description: "Music is my life. Always up for a concert!",
  },
  {
    id: 5,
    name: "Taylor",
    age: 26,
    image: dogcat.src,
    description: "Tech geek and coffee addict.",
  },
  {
    id: 6,
    name: "Casey",
    age: 24,
    image: dogcat.src,
    description: "Adventure seeker and adrenaline junkie.",
  },
];

export default function MatchPage() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [swipePosition, setSwipePosition] = useState(0);
  const cardRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const nextCardIndex = (currentCardIndex + 1) % userCards.length;

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      setSwipePosition(eventData.deltaX);
    },
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    onSwiped: () => setSwipePosition(0),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleSwipe = (direction) => {
    const swipeDistance = direction === "left" ? -300 : 300;
    setSwipePosition(swipeDistance);
    setTimeout(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % userCards.length);
      setSwipePosition(0);
    }, 300);
  };

  const currentUser = userCards[currentCardIndex];

  const swipePercentage =
    (Math.abs(swipePosition) / cardRef.current?.offsetWidth) * 100 || 0;

  return (
    <Container maxWidth="xl" sx={{ mt: 6, p: 2 }}>
      <Box display="flex" flexDirection={isMobile ? "column" : "row"} gap={4}>
        {/* Swipeable user card */}
        <Box flex={1} order={isMobile ? 1 : 2} mb={isMobile ? 4 : 0}>
          <Card
            ref={cardRef}
            sx={{
              height: "100%",
              overflow: "hidden",
              transform: `translateX(${swipePosition}px) rotate(${
                swipePosition * 0.03
              }deg)`,
              transition: "transform 0.3s ease-out",
              userSelect: "none",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
            }}
            {...handlers}
          >
            <Box sx={{ position: "relative" }}>
              <CardMedia
                component="img"
                height={isMobile ? "300" : "400"}
                image={currentUser.image}
                alt={currentUser.name}
                sx={{
                  objectFit: "cover",
                  pointerEvents: "none",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 20,
                  left: 0,
                  right: 0,
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <IconButton
                  onClick={() => handleSwipe("left")}
                  sx={{
                    backgroundColor: "white",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                    border: "1px solid #E0E0E0",
                  }}
                  size="large"
                >
                  <Close
                    sx={{
                      color: "red",
                      fontSize: "3rem",
                      fontWeight: "bold",
                    }}
                  />
                </IconButton>
                <IconButton
                  onClick={() => handleSwipe("right")}
                  sx={{
                    backgroundColor: "white",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                    border: "1px solid #E0E0E0",
                  }}
                  size="large"
                >
                  <Favorite
                    sx={{
                      color: "#007EFF",
                      fontSize: "3rem",
                      fontWeight: "bold",
                    }}
                  />
                </IconButton>
              </Box>
            </Box>
            <CardContent>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                }}
              >
                {currentUser.name}, {currentUser.age}
              </Typography>
              <Typography variant="body1" paragraph>
                {currentUser.description}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* User cards grid */}
        <Box
          flex={1}
          order={isMobile ? 2 : 1}
          borderRight={isMobile ? "none" : "1px solid #E0E0E0"}
          pr={isMobile ? 0 : 2}
        >
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Avatar src={dogcat.src} sx={{ width: 56, height: 56 }} />
            <Typography variant="h5" flex={1} fontWeight="bold">
              Xin chào Quân
            </Typography>
            <IconButton>
              <AddCircleOutlineOutlined
                sx={{
                  color: "black",
                  fontSize: "2.5rem",
                }}
              />
            </IconButton>
          </Box>

          <Stack direction="row" spacing={2} mb={3}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#007EFF",
                borderRadius: "20px",
                px: 3,
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#0056b3" },
              }}
            >
              Lượt thích
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderRadius: "20px",
                px: 3,
                color: "black",
                borderColor: "black",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
            >
              Trò chuyện
            </Button>
          </Stack>

          <Box
            display="grid"
            gridTemplateColumns={isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)"}
            gap={2}
          >
            {userCards.map((user) => (
              <Card
                key={user.id}
                sx={{ position: "relative", transition: "all 0.3s" }}
              >
                <CardMedia
                  component="img"
                  height="120"
                  image={user.image}
                  alt={user.name}
                  sx={{ objectFit: "cover" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
                    color: "white",
                    padding: "8px",
                  }}
                >
                  <Typography variant="subtitle2">
                    {user.name}, {user.age}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
