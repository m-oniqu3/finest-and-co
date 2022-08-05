import React, { useState } from "react";
import styled from "./SignIn.module.css";
import Button from "../helpers/ui/button/Button";
import Container from "../helpers/wrapper/Container";
import {
  createAccount,
  signInUser,
  signInUserAnonymously,
} from "../firebase/firebase-config";
import Loading from "../helpers/loading/Loading";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [userHasAccount, setUserHasAccount] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //toggle userHasAccount
  const toggleFormFields = () => setUserHasAccount((state) => !state);

  //update field values
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  //dynamic text
  const text = userHasAccount ? "Sign In" : "Create Account";
  const link = userHasAccount ? "Create Account" : "Sign In";
  const prompt = userHasAccount
    ? "Don't have an account?"
    : "Already have an account?";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userHasAccount) {
      //create account
      setLoading(true);
      try {
        await createAccount(email, password);
        navigate("/shop", { replace: true });
      } catch (error) {
        alert(error.message);
      }
      setLoading(false);
    } else if (userHasAccount) {
      //sign in
      setLoading(true);
      try {
        await signInUser(email, password);
        navigate("/shop", { replace: true });
      } catch (error) {
        alert(error.message);
      }
      setLoading(false);
    }
  };

  //login anonymously
  const handleGuest = async () => {
    setLoading(true);
    try {
      await signInUserAnonymously();
      navigate("/shop", { replace: true });
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    <Container>
      <form className={styled.form} onSubmit={handleSubmit}>
        <div className={styled.form__heading}>
          <h3>{text}</h3>
          <p className="text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            tempora illum.
          </p>
        </div>

        <div className={styled.form__group}>
          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={handleEmail}
            value={email}
          />

          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={handlePassword}
            value={password}
          />
        </div>

        <Button type="submit" disabled={loading} className="primary">
          {text}
        </Button>
        <Button disabled={loading} className="secondary" onClick={handleGuest}>
          Continue as Guest
        </Button>

        <p className={`text ${styled.form__prompt}`}>
          {prompt} <span onClick={toggleFormFields}>{link}</span>
        </p>
      </form>
    </Container>
  );
};

export default SignIn;
