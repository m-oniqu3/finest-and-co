import React from "react";
import styled from "./CartSummary.module.css";
import { useSelector } from "react-redux";

const CartSummary = () => {
  const {
    total: { finalTotal, tax, shipping, subTotal },
  } = useSelector((state) => state.cart);
  const nf = new Intl.NumberFormat("en-US");

  return (
    <article className={styled.summary}>
      <h3>Order Summary</h3>
      <div className={styled.summary__details}>
        <p>
          SubTotal
          <span>$ {nf.format(subTotal)}</span>
        </p>

        <p>
          Shipping
          <span>+$ {nf.format(shipping)}</span>
        </p>

        <p>
          Tax
          <span>+$ {nf.format(tax)}</span>
        </p>

        <p>
          Total
          <span>$ {nf.format(finalTotal)}</span>
        </p>
      </div>
    </article>
  );
};

export default CartSummary;
