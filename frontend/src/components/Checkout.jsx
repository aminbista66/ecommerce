import React from "react";
import styled from "styled-components";
import { Box, Button, Flex } from "@chakra-ui/react";

const Text = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;
const TextLight = styled.p`
  font-size: 0.9rem;
  font-weight: 400;
  color: #4a5568;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function Checkout() {
  return (
    <Box w={"400px"} bg={"#f7fafc"} padding={"2rem"} borderRadius={"0.5rem"}>
      <Flex direction={"column"}>
        <Box>
          <Text>Order Summary</Text>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <TextLight>
              <span>Subtotal</span>
              <span>$499</span>
            </TextLight>
            <TextLight>
              <span>Shipping + Tax</span>
              <span>$20</span>
            </TextLight>
            <Text>
              <span>Total</span>
              <span>$519</span>
            </Text>
          </div>
        </Box>
        {/* <Button colorScheme="blue">Checkout</Button> */}
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
          Checkout
        </Button>
      </Flex>
    </Box>
  );
}

export default Checkout;
