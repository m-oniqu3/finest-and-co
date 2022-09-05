import React, { useEffect, useState } from "react";
import styled from "./ProductDetailsButtons.module.css";
import Button from "../helpers/ui/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { addToWishList } from "../../store/features/wishlist/wishlistSlice";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { toast } from "react-toastify";

const ProductDetailsButtons = (props) => {
  const { wishListItems } = useSelector((state) => state.wishlist);
  const [isInList, setIsInList] = useState(false);
  const { product } = props;

  // show notification
  const notify = () => {
    if (isInList) toast.success("Item removed from wishlist");
    else toast.success("Item added to wishlist");
  };

  const cartNotification = () => toast.success("Item added to cart");

  useEffect(() => {
    const item = wishListItems.find((item) => item.id === product.id);
    if (item) setIsInList(true);
    else setIsInList(false);
  }, [wishListItems, product]);

  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const productData = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.images[0].thumbnails.large.url,
  };

  const addToCartHandler = () => {
    //if the user is not logged in, redirect to the account page
    if (!id) {
      //navigate to the account page and send state data
      navigate("/account", {
        state: { redirect: `/shop/${product.id}` },
      });
    }
    //dispatch the action to add the current item to the cart
    else {
      dispatch(addToCart(productData));
      cartNotification();
    }
  };

  //add current product to wishlist
  const handleWishlist = () => {
    if (!id) {
      //navigate to the account page and send state data
      navigate("/account", { state: { redirect: `/shop/${product.id}` } });
    }
    //if the user is logged in, dispatch the action to add the current item to the wishlist
    else {
      dispatch(
        addToWishList({
          ...product,
          image: product.images[0].thumbnails.large.url,
        })
      );
      notify();
    }
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
