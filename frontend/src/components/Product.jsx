import styled from "styled-components";
import { Stack, Badge, IconButton } from "@chakra-ui/react";
import Rating from "./Rating";
import { BsCart3 } from "react-icons/bs";

const Container = styled.div`
  width: 400px;
  height: 450px;
  /* border: 1px solid lime; */

  @media screen and (max-width: 640px) {
    width: 350px;
    height: 380px;
  }
`;
const ImgContainer = styled.div`
  height: 70%;
  width: inherit;
`;
const Img = styled.img`
  object-fit: cover;
  height: 100%;
  width: inherit;
`;
const ActionContainer = styled.div`
  height: 30%;
  width: inherit;
`;

const Title = styled.p`
  text-align: justify;
  font-weight: 700;
  color: black;
  font-size: 1rem;
  cursor: pointer;
  padding: 5px;
`;

const Seller = styled.p`
  color: #2c2c2c;
  font-weight: 500;
  font-size: 0.8rem;
  margin-left: 5px;
`;

const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 5px;
  margin-top: 10px;
`;

const PriceCartAction = styled.div`
  /* background-color: red; */
  height: 50px;
  width: 250px;
  display: flex;
  align-items: center;
`;

const Price = styled.div`
  display: flex;
  margin-left: 15px;
  gap: 10px;
  font-size: 0.85rem;
`;

// const Button = styled.button`
//   border: transparent;
//   outline: none;
//   border-radius: 8px;
//   padding: 4px;
//   background-color: transparent;

//   &:hover {
//     transition: 0.2s ease all;
//     background-color: #eeeeee;
//   }
// `;

function Product() {
  return (
    <Container>
      <ImgContainer>
        <Img src="https://source.unsplash.com/random/900x700/?t-shirt" alt="" />
      </ImgContainer>
      <ActionContainer>
        <Stack direction="row" sx={{ padding: "5px" }}>
          <Badge colorScheme="green">TOP SELLER</Badge>
          <Badge colorScheme="red">BEST OFFER</Badge>
        </Stack>
        <Title>T-shirt for summer 100% cotton</Title>
        <Seller>By . Ghumti Pasal</Seller>
        <BottomContainer>
          <Rating rating={3.6} />
          <PriceCartAction>
            <IconButton icon={<BsCart3 size={20} />} />

            <Price>
              <span style={{ color: "tomato", fontWeight: "bold" }}>-20%</span>
              <strike>Rs. 1200</strike>
              <span>Rs. 1000</span>
            </Price>
          </PriceCartAction>
        </BottomContainer>
      </ActionContainer>
    </Container>
  );
}

export default Product;
