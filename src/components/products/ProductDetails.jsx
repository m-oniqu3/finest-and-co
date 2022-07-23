import React, { useEffect, useState } from "react";
import styled from "./ProductDetails.module.css";
import Container from "../helpers/wrapper/Container";
import Color from "../helpers/ui/colour/Color";
import ProductDetailsButtons from "./ProductDetailsButtons";
import Ratings from "../helpers/ui/rating/Ratings";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ProductDetails = (props) => {
  const { product, showDetails } = props;
  const navigate = useNavigate();
  const [image, setImage] = useState();

  //format for price
  const nf = new Intl.NumberFormat("en-US");

  //navigate to the previous page
  const handlePrevious = () => navigate(-1);

  // if showDetails is false, set the image with img prop
  useEffect(() => {
    if (!showDetails && !product.images) {
      setImage(product.img);
    } else if (showDetails && product.images) {
      setImage(product.images[0]);
    }
  }, [product, showDetails]);

  //update the image when the user clicks on a different image
  const handleImage = (image) => setImage(image);

  //map over the images and return a list of images
  const smallImages = product.images?.map((image) => {
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
        {showDetails && (
          <p className={styled.arrow} onClick={handlePrevious}>
            <BsArrowLeft size="25" /> Back to Shop
          </p>
        )}

        <div className={styled.details__group}>
          <div>
            <figure className={styled.details__image}>
              <img
                src={showDetails ? image?.thumbnails?.full?.url : image}
                alt={showDetails ? product.name : product.alt}
              />
              {showDetails && (
                <div className={styled.product__colours}>{colours} </div>
              )}
            </figure>

            {showDetails && (
              <div className={styled.details__images}>{smallImages}</div>
            )}
          </div>

          <article className={styled.details__info}>
            <h1 className={styled.details__info__title}>{product.name}</h1>
            <div className={styled.details__info__filters}>
              <p>{product.category}</p>
              <p>{product.company}</p>
            </div>

            {showDetails && <Ratings product={product} />}

            <p className={styled.product__desc}>{product.description}</p>
            {showDetails && (
              <p className={styled.product__price}>
                $ {nf.format(product.price)}
              </p>
            )}

            {showDetails && <ProductDetailsButtons product={product} />}
          </article>
        </div>
      </Container>
    </section>
  );
};

export default ProductDetails;
