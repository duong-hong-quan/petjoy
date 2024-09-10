"use client";
import React, { useState, useEffect } from "react";
import {
  ref,
  query,
  orderByChild,
  equalTo,
  onValue,
  push,
} from "firebase/database";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { database } from "@/firebase/firebase";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    height: "100vh",
    maxWidth: "1000px",
    margin: "0 auto",
    border: "1px solid #ccc",
    borderRadius: "8px",
    overflow: "hidden",
  },
  sidebar: {
    width: "250px",
    borderRight: "1px solid #ccc",
    padding: "16px",
    backgroundColor: "#f0f0f0",
  },
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  messagesList: {
    flex: 1,
    overflowY: "auto",
    padding: "16px",
    backgroundColor: "#f0f0f0",
  },
  messageItem: {
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  inputContainer: {
    display: "flex",
    padding: "16px",
    borderTop: "1px solid #ccc",
    backgroundColor: "#fff",
  },
  inputField: {
    flex: 1,
    marginRight: "8px",
  },
});

interface Message {
  text: string;
  userId: string;
  timestamp: number;
}

interface User {
  id: string;
  name: string;
}

const Chat = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  useEffect(() => {
    if (!userId) {
      console.error("userId is undefined");
      return;
    }

    const messagesRef = ref(database, "messages");
    const userMessagesQuery = query(
      messagesRef,
      orderByChild("userId"),
      equalTo(userId)
    );

    onValue(userMessagesQuery, (snapshot) => {
      const data = snapshot.val();
      const messagesList: Message[] = data ? Object.values(data) : [];
      setMessages(messagesList);
    });

    const usersRef = ref(database, "users");
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const usersList: User[] = data ? Object.values(data) : [];
      setUsers(usersList);
    });
  }, [userId]);

  const handleSendMessage = () => {
    if (!newMessage || !userId) {
      console.error("Message text or user ID is undefined");
      return;
    }

    const messagesRef = ref(database, "messages");
    push(messagesRef, { text: newMessage, userId, timestamp: Date.now() });
    setNewMessage("");
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.sidebar}>
        <Typography variant="h6">Users</Typography>
        <List>
          {users.map((user) => (
            <ListItem key={user.id}>
              <ListItemText primary={user.name} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box className={classes.chatContainer}>
        <List className={classes.messagesList}>
          {messages?.map((message, index) => (
            <ListItem key={index} className={classes.messageItem}>
              <ListItemText primary={message.text} />
            </ListItem>
          ))}
        </List>
        <Box className={classes.inputContainer}>
          <TextField
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
            fullWidth
            className={classes.inputField}
          />
          <Button
            onClick={handleSendMessage}
            variant="contained"
            color="primary"
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
