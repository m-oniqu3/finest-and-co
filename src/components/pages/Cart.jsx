import React, { useEffect } from "react";
import styled from "../cart/Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { calculateTotal } from "../../store/features/cart/cartSlice";
import CartItem from "../cart/CartItem";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Container from "../helpers/wrapper/Container";
import CartSummary from "../cart/CartSummary";
import Empty from "../helpers/ui/empty/Empty";
import Navbar from "../navbar/Navbar";
import SignInPrompt from "../auth/SignInPrompt";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //get cartItems
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  //calculate the total everytime the cartItems change
  useEffect(() => {
    dispatch(calculateTotal());
  }, [dispatch, cartItems]);

  //navigate to the previous page
  const handlePrevious = () => navigate(-1);

  // map over each item in cartItems from the store and return a CartItem with the item info
  const cart = cartItems.map((item) => {
    return <CartItem key={item.id} item={item} />;
  });

  const emptyCart = cartItems.length === 0;
  const emptyText =
    "Your cart is empty, but we can fix that. Visit the shop and start adding items to your cart.";

  if (!user?.id) return <SignInPrompt page="cart" />;

  return (
    <div>
      <Navbar />
      <section className={styled.cart__container}>
        <Container>
          <div className={styled.cart__heading}>
            <span onClick={handlePrevious}>
              <IoIosArrowDropleftCircle
                size="25"
                color="var(--secondary-neutral)"
              />
            </span>
            <h4>Your Shopping Cart</h4>
          </div>

          {/* if cart is empty then show message else show the cartitems */}
          {emptyCart ? (
            <Empty
              heading="Your cart is empty."
              text={emptyText}
              button="Start shopping"
              route="/shop"
            />
          ) : (
            cart
          )}

          {/* only show cart summary if the cart is not empty */}
          {!emptyCart && <CartSummary />}
        </Container>
      </section>
    </div>
  );
};

export default Cart;
