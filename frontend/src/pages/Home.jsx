import { NavBar } from "../components";
import { ProductList } from "../components";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`;

function Home() {
  return (
    <>
      <NavBar />
      <Container>
        <ProductList />
      </Container>
    </>
  );
}

export default Home;
