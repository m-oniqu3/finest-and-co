import React from "react";
import styled from "./Arrivals.module.css";
import Button from "../helpers/ui/button/Button";
import Container from "../helpers/wrapper/Container";

const Arrivals = () => {
  return (
    <Container>
      <section className={styled.arrivals}>
        <figure>
          <img
            src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt="A kitchen with an island with 4 barstools"
          />
        </figure>
        <article>
          <Container>
            <h1>New Arrival</h1>
            <div className={styled["arrivals__btn-group"]}>
              <Button className="secondary">Kitchen</Button>
              <Button className="secondary">Ikea</Button>
            </div>

            <p className="text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
              quia iste quaerat asperiores dolores earum culpa! Deleniti
              obcaecati quae ut. Quisquam, quidem. Lorem ipsum dolor sit amet
              consectetur adipisicing elit.
            </p>
          </Container>
        </article>
      </section>
    </Container>
  );
};

export default Arrivals;
