import { Box } from '@chakra-ui/react';
import Product from './Product';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 80px;
`

const ProductList = () => {
  return (
    <Box>
      <Grid>
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
      </Grid>
    </Box>
  );
};

export default ProductList;
