import React from "react";
import Container from "../helpers/wrapper/Container";
import { useGetProductsQuery } from "../../store/features/api/apiSlice";
import Product from "./Product";
import Button from "../helpers/ui/button/Button";

const ProductList = () => {
  const results = useGetProductsQuery();

  let content;

  if (results.isLoading) {
    content = <p>Loading...</p>;
  }

  if (results.isSuccess) {
    content = results.data?.map((product) => {
      return <Product key={product.id} product={product} />;
    });
  }

  if (results.isError) {
    content = <p>{results.error}</p>;
  }

  return (
    <section>
      <Container>
        <div>
          <h3>Products</h3>
          <Button>Sort</Button>
        </div>

        {content}
      </Container>
    </section>
  );
};

export default ProductList;
