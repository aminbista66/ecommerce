import { NavBar } from "../components";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  height: 100vh;
`;
const DivWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;
const LeftDiv = styled.div`
  flex: 1;
  border: 1px solid lime;
`;
const RightDiv = styled.div`
  flex: 1.4;
  border: 1px solid blue;
`;

function ProductDetail() {
  return (
    <>
      <NavBar />
      <Container>
        <DivWrapper>
          <LeftDiv>Left</LeftDiv>
          <RightDiv>Right</RightDiv>
        </DivWrapper>
      </Container>
    </>
  );
}

export default ProductDetail;
