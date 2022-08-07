import React from "react";
import styled from "../wishlist/WishList.module.css";
import { useSelector } from "react-redux";
import SignInPrompt from "../auth/SignInPrompt";
import Container from "../helpers/wrapper/Container";
import Navbar from "../navbar/Navbar";
import Product from "../products/Product";
import Empty from "../helpers/ui/empty/Empty";

const WishList = () => {
  const { user } = useSelector((state) => state.auth);
  const { amountOfItemsInWishList, wishListItems } = useSelector(
    (state) => state.wishlist
  );

  if (!user?.id) return <SignInPrompt page="wishlist" />;

  let content;
  if (wishListItems) {
    content = (
      <>
        <h3>
          Wishlist <span>{amountOfItemsInWishList}</span>
        </h3>
        <div className={styled.wishlist}>
          {wishListItems?.map((product) => {
            return (
              <Product key={product.id} wishlist={true} product={product} />
            );
          })}
        </div>
      </>
    );
  }
  const emptyText =
    "Your wishlist is empty. Visit the shop and start adding items to your wishlist.";

  if (!wishListItems) {
    return (
      <Empty
        heading="Your wishlist is empty."
        text={emptyText}
        button="Start shopping"
        route="/shop"
      />
    );
  }

  return (
    <>
      <Navbar />
      <Container>{content}</Container>
    </>
  );
};

export default WishList;
