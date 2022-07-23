import React from "react";
import styled from "./Ratings.module.css";
import { RiStarFill } from "react-icons/ri";

const Ratings = (props) => {
  const { product } = props;

  //round the stars to the nearest whole number
  const stars = Math.round(product.stars);

  /**
   * create an array with empty slots for the number of stars
   * then map over the array and return a full star
   * use underscore in place of parameter name
   */
  const fullStars = [...Array(stars)].map((_, index) => {
    return (
      <RiStarFill key={index} size="20" color="var(--secondary-neutral)" />
    );
  });

  return (
    <div className={styled.ratings}>
      <div>{fullStars}</div>
      <p>{product.reviews} Reviews</p>
    </div>
  );
};

export default Ratings;
