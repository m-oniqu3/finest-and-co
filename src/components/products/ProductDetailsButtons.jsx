import React from "react";
import styled from "./ProductDetailsButtons.module.css";
import Button from "../helpers/ui/button/Button";
import { AiOutlineShopping } from "react-icons/ai";
import { CgHeart } from "react-icons/cg";

const ProductDetailsButtons = (props) => {
  const { product } = props;
  return (
    <div className={styled.buttons}>
      <Button>
        Wishlist
        <CgHeart size="22" color="var(--primary-neutral)" />
      </Button>
      <Button>
        Add To Cart
        <AiOutlineShopping size="24" color="var(--primary-neutral)" />
      </Button>
    </div>
  );
};

export default ProductDetailsButtons;
