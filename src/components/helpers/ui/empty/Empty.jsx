import React from "react";
import styled from "./Empty.module.css";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

const Empty = (props) => {
  const navigate = useNavigate();

  //navigate to the specified page/route
  const handleClick = () => navigate(`${props.route}`);

  return (
    <section className={styled.empty}>
      <figure>
        <img src={props.image} alt={props.alt} />
      </figure>

      <div>
        <h2>{props.heading}</h2>
        <p>{props.text}</p>
        {props.button && <Button onClick={handleClick}>{props.button}</Button>}
      </div>
    </section>
  );
};

export default Empty;
