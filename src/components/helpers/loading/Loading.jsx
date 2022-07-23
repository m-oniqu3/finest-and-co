import React from "react";
import styled from "./Loading.module.css";
import loading from "./loading.svg";

const Loading = () => {
  return (
    <figure className={styled.loading}>
      <img src={loading} alt="Three animated dots" />
    </figure>
  );
};

export default Loading;
