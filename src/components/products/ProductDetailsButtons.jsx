import React, { useEffect, useState } from "react";
import styled from "./ProductDetailsButtons.module.css";
import Button from "../helpers/ui/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { addToWishList } from "../../store/features/wishlist/wishlistSlice";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";

const ProductDetailsButtons = (props) => {
  const { wishListItems } = useSelector((state) => state.wishlist);
  const [isInList, setIsInList] = useState(false);
  const { product } = props;

  useEffect(() => {
    const item = wishListItems.find((item) => item.id === product.id);
    if (item) setIsInList(true);
    else setIsInList(false);
  }, [wishListItems, product]);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

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

  //add current product to wishlist
  const handleWishlist = () => {
    if (!user?.id) navigate("/account");
    else dispatch(addToWishList(product));
  };

  // show the heart icon based on if the product is in the wishlist
  const heart = isInList ? <HiHeart size={22} /> : <HiOutlineHeart size={22} />;

  return (
    <div className={styled.buttons}>
      <Button className="primary" onClick={addToCartHandler}>
        Add To Cart
      </Button>
      <div className={styled.wishlist} onClick={handleWishlist}>
        {heart}
      </div>
    </div>
  );
};

export default ProductDetailsButtons;
