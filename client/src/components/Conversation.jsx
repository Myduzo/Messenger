import React, { useState, useEffect } from "react";
import { Avatar, Box, Button, chakra, Flex, Icon } from "@chakra-ui/react";
import axios from "axios";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("/users/find/" + friendId);
        setUser(res.data.username);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  // console.log(user);

  return (
    <Flex alignItems="center" mt={1}>
      <Avatar
        boxSize={12}
        bg="gray.100"
        _dark={{
          bg: "gray.800",
        }}
        icon={
          <Icon
            as="https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png"
            boxSize={9}
            mt={3}
            rounded="full"
            color="gray.300"
            _dark={{
              color: "gray.700",
            }}
          />
        }
      />
      <Button
        type="button"
        ml={5}
        variant="outline"
        size="sm"
        fontWeight="medium"
        _focus={{
          shadow: "none",
        }}
      >
        {user}
      </Button>
    </Flex>
  );
};

export default Conversation;
