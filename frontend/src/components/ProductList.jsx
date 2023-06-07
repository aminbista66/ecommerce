import { Grid, Box } from '@chakra-ui/react';
import Product from './Product';

const ProductList = () => {
  return (
    <Box>
      <Grid templateColumns="repeat(4, 1fr)" gap={8}>
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
