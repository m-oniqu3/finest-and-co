import React, { useEffect } from "react";
import styled from "../cart/Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { calculateTotal } from "../../store/features/cart/cartSlice";
import CartItem from "../cart/CartItem";
import { BsArrowLeft } from "react-icons/bs";
import Container from "../helpers/wrapper/Container";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nf = new Intl.NumberFormat("en-US");

  //get cartItems and total from the store
  const { cartItems, cartTotal } = useSelector((state) => state.cart);

  //calculate the total everytime the cartItems change
  useEffect(() => {
    dispatch(calculateTotal());
  }, [dispatch, cartItems]);

  // map over each item in cartItems from the store and return a CartItem
  const cart = cartItems.map((item) => {
    return <CartItem key={item.id} item={item} />;
  });

  const emptyCart = cartItems.length === 0;

  return (
    <section className={styled.cart__container}>
      <Container>
        <h4 className={styled.cart__heading}>
          Your Shopping Cart
          {emptyCart && <> is empty.</>}
        </h4>
        {emptyCart && <p>empty</p>}

        <div className={styled.cart__total}>
          <p className={styled.arrow}>
            <BsArrowLeft size="25" /> Back to Shop
          </p>

          <div>
            Total <span> ${nf.format(cartTotal)}</span>
          </div>
        </div>

        {cart}
      </Container>
    </section>
  );
};

export default Cart;
