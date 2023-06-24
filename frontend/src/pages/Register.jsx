import React, { useState, useRef } from "react";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { Logo } from "../components";
import { baseUrl } from '../baseURL';

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const initialData = {
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
  };
  const [data, setData] = useState(initialData);

  function handleChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value.trim(),
    });
  }
  function createUser() {
    fetch(`${baseUrl}/user/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => {
        if (res.status === 200) navigate('/login')
    }).catch(err => console.error(err))
  }
  return (
    <>
      <Box bg={useColorModeValue("gray.50", "gray.800")}>
        <Button
          leftIcon={<ArrowBackIcon />}
          color={'grey.900'}
          variant="link"
          sx={{
            position: "absolute",
            top: "50px",
            left: "50px",
            outline: "none",
            padding: "10px",
          }}
          onClick={() => navigate("/")}
        >
          Home
        </Button>
      </Box>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={8}
          mx={"auto"}
          maxW={"lg"}
          py={12}
          px={6}
          minWidth={"450px"}
          width={"550px"}
        >
          <Stack align={"center"}>
            <Heading fontSize={"5xl"}>
              <Logo />
            </Heading>
            <Heading fontSize={"2xl"}>Register for an account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Enjoy Shopping
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      name="first_name"
                      onChange={handleChange}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      name="last_name"
                      onChange={handleChange}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" name="email" onChange={handleChange} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    name="password"
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="confirm-password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    onChange={handleChange}
                    name="password2"
                    type={showPassword ? "text" : "password"}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  rounded={"md"}
                  w={"full"}
                  size={"lg"}
                  py={"7"}
                  bg="gray.900"
                  color="white"
                  textTransform={"uppercase"}
                  _hover={{
                    transform: "translateY(2px)",
                    boxShadow: "lg",
                  }}
                  onClick={() => createUser()}
                >
                  Register
                </Button>
                <Center>
                  <Link href="/login" color={"grey.900"}>
                    Already have an account?
                  </Link>
                </Center>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
