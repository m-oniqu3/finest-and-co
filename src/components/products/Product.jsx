import React from "react";
import Color from "../helpers/ui/colour/Color";
import styled from "./Product.module.css";
import { useNavigate } from "react-router-dom";
import { CgHeart } from "react-icons/cg";

const Product = (props) => {
  const { product } = props;
  const navigate = useNavigate();

  //format for price
  const nf = new Intl.NumberFormat("en-US");

  //return the colors of the product
  const colours = product.colors?.map((color) => {
    return <Color key={color} color={color} />;
  });

  //navigate to product info page for the current product
  const handleClick = () => navigate(`/shop/${product.id}`);

  return (
    <article className={styled.product} onClick={handleClick}>
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
          <p className={styled.product__price}>$ {nf.format(product.price)}</p>
          <div className={styled.product__icons}>
            <CgHeart size="22" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default Product;
