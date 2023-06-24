import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  Input,
  Text,
  Stack,
  InputGroup,
  InputLeftAddon,
  Select,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { productAPIUrl, cartAPIUrl } from "../baseURL";

function Checkout() {
  const navigate = useNavigate();
  const initialData = Object.freeze({
    phone: "",
    address: "",
    postal_code: "",
    city: "",
  });

  const [data, setData] = useState(initialData);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value.trim(),
    });
  };



  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(`${cartAPIUrl}/list/`, {credentials: 'include'})
        .then((response) => {
          response
            .json()
            .then((data) => {
              setProducts(data.results);
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
    fetchProducts();
  }, [refresh]);

  function completeCheckout() {
    console.log(data)
    if(products.length !== 0) {
      for(let i=0; i<products.length; i++){
        fetch(`${productAPIUrl}/order/${products[i].slug}/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
          credentials: 'include'
        }).then(res => {
          if (res.ok){
            navigate('/')
          }
        }).catch(err => console.error(err))
      }
    }
  }
  return (
    <>
      {/* <NavBar/> */}
      <Center width={"100vw"}>
        <Center flex={0.6}>
          <Box height={"100%"} width={"70%"} sx={{ paddingTop: "50px" }}>
            <Text as="b" fontSize={"xl"}>
              Shipping Information
            </Text>
            <Stack direction={"column"} spacing={8} padding={"30px 0 0 0"}>
              <Box>
                <Text>Full name</Text>
                <Input
                  size={"md"}
                  margin={"10px 0 0 0"}
                  placeholder="Your first and last name"
                />
              </Box>
              <Box>
                <Text>Phone number</Text>
                <InputGroup>
                  <InputLeftAddon children="+977" />
                  <Input
                    type="tel"
                    placeholder="Your phone number"
                    name="phone"
                    onChange={handleChange}
                  />
                </InputGroup>
              </Box>
              <Box>
                <Text>Zip code</Text>
                <Input
                  size={"md"}
                  margin={"10px 0 0 0"}
                  placeholder="Zip code"
                  name="postal_code"
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <Text>Address</Text>
                <Input
                  size={"md"}
                  margin={"10px 0 0 0"}
                  placeholder="Your current city"
                  name="address"
                  onChange={handleChange}
                />
              </Box>
              <Box>
                <Text>City</Text>
                <Input
                  size={"md"}
                  margin={"10px 0 0 0"}
                  placeholder="Your current city"
                  name="city"
                  onChange={handleChange}
                />
              </Box>
              <Select
                placeholder="Payment option"
                defaultValue={"Cash on delivery"}
              >
                <option value={"cod"}>Cash on delivery</option>
              </Select>
              <Button
                rounded={"none"}
                w={"full"}
                size={"lg"}
                py={"7"}
                bg="gray.900"
                color="white"
                textTransform={"uppercase"}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
                onClick={completeCheckout}
              >
                Checkout
              </Button>
            </Stack>
          </Box>
        </Center>
        {/* <Center flex={0.4} bg={"#f7fafc"}></Center> */}
      </Center>
    </>
  );
}

export default Checkout;
