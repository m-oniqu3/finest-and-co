import React from "react";
import Button from "../helpers/ui/button/Button";

const ProductDetailsButtons = (props) => {
  const { product } = props;
  return (
    <div>
      <Button>Wishlist</Button>
      <Button>Add To Cart</Button>
    </div>
  );
};

export default ProductDetailsButtons;
