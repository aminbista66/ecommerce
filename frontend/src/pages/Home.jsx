import { NavBar, Pagination } from "../components";
import { ProductList } from "../components";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { productAPIUrl } from "../baseURL";
import { Spinner } from "@chakra-ui/react";
import {request} from '../api'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`;

function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState();

  async function fetchProducts() {
    const res = await fetch(`${productAPIUrl}/list`)
      .then((response) => {
        response
          .json()
          .then((data) => {
            setProducts(data.results);
            setCount(data.count);
            setNextURL(data.next);
            setPrevURL(data.previous);
            setIsLoading(false);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
    setIsLoading(true);
  }

  useEffect(() => {
    request({
      url: '/product/cart/list',
      method: 'get'
    }).then(res => {
      console.log(res)
    })
    fetchProducts();
  }, []);

  async function fetchQuery() {
    if (query !== "" && query !== undefined) {
      const res = await fetch(`${productAPIUrl}/?q=${query}`)
        .then((response) => {
          response
            .json()
            .then((data) => {
              setProducts(data);
              setCount(data.count);
              setNextURL(data.next);
              setPrevURL(data.previous);
              setIsLoading(false);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
      setIsLoading(true);
    }
  }

  async function changePage(page) {
    const res = await fetch(`${productAPIUrl}/list/?page=${page}`)
      .then((response) => {
        response
          .json()
          .then((data) => {
            setProducts(data.results);
            setCurrentPage(page);
            setNextURL(data.next);
            setPrevURL(data.previous);
            setIsLoading(false);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
    setIsLoading(true);
  }

  return (
    <>
      <NavBar
        setQuery={setQuery}
        fetchQuery={fetchQuery}
        fetchProducts={fetchProducts}
      />
      <Container>
        {isLoading ? <Spinner /> : <ProductList data={products} />}
      </Container>
      <Pagination
          products={products}
          nextURL={nextURL}
          prevURL={prevURL}
          changePage={changePage}
          currentPage={currentPage}
          count={count}
        />
    </>
  );
}

export default Home;
