import React from "react";
import styled from "styled-components";

import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Badge,
  Stack,
} from "@chakra-ui/react";
import styles from "./cartproduct.module.css";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.25rem 0;

  @media screen and (max-width: 640px) {
    display: block;
  }
`;
const Left = styled.div`
  display: flex;
  gap: 20px;
  /* border: 1px solid lime; */
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 200px;
  /* border: 1px solid red; */
  @media screen and (max-width: 640px) {
    justify-content: space-between;
    padding: 4px;
  }
`;

const Image = styled.img`
  height: 110px;
  width: 110px;
  object-fit: cover;
  border-radius: 8px;
  padding: 4px;
`;
const Detail = styled.div`
  padding: 0 1rem;
  font-weight: 700;
`;
const Text = styled.p`
  font-size: 1.25rem;
`;
const LightText = styled.p`
  color: #424242;
  font-weight: 400;
  font-size: 0.9rem;
`;

const PriceContainer = styled.div``;

function CartProduct() {
  return (
    <>
      <Container>
        <Left>
          <Image src="https://source.unsplash.com/random/900x700/?sneaker" />
          <Detail>
            <Badge colorScheme="yellow">Only 2 left</Badge>
            <Text>Jordan sneaker J-1 High</Text>
            <LightText>University Blue, 36</LightText>
          </Detail>
        </Left>
        <div>
          <Right>
            <div
              style={{
                width: "120px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                paddingTop: "10px",
              }}
            >
              Qty:
              <NumberInput min={0} defaultValue={1}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </div>
            <PriceContainer>
              <Stack>
                <Text>$499</Text>
              </Stack>
            </PriceContainer>
          </Right>
          <span className={styles.del}>remove</span>
        </div>
      </Container>
    </>
  );
}

export default CartProduct;
