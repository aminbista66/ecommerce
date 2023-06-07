import styles from './product.module.css';
import { Badge, Stack, Link } from '@chakra-ui/react';
import {
  BsCart3,
  BsHeartFill,
} from 'react-icons/bs';
import Rating from './Rating';
import { IconButton } from '@chakra-ui/react';

const Product = ({ data }) => {
  return (
    <>
      <div className={styles.container}>
        <img
          src={data.image}
          alt=""
          style={{height: "350px"}}
        />
        {data.quantity !== undefined && data.quantity ===0  ? (
          <div style={{marginTop: '5px'}}>
          <Badge colorScheme="red">out of stock</Badge>
            </div>
        ) : 
           (
            <Stack direction="row" sx={{ marginTop: '10px' }}>
            <Badge colorScheme="red">Best Offer</Badge>
            <Badge colorScheme="green">Best Seller</Badge>
          </Stack>
        )}
        <div className={styles.title}>
          <Link>
            {data.title}
          </Link>
        </div>
        <div className={styles.seller}>
          By <span autoCapitalize="true">{data.seller}</span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Rating rating={3.6} />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingTop: '10px',
            }}
          >
            {data.quantity !== undefined && data.quantity !== 0 ? (
              <IconButton
                icon={<BsCart3 size={20} />}
              />
            ) : (
              <IconButton
                icon={<BsHeartFill color="" size={20} />}
              ></IconButton>
            )}

            <div style={{ marginLeft: '10px' }}>
              {data.discount == 0 ? (
                <span
                  style={{
                    fontWeight: '700',
                    marginRight: '10px',
                  }}
                >
                  Rs.{data.price}
                </span>
              ) : (
                <span>
                  {' '}
                  <span
                    style={{
                      color: 'tomato',
                      fontWeight: '700',
                      marginRight: '8px',
                    }}
                  >
                    {data.discount}% off.
                  </span>{' '}
                  <strike
                    style={{
                      color: 'gray',
                      fontWeight: '300',
                      marginRight: '8px',
                    }}
                  >
                    Rs.{data.price}
                  </strike>{' '}
                  <span style={{ fontWeight: '700', marginRight: '10px' }}>
                    Rs.{data.net_price}
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
