"use client";
import React, { useState, useEffect } from "react";
import { CheckCircleOutline, Close, Favorite } from "@mui/icons-material";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";
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
  Chip,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useSwipeable } from "react-swipeable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Pet } from "@/type";
import useCallApi from "@/api/callApi";
import api from "@/api/config";
import MatchSurprise from "../../components/MatchSurprise";
import { createEntity, getEntity } from "@/api/databaseApi";
import { useRouter } from "next/navigation";
import { Room } from "../../../type";
import { setPet } from "../../redux/features/authSlice";
import Link from "next/link";
import { calculateAge, showError } from "@/utils/utility";
import { toast } from "react-toastify";
const MatchPage = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [swipePosition, setSwipePosition] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const user = useSelector((state: RootState) => state.auth.user || null);
  const [petsLike, setPetsLike] = useState<Pet[]>([]);
  const { callApi, error } = useCallApi(api);
  const [pets, setPets] = useState<Pet[]>([]);
  const [petsOfMe, setPetsOfMe] = useState<Pet[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPet, setSelectedPet] = useState<number>();
  const [open, setOpen] = useState(false);
  const route = useRouter();
  const pet = useSelector((state: RootState) => state.auth.pet || null);
  const dispatch = useDispatch();
  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    const response = await callApi(`/pet/by-user-id/${user?.id}`, "GET");
    if (response.isSuccess) {
      setPetsOfMe(response.data);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      setSwipePosition(eventData.deltaX);
    },
    onSwipedLeft: () => {
      handleSwipe("left");
      handleSwipeApi("left");
    },
    onSwipedRight: () => {
      handleSwipe("right");
      handleSwipeApi("right");
    },
    onSwiped: () => setSwipePosition(0),
    trackMouse: true,
  });

  const handleSwipe = (direction: "left" | "right") => {
    const swipeDistance = direction === "left" ? -300 : 300;
    setSwipePosition(swipeDistance);
    setTimeout(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % pets.length);
      setSwipePosition(0);
    }, 300);
  };

  const handleSwipeApi = async (direction: "left" | "right") => {
    const currentPet = pets[currentCardIndex];
    const isLike = direction === "right";
    const response = await callApi("/like", "POST", {
      originPetId: selectedPet,
      likePetId: currentPet.id,
      isLike,
    });
    if (response.isSuccess) {
      fetchData();
      if (response.message.includes("Matchingggg")) {
        setOpen(true);
        const roomData = (await getEntity("/room")) as Room[];
        if (roomData.length == 0) {
          await createEntity("room", [
            {
              id: response.data.id,
              petOneId: selectedPet,
              petTwoId: currentPet.id,
              createdAt: new Date().toDateString(),
              petOne: response.data.originPet,
              petTwo: response.data.likePet,
            },
          ] as Room[]);
        } else {
          await createEntity("room", [
            ...roomData,
            {
              id: response.data.id,
              petOneId: selectedPet,
              petTwoId: currentPet.id,
              createdAt: new Date().toDateString(),
              petOne: response.data.originPet,
              petTwo: response.data.likePet,
            },
          ] as Room[]);
        }
      }
    } else {
      showError(error);
    }
  };

  const fetchData = async () => {
    const response = await callApi(`/pet/by-user-id/${user?.id}`, "GET");
    if (response.isSuccess) {
      setPetsOfMe(response.data);
    }
    if (selectedPet) {
      const responseLikes = await callApi(
        `pet/get-likes/${selectedPet}`,
        "GET"
      );
      if (responseLikes.isSuccess) {
        setPetsLike(responseLikes.data);
      }
      const availablePet = await callApi(
        `pet/get-available-pet-can-like/${selectedPet}`,
        "GET"
      );
      if (availablePet.data) {
        setPets(availablePet.data);
      }
    }
  };
  useEffect(() => {
    const fetchLikes = async () => {
      const responseLikes = await callApi(
        `pet/get-likes/${selectedPet}`,
        "GET"
      );
      if (responseLikes.isSuccess) {
        setPetsLike(responseLikes.data);
      }
    };

    // Call fetchLikes immediately and then every 5 seconds
    fetchLikes();
    const intervalId = setInterval(fetchLikes, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [selectedPet]);
  useEffect(() => {
    fetchData();
  }, [selectedPet]);

  useEffect(() => {
    if (pet) {
      setSelectedPet(pet.id);
    }
  }, []);

  const currentPet = pets[currentCardIndex];

  return (
    <Container maxWidth="xl" sx={{ mt: 6, p: 2 }}>
      <MatchSurprise open={open} onClose={() => setOpen(!open)} />
      <>
        {selectedPet ? (
          <Box
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            gap={4}
          >
            <Box flex={1} order={isMobile ? 1 : 2} mb={isMobile ? 4 : 0}>
              <Card
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
                {currentPet ? (
                  <>
                    <Box sx={{ position: "relative" }}>
                      <CardMedia
                        component="img"
                        height={isMobile ? "300" : "400"}
                        image={currentPet?.profilePicture}
                        alt={currentPet?.name}
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
                          onClick={async () => {
                            handleSwipe("left");
                            await handleSwipeApi("left");
                          }}
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
                          onClick={async () => {
                            handleSwipe("right");
                            await handleSwipeApi("right");
                          }}
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
                          textAlign: "center",
                        }}
                      >
                        {currentPet?.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        gutterBottom
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        {calculateAge(currentPet?.dob.toString())}
                      </Typography>
                      <Box sx={{ marginTop: 2 }}>
                        <Typography variant="body1" sx={{ marginBottom: 1 }}>
                          <span className="font-bold">Chủng loại:</span>
                          <Chip
                            label={currentPet?.breed.toUpperCase()}
                            color="primary"
                            sx={{ marginLeft: 1 }}
                          />
                        </Typography>

                        <Typography variant="body1" sx={{ marginBottom: 1 }}>
                          <span className="font-bold"> Đang tìm kiếm:</span>
                          <Chip
                            label={currentPet?.isHiringPetType?.name}
                            color="secondary"
                            sx={{ marginLeft: 1 }}
                          />
                        </Typography>

                        <Typography variant="body1" sx={{ marginBottom: 1 }}>
                          <span className="font-bold">Tên sen:</span>
                          <Chip
                            label={currentPet?.owner.name}
                            color="default"
                            sx={{ marginLeft: 1 }}
                          />
                        </Typography>
                      </Box>
                    </CardContent>
                  </>
                ) : (
                  <>
                    {/* Add your fallback UI here */}
                    <Typography
                      sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      Hiện tại không còn bạn nào để bạn quẹt nữa..
                    </Typography>
                  </>
                )}
              </Card>
            </Box>
            <Box
              flex={1}
              order={isMobile ? 2 : 1}
              borderRight={isMobile ? "none" : "1px solid #E0E0E0"}
              pr={isMobile ? 0 : 2}
            >
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Avatar
                  src={user?.profilePicture}
                  sx={{ width: 56, height: 56 }}
                />
                <Typography variant="h5" flex={1} fontWeight="bold">
                  Xin chào {pet?.name}
                </Typography>
                <div className="relative">
                  <IconButton onClick={handleClick}>
                    <ArrowDropDownCircleOutlinedIcon
                      sx={{
                        fontSize: "2.5rem",
                      }}
                    />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    {petsOfMe.length > 0 &&
                      petsOfMe.map((item: Pet) => (
                        <MenuItem
                          key={item.id}
                          onClick={() => {
                            setSelectedPet(item.id);
                            dispatch(setPet(item));
                            handleClose();
                          }}
                        >
                          <Avatar src={item.profilePicture} />
                          <span className="mx-4"> {item.name}</span>
                          {item.id === selectedPet && (
                            <CheckCircleOutline sx={{ color: "green" }} />
                          )}
                        </MenuItem>
                      ))}
                  </Menu>
                </div>
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
                  onClick={() => {
                    route.push("/user/chat");
                  }}
                >
                  Trò chuyện
                </Button>
              </Stack>

              <Box
                display="grid"
                gridTemplateColumns={
                  isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)"
                }
                gap={2}
              >
                {petsLike?.length > 0 &&
                  petsLike.map((pet: Pet) => (
                    <Card
                      key={pet.id}
                      sx={{ position: "relative", transition: "all 0.3s" }}
                    >
                      <CardMedia
                        component="img"
                        height="180"
                        alt={pet.profilePicture}
                        sx={{ objectFit: "cover" }}
                        src={pet.profilePicture}
                        className="blur-md opacity-80"
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
                          {pet.name},{calculateAge(pet.dob?.toString())}
                        </Typography>
                      </Box>
                    </Card>
                  ))}
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "16px",
              maxWidth: "400px",
              margin: "16px auto",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Vui lòng chọn hồ sơ pet
            </Typography>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="select-pet-label">Pet của tôi</InputLabel>
              <Select
                labelId="select-pet-label"
                value={selectedPet}
                onChange={(event) =>
                  setSelectedPet(event.target.value as number)
                }
                label="Pet của tôi"
              >
                {petsOfMe.length > 0 &&
                  petsOfMe.map((item: Pet) => (
                    <MenuItem
                      key={item.id}
                      onClick={() => {
                        setSelectedPet(item.id);
                        handleClose();
                        dispatch(setPet(item));
                      }}
                    >
                      <Avatar src={item.profilePicture} />
                      <span className="mx-4"> {item.name}</span>
                      {item.id === selectedPet && (
                        <CheckCircleOutline sx={{ color: "green" }} />
                      )}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Link
              className="text-blue-700 ml-1 mt-10"
              href={"/user/pet/pet-create"}
            >
              Tạo mới hồ sơ
            </Link>
          </Box>
        )}
      </>
    </Container>
  );
};

export default MatchPage;
