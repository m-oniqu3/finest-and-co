import React from "react";
import styled from "../auth/Account.module.css";
import SignIn from "../auth/SignIn";
import Navbar from "../navbar/Navbar";

const Account = () => {
  return (
    <section className={styled.account}>
      <Navbar />
      <figure className={styled.account__image}>
        <img
          src="https://images.pexels.com/photos/7828701/pexels-photo-7828701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="A black lamp on a grey background"
        />
      </figure>
      <div className={styled.account__group}>
        <SignIn />
      </div>
    </section>
  );
};

export default Account;
