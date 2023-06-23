import styled from "styled-components";
import { Stack, Badge, IconButton } from "@chakra-ui/react";
import Rating from "./Rating";
import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { addToCart } from "../api";

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


function Product({ data }) {
  function handleAddToCart(slug) {
    addToCart(slug, 1).then(res => {
      res.json().then(data => {
        console.log(data)
      })
    })
  }
  return (
    <Container>
      <ImgContainer>
        <Img src={data.images[0].image} alt="" loading="lazy"/>
      </ImgContainer>
      <ActionContainer>
        <Stack direction="row" sx={{ padding: "5px" }}>
          <Badge colorScheme="green">TOP SELLER</Badge>
          <Badge colorScheme="red">BEST OFFER</Badge>
        </Stack>
        <Link to={`product/${data.slug}`}>
        <Title>{data.title}</Title>
        </Link>
        <Seller>By . {data.seller}</Seller>
        <BottomContainer>
          <Rating rating={data.rating} />
          <PriceCartAction>
            <IconButton icon={<BsCart3 size={20} onClick={() => handleAddToCart(data.slug)}/>} />

            <Price>
              <span style={{ color: "tomato", fontWeight: "bold" }}>-{data.discount_percent}%</span>
              <strike>$. {data.price}</strike>
              <span>$. {data.net_price}</span>
            </Price>
          </PriceCartAction>
        </BottomContainer>
      </ActionContainer>
    </Container>
  );
}

export default Product;
