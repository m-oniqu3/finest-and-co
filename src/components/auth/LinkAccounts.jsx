import { EmailAuthProvider, linkWithCredential } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase-config";
import Loading from "../helpers/loading/Loading";
import Button from "../helpers/ui/button/Button";
import Container from "../helpers/wrapper/Container";
import styled from "./LinkAccounts.module.css";
import { validateEmail, validatePassword } from "./validateForm";

const LinkAccounts = (props) => {
  const { setOpenModal, closeLogoutModal } = props;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(false);
  const [emailFeedback, setEmailFeedback] = useState({});
  const [passwordFeedback, setPasswordFeedback] = useState({});
  const [loading, setLoading] = useState(false);

  //update field values and validate on change
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
    //form is valid if all fields are valid
    const isValid = passwordFeedback?.valid && emailFeedback?.valid;
    if (isValid) setValid(true);
    else setValid(false);
  }, [passwordFeedback, emailFeedback]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!valid) return;
    else if (valid) {
      setLoading(true);
      try {
        const credential = EmailAuthProvider.credential(email, password);

        //link account
        linkWithCredential(auth.currentUser, credential).then((usercred) => {
          const user = usercred.user;
          console.log("Account linking success", user);
          alert(
            "Account linking success. You can now sign in with this account."
          );
          window.location.reload();

          //navigate to home
          // navigate("/", { replace: true });
          //refresh the page

          //close modal
          setOpenModal(false);
          closeLogoutModal(false);
        });
      } catch (error) {
        alert(error.message);
      }
      setLoading(false);
    }
  };

  const handleCancel = () => setOpenModal(false);

  //determine when to show errors
  const showEmailError = !emailFeedback?.valid && emailFeedback?.emailError;
  const showPasswordError =
    !passwordFeedback?.valid && passwordFeedback?.passwordError;
  const disabledButton = !valid || loading;

  if (loading) return <Loading />;

  return (
    <section className={styled.link}>
      <Container>
        <h3>Link Accounts</h3>
        <p className="text">
          Provide your email and password to link your account to a permanent
          one.
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styled.form__group}>
            <input
              type="email"
              value={email}
              onChange={handleEmail}
              placeholder="Email"
            />

            {/* Error Message */}
            <div className={styled.form__error}>
              {showEmailError && <p>{emailFeedback?.emailError}</p>}
            </div>

            <input
              type="password"
              value={password}
              onChange={handlePassword}
              placeholder="Password"
            />

            {/* Error Message */}
            <div className={styled.form__error}>
              {showPasswordError && <p>{passwordFeedback?.passwordError}</p>}
            </div>
          </div>

          <div className={styled.link__btns}>
            <Button className="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button disabled={disabledButton} className="primary" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Container>
    </section>
  );
};

export default LinkAccounts;
