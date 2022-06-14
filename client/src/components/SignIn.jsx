import {
  Flex,
  chakra,
  SimpleGrid,
  Grid,
  Input,
  Button,
  GridItem,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import React, { useContext, useRef, useState } from "react";
// import axios from "axios";
import { loginCall } from "../apiCalls";
import { AuthContext } from "../context/AuthContext";

const SignIn = () => {
  const username = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  // const [user, setUser] = useState(null);
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState(false);
  // const [success, setSuccess] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post("/login", { username, password });
  //     setUser(res.data);
  //     console.log(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { username: username.current.value, password: password.current.value },
      dispatch
    );
  };

  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const facebook = () => {
    window.open("http://localhost:5000/auth/facebook", "_self");
  };

  return (
    <Flex
      bg="#F9FAFB"
      p={20}
      w="auto"
      justifyContent="center"
      alignItems="center"
    >
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={20}
        px={{ base: 4, lg: 16, xl: 24 }}
        py={20}
        mx="auto"
        bg="white"
        shadow="xl"
      >
        <Grid gap={5}>
          <Flex
            maxW="md"
            mx="auto"
            bg="#DB4437"
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            w="270px"
            h="70px"
            onClick={google}
          >
            <Flex
              w={1 / 3}
              justifyContent="center"
              alignItems="center"
              color="white"
            >
              <i className="fa-brands fa-google-plus-g" fontSize="30px"></i>
            </Flex>

            <Flex
              w={2 / 3}
              p={{ base: 4, md: 4 }}
              justifyContent="center"
              alignItems="center"
            >
              <chakra.h1 fontSize="xl" fontWeight="bold" color="white">
                Google
              </chakra.h1>
            </Flex>
          </Flex>

          <Flex
            maxW="md"
            mx="auto"
            bg="#4267B2"
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            w="270px"
            h="70px"
            onClick={facebook}
          >
            <Flex
              w={1 / 3}
              justifyContent="center"
              alignItems="center"
              color="white"
            >
              <i className="fa-brands fa-facebook-f" fontSize="30px"></i>
            </Flex>

            <Flex
              w={2 / 3}
              p={{ base: 4, md: 4 }}
              justifyContent="center"
              alignItems="center"
            >
              <chakra.h1 fontSize="xl" fontWeight="bold" color="white">
                Facebook
              </chakra.h1>
            </Flex>
          </Flex>
        </Grid>
        <chakra.form
          method="POST"
          shadow="base"
          rounded={[null, "md"]}
          overflow={{
            sm: "hidden",
          }}
          padding={5}
          onSubmit={handleSubmit}
        >
          <Grid gap={5}>
            <FormControl as={GridItem} colSpan={[6, 3]}>
              <FormLabel
                htmlFor="username"
                fontSize="sm"
                fontWeight="md"
                color="gray.700"
              >
                Username
              </FormLabel>
              <Input
                type="text"
                name="username"
                id="username"
                autoComplete="given-name"
                required
                mt={1}
                focusBorderColor="brand.400"
                shadow="sm"
                size="sm"
                w="full"
                rounded="md"
                ref={username}
                // onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl as={GridItem} colSpan={[6, 3]}>
              <FormLabel
                htmlFor="password"
                fontSize="sm"
                fontWeight="md"
                color="gray.700"
              >
                Password
              </FormLabel>
              <Input
                type="password"
                name="password"
                id="password"
                autoComplete="given-name"
                required
                mt={1}
                focusBorderColor="brand.400"
                shadow="sm"
                size="sm"
                w="full"
                rounded="md"
                ref={password}
                // onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button colorScheme="teal" variant="solid" type="submit">
              Login
            </Button>
          </Grid>
        </chakra.form>
      </SimpleGrid>
    </Flex>
  );
};

export default SignIn;
