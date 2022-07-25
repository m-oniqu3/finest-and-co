import React from "react";
import styled from "./ProductDetailsButtons.module.css";
import Button from "../helpers/ui/button/Button";
import { AiOutlineShopping } from "react-icons/ai";
import { CgHeart } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/features/cart/cartSlice";

const ProductDetailsButtons = (props) => {
  const dispatch = useDispatch();

  const { product } = props;
  const { id, name, price, images } = product;

  //dispatch the action to add the current item to the cart
  const addToCartHandler = () => {
    dispatch(
      addToCart({ id, name, price, imgSrc: images[0].thumbnails.large.url })
    );
  };
  return (
    <div className={styled.buttons}>
      <Button onClick={addToCartHandler}>
        Add To Cart
        <AiOutlineShopping size="24" color="var(--primary-neutral)" />
      </Button>
      <div className={styled.wishlist}>
        <CgHeart size="22" color="var(--primary-neutral)" />
      </div>
    </div>
  );
};

export default ProductDetailsButtons;
