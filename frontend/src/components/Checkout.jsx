import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box, Button, Flex } from "@chakra-ui/react";
import { cartAPIUrl } from "../baseURL";
import { useNavigate } from "react-router-dom";

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

function Checkout({ productCount }) {
  const [summary, setSummary] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();
  async function fetchsummary() {
    const rawResponse = await fetch(`${cartAPIUrl}/summary/`, {
      credentials: "include",
    }).then((res) => {
      res.json().then((data) => {
        setSubtotal(data.total);
      });
    });
  }
  useEffect(() => {
    fetchsummary();
  }, []);
  useEffect(() => {
    setSummary(subtotal + 15 * productCount);
  }, [subtotal]);
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
              <span>${subtotal}</span>
            </TextLight>
            <TextLight>
              <span>Shipping + Tax</span>
              <span>${15 * productCount}</span>
            </TextLight>
            <Text>
              <span>Total</span>
              <span>${subtotal ? summary : 0}</span>
            </Text>
          </div>
        </Box>

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
          onClick={() => navigate('/checkout')}
        >
          Checkout
        </Button>
      </Flex>
    </Box>
  );
}

export default Checkout;
