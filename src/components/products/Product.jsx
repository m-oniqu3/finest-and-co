import React, { useEffect, useState } from "react";
import Color from "../helpers/ui/colour/Color";
import styled from "./Product.module.css";
import { useNavigate } from "react-router-dom";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import Button from "../helpers/ui/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList } from "../../store/features/wishlist/wishlistSlice";
import { addToCart } from "../../store/features/cart/cartSlice";
import { toast } from "react-toastify";

const Product = (props) => {
  const { product, wishlist } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);
  const { wishListItems } = useSelector((state) => state.wishlist);
  const [isInList, setIsInList] = useState(false);

  // show notification
  const notify = () => {
    if (isInList) toast.success("Item removed from wishlist");
    else toast.success("Item added to wishlist");
  };

  //format for price
  const nf = new Intl.NumberFormat("en-US");

  //return the colors of the product
  const colours = product.colors?.map((color) => {
    return <Color key={color} color={color} />;
  });

  //navigate to product info page for the current product
  const handleClick = () => navigate(`/shop/${product.id}`);

  //add the current product to the wishlist
  const wishListHandler = () => {
    //navigate to the account page and send state data
    if (!id) navigate("/account");
    //add the current item to the wishlist and show notification
    else {
      dispatch(addToWishList(product));
      notify();
    }
  };

  const productData = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
  };

  // show notification
  const moveToCartNotification = () => toast.success("Item moved to cart");

  //add the current product to the cart and remove from wishlist
  const handleMoveToCart = () => {
    dispatch(addToCart(productData));
    dispatch(addToWishList(product));
    moveToCartNotification();
  };

  //check if the current product is in the wishlist
  useEffect(() => {
    const item = wishListItems.find((item) => item.id === product.id);
    if (item) setIsInList(true);
    else setIsInList(false);
  }, [wishListItems, product]);

  const heightClass = wishlist ? "height" : "normal";
  const heart = isInList ? <HiHeart size={22} /> : <HiOutlineHeart size={22} />;

  return (
    <article className={`${styled.product} ${styled[heightClass]}`}>
      <figure className={styled.product__image} onClick={handleClick}>
        <img src={product.image} alt={product.name} />
      </figure>

      <div className={styled.product__details}>
        <h4 className={styled.product__name}>{product.name}</h4>
        <p className={styled.product__category}>
          {product.category}, {product.company}
        </p>
        <div className={styled.product__colours}>{colours} </div>

        <div className={styled.product__group}>
          <div className={styled.product__group__info}>
            <p className={styled.product__price}>
              $ {nf.format(product.price)}
            </p>
            <div className={styled.product__icons} onClick={wishListHandler}>
              {heart}
            </div>
          </div>
          {wishlist && (
            <Button className="primary" onClick={handleMoveToCart}>
              Move to cart
            </Button>
          )}
        </div>
      </div>
    </article>
  );
};

export default Product;
