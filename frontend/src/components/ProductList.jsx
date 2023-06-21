import { Box } from '@chakra-ui/react';
import Product from './Product';
import styled from 'styled-components';

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 80px;
  column-gap: 50px;

  @media screen and (max-width: 640px){
    display: flex;
    flex-direction: column;
    gap: 60px;
  }
  @media screen and (max-width: 820px) {
    display: flex;
    flex-direction: column;
    gap: 60px;
  }
`

const ProductList = ({ data }) => {
  return (
    <Box>
      <List>
        {data.map((item, index) => {
          return (
            <Product key={index} data={item}/>
          )
        })}
      </List>
    </Box>
  );
};

export default ProductList;
