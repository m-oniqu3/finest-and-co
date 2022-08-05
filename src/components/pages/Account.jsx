import React, { useState } from "react";
import styled from "../auth/Account.module.css";
import SignIn from "../auth/SignIn";
import Navbar from "../navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Button from "../helpers/ui/button/Button";
import { logOut } from "../firebase/firebase-config";
import Loading from "../helpers/loading/Loading";
import { setUser } from "../../store/features/user/authSlice";
import useAuth from "../../hooks/useAuth";

const Account = () => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();
  const dispatch = useDispatch();
  console.log(user);
  console.log(currentUser);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logOut();
      dispatch(setUser(null));
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  if (loading) return <Loading />;

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
        {!user ? (
          <SignIn />
        ) : (
          <h1>
            Welcome {user?.displayName ?? "guest"}
            <Button className="primary" onClick={handleLogout}>
              Logout
            </Button>
          </h1>
        )}
      </div>
    </section>
  );
};

export default Account;
