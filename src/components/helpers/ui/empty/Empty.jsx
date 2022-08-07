import React from "react";
import styled from "./Empty.module.css";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import Container from "../../wrapper/Container";

const Empty = (props) => {
  const { heading, text, button } = props;
  const navigate = useNavigate();

  //navigate to the specified page/route
  const handleClick = () => navigate(`${props.route}`);

  return (
    <Container>
      <article className={styled.empty}>
        <h2>{heading}</h2>
        <p>{text}</p>

        {button && (
          <Button className="primary" onClick={handleClick}>
            {button}
          </Button>
        )}
      </article>
    </Container>
  );
};

export default Empty;
