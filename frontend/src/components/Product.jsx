import styled from "styled-components";
import { Stack } from "@chakra-ui/react";

const Container = styled.div`
  width: 400px;
  height: 450px;
  border: 1px solid lime;
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
const Badge = styled.span`
  background-color: ${({scheme}) => scheme.bg};
  font-weight: bold;
  font-size: 12px;
  padding: 5px;
  border-radius: 4px;
`

const BadgeColorScheme = {
  green : {
    bg: '#9AE6B4',
    text: '#48BB78'
  }
}

function Product() {
  return (
    <Container>
      <ImgContainer>
        <Img src="https://source.unsplash.com/random/900x700/?t-shirt" alt="" />
      </ImgContainer>
      <ActionContainer>
        <Stack direction="row">
          <Badge scheme={BadgeColorScheme.green}>
            SUCCESS
          </Badge>
        </Stack>
      </ActionContainer>
    </Container>
  );
}

export default Product;
