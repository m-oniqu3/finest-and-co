import React, { useEffect } from "react";
import styled from "../cart/Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { calculateTotal } from "../../store/features/cart/cartSlice";
import CartItem from "../cart/CartItem";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import Container from "../helpers/wrapper/Container";
import CartSummary from "../cart/CartSummary";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //get cartItems
  const { cartItems } = useSelector((state) => state.cart);

  //calculate the total everytime the cartItems change
  useEffect(() => {
    dispatch(calculateTotal());
  }, [dispatch, cartItems]);

  const handlePrevious = () => navigate(-1);

  // map over each item in cartItems from the store and return a CartItem
  const cart = cartItems.map((item) => {
    return <CartItem key={item.id} item={item} />;
  });

  const emptyCart = cartItems.length === 0;

  return (
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

        {emptyCart && <p>empty</p>}
        {cart}
        <CartSummary />
      </Container>
    </section>
  );
};

export default Cart;
