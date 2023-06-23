import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  Center,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { Logo } from "../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { authAPIUrl } from "../baseURL";
import axios from "axios";
import {request} from '../api'

export default function Login() {
  const navigate = useNavigate();
  const initialData = Object.freeze({
    email: "",
    password: "",
  });

  const [data, setData] = useState(initialData);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value.trim(),
    });
  };

  async function login() {
    // const rawResponse = await fetch(`${authAPIUrl}/login/`, {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data),
    //   credentials: 'include'
    // });
    // console.log(rawResponse)
    axios.post(`${authAPIUrl}/login/`, data, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    }).then(res => {
      console.log(res)
    })
    // request({
    //   url: '/user/login/',
    //   method: 'post',
    //   withCredentials: true,
    //   data: data
    // }).then(res => {
    //   console.log(res)
    // })
  }

  return (
    <>
      <Box bg={useColorModeValue("gray.50", "gray.800")}>
        <Button
          leftIcon={<ArrowBackIcon />}
          color={"grey.900"}
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
          width={"450px"}
        >
          <Stack align={"center"}>
            <Heading fontSize={"5xl"}>
              <Logo />
            </Heading>
            <Heading fontSize={"2xl"}>Sign in to your account</Heading>
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
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" name="email" onChange={handleChange} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    onChange={handleChange}
                    name="password"
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
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Link color={"grey.900"}>Forgot password?</Link>
                </Stack>
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
                  onClick={login}
                >
                  Login
                </Button>
                <Center>
                  <Link href={"/register"} color={"grey.900"}>
                    Don't have an account?
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
