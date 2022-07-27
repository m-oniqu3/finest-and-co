import React, { useState } from "react";
import styled from "./ProductDetails.module.css";
import Container from "../helpers/wrapper/Container";
import Color from "../helpers/ui/colour/Color";
import ProductDetailsButtons from "./ProductDetailsButtons";
import Ratings from "../helpers/ui/rating/Ratings";
import Button from "../helpers/ui/button/Button";

const ProductDetails = (props) => {
  const { product } = props;
  const [image, setImage] = useState(product.images[0]);

  //format for price
  const nf = new Intl.NumberFormat("en-US");

  //update the image when the user clicks on a different image
  const handleImage = (image) => setImage(image);

  //map over the images and return a list of images
  const smallImages = product.images?.map((image) => {
    return (
      <figure key={image.id} onClick={() => handleImage(image)}>
        <img src={image.thumbnails.large.url} alt={image.alt} />
      </figure>
    );
  });

  //return the colors of the product
  const colours = product.colors?.map((color) => {
    return <Color key={color} color={color} />;
  });

  return (
    <section className={styled.details}>
      <Container>
        <div className={styled.details__group}>
          <div className={styled.details__image__group}>
            <figure className={styled.details__image}>
              <img src={image?.thumbnails?.full?.url} alt={product.name} />

              <div className={styled.product__colours}>{colours} </div>
            </figure>

            <div className={styled.details__images}>{smallImages}</div>
          </div>

          <article className={styled.details__info}>
            <h1 className={styled.details__info__title}>{product.name}</h1>

            <div className={styled.details__info__filters}>
              <Button className="secondary">{product.category}</Button>
              <Button className="secondary">{product.company}</Button>
            </div>

            <Ratings product={product} />

            <p className="text">{product.description}</p>

            <p className={styled.product__price}>
              $ {nf.format(product.price)}
            </p>

            <ProductDetailsButtons product={product} />
          </article>
        </div>
      </Container>
    </section>
  );
};

export default ProductDetails;
