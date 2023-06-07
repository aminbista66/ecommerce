import { NavBar } from "../components";
import { ProductList } from "../components";
import styled from "styled-components";
// import Product from "../components/test";
// import {data} from '../assets/data'

const Container = styled.div`
  padding: 10px;
`;

function Home() {
  return (
    <>
      <NavBar />
      <Container>
        <ProductList />
        {/* <Product data={data[0]}/> */}
      </Container>
    </>
  );
}

export default Home;
