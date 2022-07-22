import React from "react";
import styled from "./ProductDetails.module.css";
import Container from "../helpers/wrapper/Container";

const ProductDetails = () => {
  return (
    <section className={styled.details}>
      <Container>
        <div className={styled.details__group}>
          <figure className={styled.details__image}>
            <img
              src="https://images.unsplash.com/photo-1618221710640-c0eaaa2adb49?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
              alt="A living room set with a couch, two chairs and a coffee table"
            />
          </figure>

          <article className={styled.details__info}>
            <h1 className={styled.details__info__title}>New Arrival</h1>
            <div className={styled.details__info__filters}>
              <p>Living Room</p>
              <p>Ikea</p>
            </div>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
              quia iste quaerat asperiores dolores earum culpa! Deleniti
              obcaecati quae ut.
            </p>
          </article>
        </div>
      </Container>
    </section>
  );
};

export default ProductDetails;
