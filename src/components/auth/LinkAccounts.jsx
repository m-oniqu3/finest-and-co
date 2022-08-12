import { EmailAuthProvider, linkWithCredential, unlink } from "firebase/auth";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase-config";
import styled from "./LinkAccounts.module.css";

const LinkAccounts = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //   await createAccount(email, password);

      const credential = EmailAuthProvider.credential(email, password);

      //link account
      linkWithCredential(auth.currentUser, credential).then((usercred) => {
        const user = usercred.user;
        console.log("Account linking success", user);
        //navigate to home
        navigate("/", { replace: true });
      });

      //   //unlink account
      //   unlink(auth?.currentUser, providerID)
      //     .then(() => {
      //       //remove provider from user
      //       console.log("Account unlinking success");
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form className={styled.form} onSubmit={handleSubmit}>
      <input type="email" onChange={handleEmail} />
      <input type="password" onChange={handlePassword} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default LinkAccounts;
