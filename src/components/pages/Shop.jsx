import React from "react";
import ProductDetails from "../products/ProductDetails";
import ProductList from "../products/ProductList";

const product = {
  img: "https://images.unsplash.com/photo-1618221710640-c0eaaa2adb49?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
  alt: "A living room set with a couch, two chairs and a coffee table",
  company: "Ikea",
  category: "Living Room",
  name: "New Arrival",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, quia iste quaerat asperiores dolores earum culpa! Deleniti obcaecati quae ut.",
};

const Shop = () => {
  return (
    <>
      {/* <ProductDetails product={product} /> */}
      <ProductList />
    </>
  );
};

export default Shop;
