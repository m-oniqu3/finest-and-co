import React from "react";
import styled from "./SignIn.module.css";
import Button from "../helpers/ui/button/Button";
import Container from "../helpers/wrapper/Container";

const SignIn = () => {
  return (
    <Container>
      <form className={styled.form}>
        <div className={styled.form__heading}>
          <h3>Create Account</h3>
          <p className="text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            tempora illum.
          </p>
        </div>

        <div className={styled.form__group}>
          <input type="text" id="name" placeholder="Name" />

          <input type="email" id="email" placeholder="Email" />

          <input type="password" id="password" placeholder="Password" />
        </div>

        <Button className="primary">Create Account</Button>
        <Button className="secondary">Continue as Guest</Button>
        <p className={`text ${styled.form__prompt}`}>
          Already have an account? <span>Sign In</span>
        </p>
      </form>
    </Container>
  );
};

export default SignIn;
