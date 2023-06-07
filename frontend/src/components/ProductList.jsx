import { Box } from '@chakra-ui/react';
import Product from './Product';
import styled from 'styled-components';

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 80px;

  @media screen and (max-width: 640px) {
    display: flex;
    flex-direction: column;
    gap: 60px;
  }
`

const ProductList = () => {
  return (
    <Box>
      <List>
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
      </List>
    </Box>
  );
};

export default ProductList;
