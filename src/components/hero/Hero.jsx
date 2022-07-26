import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../helpers/ui/button/Button";
import Navbar from "../navbar/Navbar";
import styled from "./Hero.module.css";

const Hero = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/shop");

  return (
    <section className={styled.background}>
      <Navbar />
      <article className={styled.hero}>
        <div className={styled.hero__content}>
          <h1>
            <span>extra-ordinary</span> service made <span>affordable</span>
          </h1>
          <p className="text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed
            eligendi non qui impedit. Lorem ipsum dolor sit amet.
          </p>
          <Button onClick={handleClick}>Shop Now</Button>
        </div>
      </article>
    </section>
  );
};

export default Hero;
