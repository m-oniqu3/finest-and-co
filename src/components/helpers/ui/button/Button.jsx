import React from "react";
import styled from "./Button.module.css";

const Button = (props) => {
  const handleClick = () => props.onClick();

  return (
    <button
      className={`${styled.button} ${styled[props.className]}`}
      onClick={handleClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
