import React from "react";
import styled from "./ProductDetails.module.css";
import Container from "../helpers/wrapper/Container";

const ProductDetails = (props) => {
  const { product } = props;

  const smallImages = product.images.map((image) => {
    return (
      <figure key={image.id}>
        <img src={image.thumbnails.small.url} alt={image.alt} />
      </figure>
    );
  });
  return (
    <section className={styled.details}>
      <Container>
        <div className={styled.details__group}>
          <figure className={styled.details__image}>
            <img
              src={product.images[0].thumbnails.full.url}
              alt={product.alt ? product.alt : product.name}
            />
          </figure>

          <div className={styled.details__images}>{smallImages}</div>

          <article className={styled.details__info}>
            <h1 className={styled.details__info__title}>{product.name}</h1>
            <div className={styled.details__info__filters}>
              <p>{product.category}</p>
              <p>{product.company}</p>
            </div>

            <p>{product.description}</p>
          </article>
        </div>
      </Container>
    </section>
  );
};

export default ProductDetails;
