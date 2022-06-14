import {
  Avatar,
  Box,
  Button,
  chakra,
  CloseButton,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import {
  AiOutlineMenu,
  AiFillHome,
  AiOutlineInbox,
  AiOutlineSearch,
  AiFillBell,
} from "react-icons/ai";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  const mobileNav = useDisclosure();

  // const logout = () => {
  //   window.open("http://localhost:5000/api/auth/logout", "_self");
  // };

  return (
    <chakra.header
      bg="gray.400"
      w="full"
      px={{ base: 2, sm: 4 }}
      py={4}
      shadow="md"
    >
      <Flex alignItems="center" justifyContent="space-between" mx="auto">
        <HStack display="flex" spacing={3} alignItems="center">
          <Box display={{ base: "inline-flex", md: "none" }}>
            <IconButton
              display={{ base: "flex", md: "none" }}
              aria-label="Open menu"
              fontSize="20px"
              color="gray.800"
              variant="ghost"
              icon={<AiOutlineMenu />}
              onClick={mobileNav.onOpen}
            />
            <VStack
              pos="absolute"
              top={0}
              left={0}
              right={0}
              display={mobileNav.isOpen ? "flex" : "none"}
              flexDirection="column"
              p={2}
              pb={4}
              m={2}
              bg="gray.100"
              spacing={3}
              rounded="sm"
              shadow="sm"
            >
              <CloseButton
                aria-label="Close menu"
                justifySelf="self-start"
                onClick={mobileNav.onClose}
              />
              <Button w="full" variant="ghost" leftIcon={<AiFillHome />}>
                Dashboard
              </Button>
              <Button
                w="full"
                variant="solid"
                colorScheme="brand"
                leftIcon={<AiOutlineInbox />}
              >
                Inbox
              </Button>
              <Button
                w="full"
                variant="ghost"
                leftIcon={<BsFillCameraVideoFill />}
              >
                Videos
              </Button>
            </VStack>
          </Box>
          <chakra.a href="/" title="home" display="flex" alignItems="center">
            LOGO
          </chakra.a>

          <HStack spacing={3} display={{ base: "none", md: "inline-flex" }}>
            <Button variant="ghost" leftIcon={<AiFillHome />} size="sm">
              Dashboard
            </Button>
            <Button
              variant="solid"
              colorScheme="brand"
              leftIcon={<AiOutlineInbox />}
              size="sm"
            >
              Inbox
            </Button>
            <Button
              variant="ghost"
              leftIcon={<BsFillCameraVideoFill />}
              size="sm"
            >
              Videos
            </Button>
          </HStack>
        </HStack>
        {user ? (
          <HStack
            spacing={3}
            display={mobileNav.isOpen ? "none" : "flex"}
            alignItems="center"
          >
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <AiOutlineSearch />
              </InputLeftElement>
              <Input type="tel" placeholder="Search..." />
            </InputGroup>

            <chakra.a
              p={3}
              color="gray.800"
              rounded="sm"
              _hover={{ color: "gray.800" }}
            >
              <AiFillBell />
            </chakra.a>

            {/* <Avatar size="sm" name="Dan Abrahmov" src={user.photos[0].value} />
            <chakra.h5 whiteSpace="nowrap">{user.displayName}</chakra.h5> */}
            {/* <Link to="/login">
              <Button variant="ghost" size="sm">
                Logout
              </Button>
            </Link> */}

            <Link to="/chat">
              <Button variant="ghost" size="sm">
                Messenger
              </Button>
            </Link>
          </HStack>
        ) : (
          <HStack
            spacing={3}
            display={mobileNav.isOpen ? "none" : "flex"}
            alignItems="center"
          >
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <AiOutlineSearch />
              </InputLeftElement>
              <Input type="tel" placeholder="Search..." />
            </InputGroup>

            <Link to="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
          </HStack>
        )}
      </Flex>
    </chakra.header>
  );
};

export default Navbar;
