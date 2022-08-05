import React from "react";
import styled from "./Button.module.css";

const Button = (props) => {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  const buttonType = props.type ? props.type : "button";
  const disabled = props.disabled ? props.disabled : false;
  return (
    <button
      className={`${styled.button} ${styled[props.className]}`}
      type={buttonType}
      disabled={disabled}
      onClick={handleClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
