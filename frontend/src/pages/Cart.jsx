import React from "react";
import { Stack, Divider } from "@chakra-ui/react";
import { Checkout, NavBar, CartProduct } from "../components";
import styled from "styled-components";


const Container = styled.div`
  margin: 0 10rem;
  margin-top: 2rem;

  @media screen and (max-width: 820px) {
    margin: 0 2rem;
    margin-top: 1rem;
  }
`;
const Heading = styled.h2`
  font-size: 1.75rem;
  font-weight: bold;
  padding: 1rem 0;
`;

const CheckoutWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
`

function Cart() {
  return (
    <>
      <NavBar />
      <Container>
        <Stack direction={"column"}>
          <Heading>Cart Items ( 3 )</Heading>
          <Stack direction={"column"}>
            <CartProduct />
            <Divider />
            <CartProduct />
            <Divider />
            <CartProduct />
            <Divider />
          </Stack>
          <CheckoutWrapper>
            <Checkout />
          </CheckoutWrapper>
        </Stack>
      </Container>
    </>
  );
}

export default Cart;
