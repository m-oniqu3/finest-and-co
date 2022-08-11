import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../helpers/ui/button/Button";
import Container from "../helpers/wrapper/Container";
import Navbar from "../navbar/Navbar";
import styled from "./Hero.module.css";

const Hero = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/shop");

  return (
    <section className={styled.background}>
      <article className={styled.hero}>
        <Navbar light={true} />
        <Container>
          <div className={styled.hero__content}>
            <h1>The epitome of luxury furniture</h1>
            <p className="text">
              We believe that furniture should be more than just functional – it
              should be a reflection of your personal style and taste.
            </p>
            <Button className="secondary" onClick={handleClick}>
              Shop Now
            </Button>
          </div>
        </Container>
      </article>
    </section>
  );
};

export default Hero;
