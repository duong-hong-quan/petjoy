"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  ref,
  query,
  orderByChild,
  limitToLast,
  onValue,
  push,
} from "firebase/database";
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
  Container,
} from "@mui/material";
import {
  Send as SendIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { RootState } from "../redux/store";
import { createEntity, filterData, getEntity } from "@/api/databaseApi";

const PetProfileChat = () => {
  const petData = {
    id: 12,
    name: "Soju",
    dob: "2024-06-04T17:00:00.000Z",
    breed: "poodle",
    profilePicture:
      "https://firebasestorage.googleapis.com/v0/b/petjoy-31ffe.appspot.com/o/images%2FScreenshot%202024-09-09%20at%2012.38.50.png?alt=media&token=c1c4b719-5410-47c0-8ddc-61a432647a53",
    petType: {
      id: 1,
      name: "Chó",
    },
  };
  const user = useSelector((state: RootState) => state.auth.user);

  const [showSidebar, setShowSidebar] = useState(true);
  const [messages, setMessages] = useState<
    { text: string; userId: string; timestamp: number }[]
  >([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const messageListRef = useRef<HTMLUListElement>(null);
  const [rooms, setRooms] = useState<any[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<null>(null);
  console.log(rooms);
  useEffect(() => {
    const roomsRef = ref(database, "room");
    onValue(roomsRef, (snapshot) => {
      const data = snapshot.val();
      console.log("data", data);

      if (data) {
        const dataFilter = (data as any[]).filter(
          (i) => i.petOne.ownerId === user?.id || i.petTwo.ownerId === user?.id
        );
        console.log("dataFilter", dataFilter);
        setRooms(data);
      }
    });
  }, [user]);
  useEffect(() => {
    if (!userId || !petData.id) return;

    const roomsRef = ref(database, "chat");
    onValue(roomsRef, (snapshot) => {
      const data = snapshot.val();
      // const roomsList = data ? Object.values(data) : [];
      // const dataFilter = filterData(roomsList, "petOneId", 5);
      // setRooms(data);
      console.log("data", data);

      // const dataFilter = data.filter((i)=> i.)
      setMessages(data);
    });
  }, [userId, petData.id]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !userId) return;
    if (messages && messages.length > 0) {
      await createEntity(`chat`, [
        ...messages,
        {
          text: newMessage.trim(),
          userId,
          timestamp: Date.now(),
          room: selectedRoom,
        },
      ]);
    } else {
      await createEntity(`chat`, [
        {
          text: newMessage.trim(),
          userId,
          timestamp: Date.now(),
          room: selectedRoom,
        },
      ]);
    }

    setNewMessage("");
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  if (!petData) {
    return <Typography>No pet data available.</Typography>;
  }
  return (
    <Box
      sx={{
        display: "flex",
        height: "100dvh",
        backgroundColor: "background.default",
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
        }}
      >
        <Box sx={{ padding: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Danh sách
          </Typography>
          <List>
            {rooms?.map((room, index) => (
              <ListItem
                key={index}
                onClick={() => {
                  setSelectedRoom(room.id);
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
          position: "relative",
          maxHeight: "80vh",
          overflowY: "scroll",
        }}
      >
        {!showSidebar && (
          <IconButton
            sx={{ position: "absolute", top: 1, left: 1, zIndex: 2 }}
            onClick={() => setShowSidebar(true)}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
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
          <List
            sx={{
              flex: 1,
              overflowY: "auto",
              padding: 2,
            }}
            ref={messageListRef}
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
                          ? "primary.main"
                          : "grey.300",
                      color:
                        Number(message.userId) === userId
                          ? "primary.contrastText"
                          : "text.primary",
                      borderRadius: 1,
                      padding: 1,
                      maxWidth: "70%",
                      wordBreak: "break-word",
                    }}
                  >
                    <Typography variant="body1">{message.text}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
          </List>
        )}
        <Box
          sx={{
            display: "flex",
            padding: 2,
            borderTop: 1,
            borderColor: "divider",
            backgroundColor: "background.paper",
          }}
        >
          <TextField
            sx={{ flexGrow: 1, marginRight: 1 }}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message"
            variant="outlined"
            size="small"
            multiline
            maxRows={3}
          />
          <Button
            onClick={handleSendMessage}
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
          >
            Send
          </Button>
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
