import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Conversation from "../components/Conversation";
import {
  Box,
  Button,
  GridItem,
  SimpleGrid,
  Stack,
  chakra,
  Textarea,
} from "@chakra-ui/react";
import Message from "../components/Message";
import { io } from "socket.io-client";

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  // const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      // console.log(users);
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      bg="#edf3f8"
      _dark={{
        bg: "#111",
      }}
      p={10}
    >
      <Box>
        <SimpleGrid
          display={{
            base: "initial",
            md: "grid",
          }}
          columns={{
            md: 3,
          }}
          spacing={{
            md: 6,
          }}
        >
          <GridItem
            mt={[5, null, 0]}
            colSpan={{
              md: 1,
            }}
          >
            <Stack
              px={4}
              py={5}
              bg="white"
              _dark={{
                bg: "#141517",
              }}
              spacing={6}
              p={{
                sm: 6,
              }}
            >
              <Box
                fontSize="sm"
                fontWeight="md"
                color="gray.700"
                _dark={{
                  color: "gray.50",
                }}
              >
                Conversations
              </Box>
              <Box>
                {conversations.map((c) => (
                  <Box onClick={() => setCurrentChat(c)}>
                    <Conversation conversation={c} currentUser={user} />
                  </Box>
                ))}
              </Box>
            </Stack>
          </GridItem>

          <GridItem
            colSpan={{
              md: 2,
            }}
          >
            <Stack
              px={4}
              py={5}
              bg="white"
              _dark={{
                bg: "#141517",
              }}
              spacing={6}
              p={{
                sm: 6,
              }}
            >
              <Box
                fontSize="sm"
                fontWeight="md"
                color="gray.700"
                _dark={{
                  color: "gray.50",
                }}
              >
                Messages
              </Box>
              <Box>
                {currentChat ? (
                  <>
                    <Box>
                      {messages.map((m) => (
                        <Box>
                          <Message message={m} own={m.sender === user._id} />
                        </Box>
                      ))}
                    </Box>
                    <Box paddingTop={5}>
                      <Textarea
                        placeholder="write something..."
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                      />
                      <Button colorScheme="blue" onClick={handleSubmit}>
                        Send
                      </Button>
                    </Box>
                  </>
                ) : (
                  <chakra.span>Open a conversation to start a chat</chakra.span>
                )}
              </Box>
            </Stack>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Box>

    // <div>
    //   {conversations.map((c) => (
    //     <Box onClick={() => setCurrentChat(c)}>
    //       <Conversation conversation={c} currentUser={user} />
    //       {/* {currentChat ?
    //   <>
    //   {messages.map((m) => (
    //     <Box>
    //       <Message message={m} own={m.sender === user._id} />
    //     </Box>
    //   ))}
    //   </> : <chakra.span>Open a conversation to start a chat</chakra.span>
    // } */}
    //       <Box>
    //         <Message />
    //       </Box>
    //     </Box>
    //   ))}
    //   <Box></Box>
    // </div>
  );
};

export default Chat;
