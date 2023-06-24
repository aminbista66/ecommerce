import React from "react";
import {
  Box,
  Center,
  Input,
  Text,
  Stack,
  InputGroup,
  InputLeftAddon,
  Select,
  Button,
} from "@chakra-ui/react";

function Checkout() {
  return (
    <>
      {/* <NavBar/> */}
      <Center width={"100vw"}>
        <Center flex={0.6}>
          <Box height={"100%"} width={"70%"} sx={{ paddingTop: "50px" }}>
            <Text as="b" fontSize={"xl"}>
              Shipping Information
            </Text>
            <Stack direction={"column"} spacing={8} padding={"30px 0 0 0"}>
              <Box>
                <Text>Full name</Text>
                <Input
                  size={"md"}
                  margin={"10px 0 0 0"}
                  placeholder="Your first and last name"
                />
              </Box>
              <Box>
                <Text>Phone number</Text>
                <InputGroup>
                  <InputLeftAddon children="+234" />
                  <Input type="tel" placeholder="Your phone number" />
                </InputGroup>
              </Box>
              <Box>
                <Text>Zip code</Text>
                <Input
                  size={"md"}
                  margin={"10px 0 0 0"}
                  placeholder="Zip code"
                />
              </Box>
              <Box>
                <Text>City</Text>
                <Input
                  size={"md"}
                  margin={"10px 0 0 0"}
                  placeholder="Your current city"
                />
              </Box>
              <Select
                placeholder="Payment option"
                defaultValue={"Cash on delivery"}
              >
                <option value={"cod"}>Cash on delivery</option>
              </Select>
              <Button
                rounded={"none"}
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
                // onClick={() => addToCart(data.slug, quantity).then(res => {navigate('/cart')})}
              >
                Checkout
              </Button>
            </Stack>
          </Box>
        </Center>
        {/* <Center flex={0.4} bg={"#f7fafc"}></Center> */}
      </Center>
    </>
  );
}

export default Checkout;
