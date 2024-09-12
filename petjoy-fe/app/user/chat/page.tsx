"use client";
import React, { useState, useEffect, useRef } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "@/firebase/firebase";
import { useSelector } from "react-redux";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  CircularProgress,
  Snackbar,
  CardMedia,
  IconButton,
  Stack,
  Avatar,
  Card,
} from "@mui/material";
import {
  Send as SendIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { RootState } from "../../redux/store";
import { createEntity, getEntity } from "@/api/databaseApi";
import { useRouter } from "next/navigation";
import { Message, Room } from "@/type";
import CloseIcon from "@mui/icons-material/Close";
const PetProfileChat = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const route = useRouter();
  const [showSidebar, setShowSidebar] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const messageListRef = useRef<HTMLUListElement>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>();
  const pet = useSelector((state: RootState) => state.auth.pet || null);
  useEffect(() => {
    const roomsRef = ref(database, "room");
    onValue(roomsRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const dataFilter = (data as Room[]).filter(
          (i) => i.petOne.ownerId === user?.id || i.petTwo.ownerId === user?.id
        );
        setRooms(dataFilter);
      }
    });
  }, [user]);
  const handleSelectedRoom = async (room: Room) => {
    setSelectedRoom(room);
    const response = (await getEntity(`chat`)) as Message[];
    debugger;
    if (room !== undefined) {
      const dataFilter = response.filter((i) => i.room === room?.id);
      setMessages(dataFilter);
    } else {
      setMessages([]);
    }
  };

  useEffect(() => {
    if (!userId) return;

    const roomsRef = ref(database, "chat");
    onValue(roomsRef, (snapshot) => {
      const data = snapshot.val() as Message[];
      if (selectedRoom) {
        const dataFilter = data.filter((i) => i.room === selectedRoom?.id);
        setMessages(dataFilter);
      } else {
        setMessages([]);
      }
    });
  }, [userId, selectedRoom?.id]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !userId) return;
    let messages = (await getEntity("chat")) as Message[];
    messages.push({
      text: newMessage.trim(),
      userId,
      timestamp: Date.now(),
      room: selectedRoom?.id,
    } as Message);
    await createEntity("chat", messages);
    setNewMessage("");
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "background.default",
        marginTop: "3rem",
      }}
    >
      <Paper
        sx={{
          width: 300,
          display: "flex",
          flexDirection: "column",
          position: { xs: "absolute", sm: "relative" },
          left: { xs: 0, sm: "auto" },
          top: { xs: 0, sm: "auto" },
          bottom: { xs: 0, sm: "auto" },
          zIndex: { xs: 1, sm: "auto" },
          backgroundColor: "background.paper",
          transform: {
            xs: showSidebar ? "translateX(0)" : "translateX(-100%)",
            sm: "none",
          },
          transition: (theme) =>
            theme.transitions.create("transform", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          maxHeight: "80vh",
          overflowY: "scroll",
          borderRight: "1px solid #ccc",
          boxShadow: "none",
        }}
      >
        <Box sx={{ padding: 2 }}>
          <Stack
            direction="row"
            spacing={2}
            gap={2}
            mb={3}
            alignItems={"center"}
          >
            <Avatar src={user?.profilePicture}></Avatar>
            <Typography
              sx={{
                fontWeight: "bold",
              }}
            >
              {" "}
              Hello {pet?.name}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} mb={3}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#007EFF",
                borderRadius: "20px",
                px: 3,
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#0056b3" },
                textWrap: "nowrap",
              }}
              onClick={() => route.push("/user/match")}
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
                textWrap: "nowrap",
              }}
              onClick={() => {
                route.push("/user/chat");
              }}
            >
              Trò chuyện
            </Button>
          </Stack>
          <hr />
          <List>
            {rooms?.map((room, index) => (
              <ListItem
                key={index}
                onClick={() => {
                  handleSelectedRoom(room);
                  setShowSidebar(false);
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    marginRight: 2,
                  }}
                  image={
                    room.petOne?.ownerId === user?.id
                      ? room.petTwo?.profilePicture
                      : room.petOne?.profilePicture
                  }
                  title={`Profile picture of ${
                    room.petOne?.ownerId === user?.id
                      ? room.petTwo?.name
                      : room.petOne?.name
                  }`}
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  {room.petOne?.ownerId === user?.id
                    ? room.petTwo?.name
                    : room.petOne?.name}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          // position: "relative",
        }}
      >
        <Card
          sx={{
            display: "flex",
            boxShadow: "none",
            borderBottom: "1px solid #ccc",
            padding: "10px",
            alignItems: "center",
          }}
        >
          {!showSidebar && (
            <IconButton onClick={() => setShowSidebar(true)}>
              <ArrowBackIcon />
            </IconButton>
          )}
          {selectedRoom ? (
            <>
              <Box
                sx={{
                  position: "relative",
                  display: "inline-block",
                }}
              >
                <Avatar
                  src={
                    selectedRoom?.petOne?.ownerId === user?.id
                      ? selectedRoom?.petTwo?.profilePicture
                      : selectedRoom?.petOne?.profilePicture
                  }
                  sx={{
                    margin: "0 15px",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 10,
                    width: 22,
                    height: 22,
                    backgroundColor: "green",
                    borderRadius: "50%",
                    border: "2px solid white", // Optional: to add a white border around the green circle
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  }}
                >
                  {selectedRoom?.petOne?.ownerId === user?.id
                    ? selectedRoom?.petTwo?.name
                    : selectedRoom?.petOne?.name}
                </Typography>
                <Typography>Đang hoạt động</Typography>
              </Box>
              <IconButton onClick={() => setSelectedRoom(null)}>
                <CloseIcon />
              </IconButton>
            </>
          ) : (
            <Typography
              sx={{
                marginLeft: "15px",
                fontSize: "1.2rem",
              }}
            >
              No content
            </Typography>
          )}
        </Card>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              maxHeight: "80vh",
              overflowY: "scroll",
              height: "530px",
            }}
            ref={messageListRef}
          >
            <List
              sx={{
                flex: 1,
                overflowY: "auto",
                padding: 2,
              }}
            >
              {messages?.length > 0 &&
                messages?.map((message, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent:
                        Number(message.userId) === userId
                          ? "flex-end"
                          : "flex-start",
                      marginBottom: 1,
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor:
                          Number(message.userId) === userId
                            ? "#007EFF"
                            : "#F1F1F1",
                        color:
                          Number(message.userId) === userId ? "white" : "black",
                        borderRadius: "20px", // Apply border radius here
                        padding: 1,
                        maxWidth: "70%",
                        wordBreak: "break-word",
                      }}
                    >
                      <Typography variant="body1">{message.text}</Typography>
                      <Typography
                        sx={{
                          color:
                            Number(message.userId) === userId
                              ? "white"
                              : "black",
                          fontSize: "0.7rem",
                        }}
                      >
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
            </List>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            padding: 2,
            backgroundColor: "background.paper",
          }}
        >
          <TextField
            sx={{
              flexGrow: 1,
              marginRight: 1,
            }}
            InputProps={{
              style: {
                borderRadius: "20px",
                backgroundColor: "#F1F1F1",
                color: "black",
              },
            }}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            variant="outlined"
            size="small"
            multiline
            maxRows={3}
            placeholder="Nhập tin nhắn..."
          />
          <Button onClick={handleSendMessage} endIcon={<SendIcon />}></Button>
        </Box>
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        message={error}
      />
    </Box>
  );
};

export default PetProfileChat;
