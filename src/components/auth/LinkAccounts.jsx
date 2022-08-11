import { EmailAuthProvider, linkWithCredential } from "firebase/auth";
import React, { useState } from "react";
import { auth, createAccount } from "../firebase/firebase-config";
import styled from "./LinkAccounts.module.css";

const LinkAccounts = () => {
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
      });
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
