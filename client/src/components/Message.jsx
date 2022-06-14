import { Box, chakra, Flex } from "@chakra-ui/react";
import React from "react";
import { format } from "timeago.js";

const Message = ({ message, own }) => {
  return (
    <Box>
      <chakra.p>{message.text}</chakra.p>
      <Flex justifyContent="end">
        <chakra.span>{format(message.createdAt)}</chakra.span>
      </Flex>
    </Box>
  );
};

export default Message;
