import { NavBar } from "../components";
import { ProductList } from "../components";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { productAPIUrl } from "../baseURL";
import { Spinner } from "@chakra-ui/react";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`;

function Home() {
  const [products, setProducts] = useState([]);
  const[isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');

  async function fetchProducts() {
    const res = await fetch(`${productAPIUrl}/list`).then(response => {
      response.json().then(data => {
        setProducts(data.results)
        setIsLoading(false)
      }).catch(err => {
        console.error(err)
      })
    }).catch(err=>{
      console.error(err)
    })
    setIsLoading(true);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchQuery(){
    if(query !== '' && query !== undefined){
      const res = await fetch(`${productAPIUrl}/?q=${query}`).then(response => {
        response.json().then(data => {
          setProducts(data)
          setIsLoading(false)
        }).catch(err => {
          console.log(err)
        })
      }).catch(err => {
        console.log(err)
      })
      setIsLoading(true)
    }
  }
  return (
    <>
      <NavBar setQuery={setQuery} fetchQuery={fetchQuery} fetchProducts={fetchProducts}/>
      <Container>
        {isLoading ? <Spinner/> : <ProductList data={products}/>}
      </Container>
    </>
  );
}

export default Home;
