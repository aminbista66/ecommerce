import React, { useEffect, useState } from "react";
import { Button, Stack, IconButton } from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";

function Pagination({
  products,
  currentPage,
  changePage,
  count,
}) {
  const [divident, setDivident] = useState(1);

  useEffect(()=>{
    products.length >= 1 ? setDivident(products.length) : setDivident(1);
  }, [products])

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack direction={"row"} sx={{ marginTop: "50px" }}>
          {count !== undefined ? (
            Array(count / divident)
              .fill("_")
              .map((item, index) => (
                <Button
                  variant={currentPage === index + 1 ? "outline" : "solid"}
                  key={index}
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </Button>
              ))
          ) : (
            <></>
          )}
        </Stack>
      </div>
    </>
  );
}

export default Pagination;
