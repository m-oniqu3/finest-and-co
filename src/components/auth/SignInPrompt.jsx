import React from "react";
import styled from "./SignInPrompt.module.css";
import Button from "../helpers/ui/button/Button";
import Container from "../helpers/wrapper/Container";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";

const SignInPrompt = (props) => {
  const navigate = useNavigate();
  const { page } = props;

  const handleSignIn = () => navigate("/account");

  return (
    <>
      <Navbar />
      <Container>
        <div className={styled.prompt}>
          <article>
            <h1>Sign In</h1>
            <p className="text">
              You're currently signed out. Sign in to see the items in your{" "}
              {`${page}`}.
            </p>
            <Button className="primary" onClick={handleSignIn}>
              Sign In
            </Button>
          </article>
        </div>
      </Container>
    </>
  );
};

export default SignInPrompt;
