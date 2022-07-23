import React from "react";
import { BsFillCircleFill } from "react-icons/bs";

const Color = (props) => {
  const { color } = props;
  return <BsFillCircleFill size="20" color={color} />;
};

export default Color;
