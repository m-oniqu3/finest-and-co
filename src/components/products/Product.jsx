import React from "react";
import Color from "../helpers/ui/colour/Color";
import styled from "./Product.module.css";
import { useNavigate } from "react-router-dom";
import { CgHeart } from "react-icons/cg";
import Button from "../helpers/ui/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList } from "../../store/features/wishlist/wishlistSlice";

const Product = (props) => {
  const { product, wishlist } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  //format for price
  const nf = new Intl.NumberFormat("en-US");

  //return the colors of the product
  const colours = product.colors?.map((color) => {
    return <Color key={color} color={color} />;
  });

  //navigate to product info page for the current product
  const handleClick = () => navigate(`/shop/${product.id}`);

  const wishListHandler = (e) => {
    e.stopPropagation();
    if (!user.id) navigate("/account");
    else dispatch(addToWishList(product));
  };

  const heightClass = wishlist ? "height" : "normal";

  return (
    <article
      className={`${styled.product} ${styled[heightClass]}`}
      onClick={handleClick}
    >
      <figure className={styled.product__image}>
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
              <CgHeart size="22" />
            </div>
          </div>
          {wishlist && <Button className="primary">Move to cart</Button>}
        </div>
      </div>
    </article>
  );
};

export default Product;
