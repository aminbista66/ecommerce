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
} from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";
import { Logo } from "../components";

export default function Login() {
  return (
    <>
      <Box bg={useColorModeValue("gray.50", "gray.800")}>
        <Button
          leftIcon={<BiArrowBack />}
          color={"grey.900"}
          variant="link"
          sx={{
            position: "absolute",
            top: "50px",
            left: "50px",
            outline: "none",
            padding: "10px",
          }}
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
                <Input type="email" name="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" />
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
                  disabled
                >
                  Login
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
