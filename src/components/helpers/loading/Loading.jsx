import React from "react";
import styled from "./Loading.module.css";
import loading from "./blocks-wave.svg";

const Loading = () => {
  return (
    <figure className={styled.loading}>
      <img src={loading} alt="Three animated dots" />
    </figure>
  );
};

export default Loading;
