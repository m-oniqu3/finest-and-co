import React from "react";
import styled from "../shop/Shop.module.css";
import Arrivals from "../arrival/Arrivals";
import Button from "../helpers/ui/button/Button";
import Navbar from "../navbar/Navbar";
import ProductList from "../products/ProductList";
import Container from "../helpers/wrapper/Container";

const categories = [
  "dining",
  "living room",
  "office",
  "kitchen",
  "kids",
  "bedroom",
  "ikea",
  "liddy",
  "marcos",
  "caressa",
];
const Shop = () => {
  // map over categories and return a button for each room
  const buttons = categories.map((item) => {
    return (
      <Button key={item} className="secondary">
        {item}
      </Button>
    );
  });

  return (
    <>
      <Navbar />
      <Container>
        <div className={styled.shop__buttons}>{buttons}</div>
      </Container>
      <Arrivals />
      <ProductList />
    </>
  );
};

export default Shop;
