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
import {cartAPIUrl} from '../baseURL'

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

function CartProduct({ product, setRefresh }) {
  function handleRemove(slug){
    fetch(`${cartAPIUrl}/delete/${slug}/`, {
      method: 'DELETE',
      credentials: 'include'
    }).then(res => {
        if (res.ok == true){
          setRefresh(prev => !prev)
        }
    })
  }
  function handleIncrease() {
    fetch(`${cartAPIUrl}/increase-quantity/${product.slug}/`, {
      method: 'POST',
      body: JSON.stringify({quantity: 1}),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(res => {
      res.json().then(data => {
        console.log(data)
        setRefresh(prev => !prev)
      })
    })
  }
  function handleDecrease() {
    fetch(`${cartAPIUrl}/decrease-quantity/${product.slug}/`, {
      method: 'POST',
      body: JSON.stringify({quantity: 1}),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }).then(res => {
      res.json().then(data => {
        console.log(data)
        setRefresh(prev => !prev)
      })
    })
  }
  return (
    <>
      <Container>
        <Left>
          <Image src={product.images[0].image} />
          <Detail>
            {product.stock < 5 ? <Badge colorScheme="yellow">Only {product.stock} left</Badge> : <></>}
            <Text>{product.product_name}</Text>
            <LightText>By | {product.seller}</LightText>
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
              <NumberInput min={1} defaultValue={product.quantity} max={product.stock}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper onClick={handleIncrease}/>
                  <NumberDecrementStepper onClick={handleDecrease}/>
                </NumberInputStepper>
              </NumberInput>
            </div>
            <PriceContainer>
              <Stack>
                <Text>${product.price}</Text>
              </Stack>
            </PriceContainer>
          </Right>
          <span className={styles.del} onClick={() => handleRemove(product.slug)}>remove</span>
        </div>
      </Container>
    </>
  );
}

export default CartProduct;
