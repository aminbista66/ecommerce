import styled from "styled-components";
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ProfileLink } from "./index";

const Container = styled.div`
  background-color: white;
  border: 1px solid black;
  width: 100vw;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Left = styled.div`
  border: 1px solid black;
  margin: 0;
  padding: 0 8px;
  height: inherit;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Mid = styled.div`
  flex: 3;
  height: inherit;
  display: flex;
  align-items: center;
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
      <Link>
        <ProfileLink />
      </Link>
      <ShoppingCartOutlined style={{ fontSize: "20px" }} />
    </>
  );
};

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  return (
    <>
      <Container>
        <Left>
          <h1>
            <span style={{ color: "#22c55e" }}>E</span>-com
          </h1>
        </Left>

        <Mid>
          <Input placeholder="SEARCH ITEMS" />
          <Button>
            <SearchOutlined style={{ marginRight: "4px" }} />
            SEARCH
          </Button>
        </Mid>
        <Right>{isLoggedIn ? <Carts /> : <AuthLinks />}</Right>
      </Container>
    </>
  );
}

export default NavBar;
