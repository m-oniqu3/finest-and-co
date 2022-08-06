import React from "react";
import styled from "./ProductDetailsButtons.module.css";
import Button from "../helpers/ui/button/Button";
import { CgHeart } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductDetailsButtons = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { product } = props;
  const { id, name, price, images } = product;
  const productData = {
    id,
    name,
    price,
    imgSrc: images[0].thumbnails.large.url,
  };

  const addToCartHandler = () => {
    //if the user is not logged in, redirect to the account page
    if (!user?.id) {
      //navigate to the account page and send state data
      navigate("/account", {
        state: {
          redirect: "/shop",
          action: "addToCart",
          payload: productData,
        },
      });
    } else {
      //dispatch the action to add the current item to the cart
      dispatch(addToCart(productData));
    }
  };

  return (
    <div className={styled.buttons}>
      <Button className="primary" onClick={addToCartHandler}>
        Add To Cart
      </Button>
      <div className={styled.wishlist}>
        <CgHeart size="22" />
      </div>
    </div>
  );
};

export default ProductDetailsButtons;
