import React from "react";
import styled from "./CartSummary.module.css";
import { useSelector } from "react-redux";
import Button from "../helpers/ui/button/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartSummary = () => {
  const navigate = useNavigate();
  //get cart details from the store
  const {
    total: { finalTotal, tax, shipping, subTotal },
  } = useSelector((state) => state.cart);

  //format the numbers
  const nf = new Intl.NumberFormat("en-US");

  //navigate to the shop page
  const handleShop = () => navigate("/shop");

  const notify = () => toast.success("Order placed successfully");

  // checkout
  const handleCheckout = () => notify();

  return (
    <article className={styled.summary}>
      <h3>Order Summary</h3>
      <div className={styled.summary__details}>
        <p>
          SubTotal
          <span>{nf.format(subTotal)}</span>
        </p>

        <p>
          Shipping
          <span>{nf.format(shipping)}</span>
        </p>

        <p>
          Tax
          <span>{nf.format(tax)}</span>
        </p>
      </div>

      <p className={styled.summary__total}>
        Total
        <span>${nf.format(finalTotal)}</span>
      </p>

      <div className={styled.summary__btns}>
        <Button className="secondary" onClick={handleShop}>
          Continue Shopping
        </Button>
        <Button onClick={handleCheckout} className="primary">
          Checkout
        </Button>
      </div>
    </article>
  );
};

export default CartSummary;
