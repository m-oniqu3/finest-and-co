import React, { useEffect } from "react";
import styled from "../cart/Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotal } from "../../store/features/cart/cartSlice";
import CartItem from "../cart/CartItem";
import Container from "../helpers/wrapper/Container";
import CartSummary from "../cart/CartSummary";
import Empty from "../helpers/ui/empty/Empty";
import Navbar from "../navbar/Navbar";
import SignInPrompt from "../auth/SignInPrompt";

const Cart = () => {
  const dispatch = useDispatch();

  //get cartItems
  const { cartItems, amountOfItemsInCart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  //calculate the total everytime the cartItems change
  useEffect(() => {
    dispatch(calculateTotal());
  }, [dispatch, cartItems]);

  // map over each item in cartItems from the store and return a CartItem with the item info
  const cart = cartItems.map((item) => {
    return <CartItem key={item.id} item={item} />;
  });

  const emptyCart = cartItems.length === 0;
  const emptyText =
    "Your cart is empty, but we can fix that. Visit the shop and start adding items to your cart.";

  //if the user is not logged in, show the sign in prompt
  if (!user?.id) return <SignInPrompt page="cart" />;

  return (
    <div>
      <Navbar />

      {/* if empty show empty message */}
      {emptyCart ? (
        <div className={styled.cart__empty}>
          <Empty
            heading="Your cart is empty."
            text={emptyText}
            button="Start shopping"
            route="/shop"
          />
        </div>
      ) : (
        <section className={styled.cart__container}>
          <Container>
            <div className={styled.cart}>
              <div>
                <h3 className={styled.cart__heading}>
                  Order Details <span>{amountOfItemsInCart} items</span>
                </h3>
                {cart}
              </div>
              {/* only show cart summary if the cart is not empty */}
              <div className={styled.cart__summary}>
                {!emptyCart && <CartSummary />}
              </div>
            </div>
          </Container>
        </section>
      )}
    </div>
  );
};

export default Cart;
