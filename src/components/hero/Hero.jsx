import React from "react";
import Button from "../helpers/ui/button/Button";
import styled from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styled.background}>
      <article className={styled.hero}>
        <h1>
          <span>extra-ordinary</span> service made <span>affordable</span>
        </h1>
        <p className="text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed eligendi
          non qui impedit.
        </p>
        <Button>Shop Now</Button>
      </article>
    </section>
  );
};

export default Hero;
