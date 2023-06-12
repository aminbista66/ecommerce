import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Logo() {
  return (
    <>
      <Link to={"/"}>
        <span style={{ color: "#22c55e" }}>E</span>-com
      </Link>
    </>
  );
}

export default Logo;
