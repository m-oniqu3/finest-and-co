import React from "react";
import styled from "./ProductDetailsButtons.module.css";
import Button from "../helpers/ui/button/Button";
import { CgHeart } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/features/cart/cartSlice";
import { useNavigate, useLocation } from "react-router-dom";

const ProductDetailsButtons = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { product } = props;
  const { id, name, price, images } = product;

  const addToCartHandler = () => {
    //if the user is not logged in, redirect to the account page
    if (!user?.id) {
      navigate("/account");
      //store the page to redirect to in local storage
      localStorage.setItem("redirect", JSON.stringify(pathname));
    } else {
      //dispatch the action to add the current item to the cart
      dispatch(
        addToCart({ id, name, price, imgSrc: images[0].thumbnails.large.url })
      );
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
