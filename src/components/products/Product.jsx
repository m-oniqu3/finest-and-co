import React from "react";
import Color from "../helpers/ui/colour/Color";
import styled from "./Product.module.css";

const Product = (props) => {
  const { product } = props;

  const colours = product.colors?.map((color) => {
    return <Color key={color} color={color} />;
  });
  return (
    <article className={styled.product}>
      <figure className={styled.product__image}>
        <img src={product.image} alt={product.name} />
      </figure>

      <div className={styled.product__details}>
        <p className={styled.product__category}> {product.category}</p>

        <h4 className={styled.product__name}>{product.name}</h4>

        <p className={styled.product__price}>${product.price}</p>
        <div className={styled.product__colours}>{colours} </div>
      </div>
    </article>
  );
};

export default Product;
