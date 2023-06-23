import React from "react";
import { Stack, Divider } from "@chakra-ui/react";
import { Checkout, NavBar, CartProduct } from "../components";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { cartAPIUrl } from "../baseURL";
import { Spinner } from "@chakra-ui/react";

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
`;

function Cart() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(`${cartAPIUrl}/list/`)
        .then((response) => {
          response
            .json()
            .then((data) => {
              setProducts(data.results);
              setIsLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
      setIsLoading(true);
    }
  }, []);

  return (
    <>
      <NavBar />
      <Container>
        {!isLoading ? (
          <Stack direction={"column"}>
            <Heading>Cart Items ( 3 )</Heading>
            <Stack direction={"column"}>
              {/* {products.map((item, index) => {
                return (
                  <>
                  <CartProduct key={index}/>
                  <Divider key={index+1}/>
                  </>
                )
              })} */}
                  <CartProduct />
                  <Divider />
                  <CartProduct />
                  <Divider />
            </Stack>
            <CheckoutWrapper>
              <Checkout />
            </CheckoutWrapper>
          </Stack>
        ) : (
          <Spinner />
        )}
      </Container>
    </>
  );
}

export default Cart;
