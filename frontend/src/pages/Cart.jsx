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
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(`${cartAPIUrl}/list/`, {credentials: 'include'})
        .then((response) => {
          response
            .json()
            .then((data) => {
              setProducts(data.results);
              setIsLoading(false);
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
        });
      setIsLoading(true);
    }
    fetchProducts();
  }, [refresh]);

  return (
    <>
      <NavBar />
      <Container>
        {!isLoading ? (
          <Stack direction={"column"}>
            <Heading>Cart Items ( {products.length} )</Heading>
            <Stack direction={"column"}>
              {products.map((item, index) => {
                return (
                  <div key={index}>
                  <CartProduct product={item} setRefresh={setRefresh}/>
                  <Divider />
                  </div>
                )
              })}
                  {/* <CartProduct />
                  <Divider />
                  <CartProduct />
                  <Divider /> */}
            </Stack>
            <CheckoutWrapper>
              <Checkout productCount={products.length}/>
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
