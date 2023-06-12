/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useState } from "react";

const Container = styled.div`
  background-color: white;
  border-bottom: 1px solid black;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
`;
const Left = styled.div`
  border-right: 1px solid black;
  height: inherit;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;

  @media screen and (max-width: 640px) {
    font-size: 8px;
  }
`;
const Mid = styled.div`
  flex: 3;
  height: inherit;
  display: flex;
`;
const Right = styled.div`
  flex: 1;
  border-left: 1px solid black;
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Input = styled.input`
  border: none;
  outline: none;
  height: 80%;
  flex: 0.8;
  padding: 4px;
  margin: 4px;
  font-size: 14px;
`;
const Button = styled.button`
  flex: 0.2;
  height: inherit;
  background-color: black;
  color: white;
  text-align: center;
  outline: none;
  border: none;
  letter-spacing: 1px;
  font-size: 14px;

  &:hover{
    opacity: 0.8;
    transition: 0.1s ease all;
  }
`;

const Text = styled.span`
    @media screen and (max-width: 640px) {
    display: none;
  }

`

const AuthLinks = () => {
  return (
    <span>
      <Link>LOGIN</Link> / <Link>REGISTER</Link>
    </span>
  );
};

const Carts = () => {
  return (
    <>
      {/* <Link>
        <ProfileLink />
      </Link> */}
      <Link to={'/cart'}>
        <ShoppingCartOutlined style={{ fontSize: "24px", cursor: 'pointer' }} />
      </Link>
    </>
  );
};

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <>
      <Container>
        <Left>
          <Link to={'/'}>
            <span style={{ color: "#22c55e" }}>E</span>-com
          </Link>
        </Left>

        <Mid>
          <Input placeholder="SEARCH ITEMS" />
          <Button>
            <SearchOutlined style={{ marginRight: "4px" }} />
            <Text>SEARCH</Text>
          </Button>
        </Mid>
        <Right>{isLoggedIn ? <Carts /> : <AuthLinks />}</Right>
      </Container>
    </>
  );
}

export default NavBar;
