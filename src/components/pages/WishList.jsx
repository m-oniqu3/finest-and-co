import React from "react";
import { useSelector } from "react-redux";
import SignInPrompt from "../auth/SignInPrompt";
import Navbar from "../navbar/Navbar";

const WishList = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user?.id) return <SignInPrompt page="wishlist" />;

  return (
    <div>
      <Navbar />
      WishList
    </div>
  );
};

export default WishList;
