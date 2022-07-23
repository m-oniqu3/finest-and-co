import React from "react";
import styled from "./Error.module.css";
import server from "../../../images/error.svg";
import Container from "../wrapper/Container";

const Error = (props) => {
  const { error } = props;
  return (
    <Container>
      <article className={styled.error}>
        <figure>
          <img
            src={server}
            alt="Illustration of a server that failed to connect."
          />
        </figure>
        <div>
          <h3>{error?.status.split("_").join(" ")}</h3>
          <p>{error?.error}</p>
        </div>
      </article>
    </Container>
  );
};

export default Error;
