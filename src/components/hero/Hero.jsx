import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../helpers/ui/button/Button";
import styled from "./Hero.module.css";

const Hero = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/shop");

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
        <Button onClick={handleClick}>Shop Now</Button>
      </article>
    </section>
  );
};

export default Hero;
