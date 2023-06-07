import { NavBar } from "../components";
import { ProductList } from "../components";
import styled from "styled-components";

const Container = styled.div`
  padding: 10px;
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
