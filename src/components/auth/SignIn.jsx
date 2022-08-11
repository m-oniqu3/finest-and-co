import React, { useEffect, useState } from "react";
import styled from "./SignIn.module.css";
import Button from "../helpers/ui/button/Button";
import Container from "../helpers/wrapper/Container";
import {
  createAccount,
  signInUser,
  signInUserAnonymously,
} from "../firebase/firebase-config";
import Loading from "../helpers/loading/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/features/cart/cartSlice";
import { addToWishList } from "../../store/features/wishlist/wishlistSlice";
import { validateEmail, validatePassword } from "./validateForm";
// import { validateForm } from "./validateForm";

const SignIn = (props) => {
  const [userHasAccount, setUserHasAccount] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [emailFeedback, setEmailFeedback] = useState({});
  const [passwordFeedback, setPasswordFeedback] = useState({});
  //toggle userHasAccount
  const toggleFormFields = () => setUserHasAccount((state) => !state);

  //update field values
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailFeedback(validateEmail(e.target.value));
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordFeedback(validatePassword(e.target.value));
  };

  //check if form is valid
  useEffect(() => {
    const isValid = passwordFeedback?.valid && emailFeedback?.valid;
    if (isValid) setValid(true);
    else setValid(false);
  }, [passwordFeedback, emailFeedback]);

  //dynamic text
  const text = userHasAccount ? "Sign In" : "Create Account";
  const link = userHasAccount ? "Create Account" : "Sign In";
  const prompt = userHasAccount
    ? "Don't have an account?"
    : "Already have an account?";

  /**redirect user after sign in and dispatch action if any
   * destructured state from location
   * if state, navigate to state.redirect
   * if action, dispatch action with state.payload
   * if neither, navigate to shop
   */
  const redirectUser = () => {
    if (state) {
      const { redirect, action, payload } = state;
      navigate(`${redirect}`, { replace: true });

      if (action) {
        if (action === "addToCart") dispatch(addToCart(payload));
        if (action === "addToWishList") dispatch(addToWishList(payload));
      }
    } else navigate("/shop", { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hi");
    if (!valid) {
      return;
    } else if (!userHasAccount) {
      //create account then redirect user if successful
      setLoading(true);
      try {
        await createAccount(email, password);
        redirectUser();
      } catch (error) {
        alert(error.message);
      }
      setLoading(false);
    } else if (userHasAccount) {
      //sign in then redirect user if successful
      setLoading(true);
      try {
        await signInUser(email, password);
        redirectUser();
      } catch (error) {
        alert(error.message);
      }
      setLoading(false);
    }
  };

  //login anonymously then redirect user if successful
  const handleGuest = async () => {
    setLoading(true);
    try {
      await signInUserAnonymously();
      redirectUser();
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  //render loading spinner
  if (loading) return <Loading />;

  const showEmailError = !emailFeedback?.valid && emailFeedback?.emailError;
  const showPasswordError =
    !passwordFeedback?.valid && passwordFeedback?.passwordError;
  const disabledButton = !valid || loading;

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
          <div className={styled.form__error}>
            {showEmailError && <p>{emailFeedback?.emailError}</p>}
          </div>

          <input
            type="password"
            id="password"
            placeholder="Password"
            onChange={handlePassword}
            value={password}
          />
          <div className={styled.form__error}>
            {showPasswordError && <p>{passwordFeedback?.passwordError}</p>}
          </div>
        </div>

        <Button type="submit" disabled={disabledButton} className="primary">
          {text}
        </Button>
        <Button className="secondary" onClick={handleGuest}>
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
