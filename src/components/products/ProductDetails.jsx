import React, { useState } from "react";
import styled from "./ProductDetails.module.css";
import Container from "../helpers/wrapper/Container";
import Color from "../helpers/ui/colour/Color";
import ProductDetailsButtons from "./ProductDetailsButtons";
import Ratings from "../helpers/ui/rating/Ratings";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ProductDetails = (props) => {
  const { product } = props;
  const navigate = useNavigate();

  //format for price
  const nf = new Intl.NumberFormat("en-US");

  //navigate to the previous page
  const handlePrevious = () => navigate(-1);

  //set the initial state of the product image
  const [image, setImage] = useState(product.images[0]);

  //update the image when the user clicks on a different image
  const handleImage = (image) => setImage(image);

  //map over the images and return a list of images
  const smallImages = product.images.map((image) => {
    return (
      <figure key={image.id} onClick={() => handleImage(image)}>
        <img src={image.thumbnails.small.url} alt={image.alt} />
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
        <p className={styled.arrow} onClick={handlePrevious}>
          <BsArrowLeft size="25" /> Back to Shop
        </p>
        <div className={styled.details__group}>
          <div>
            <figure className={styled.details__image}>
              <img
                src={image.thumbnails.full.url}
                alt={product.alt ? product.alt : product.name}
              />
              <div className={styled.product__colours}>{colours} </div>
            </figure>

            <div className={styled.details__images}>{smallImages}</div>
          </div>

          <article className={styled.details__info}>
            <h1 className={styled.details__info__title}>{product.name}</h1>
            <div className={styled.details__info__filters}>
              <p>{product.category}</p>
              <p>{product.company}</p>
            </div>

            <Ratings product={product} />

            <p className={styled.product__desc}>{product.description}</p>
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
