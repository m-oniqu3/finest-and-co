import React from "react";
import styled from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { increase, decrease } from "../../store/features/cart/cartSlice";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

function CartItem({ item }) {
  const dispatch = useDispatch();

  //dispatch the increase and decrease action
  const increaseHandler = () => dispatch(increase(item));
  const decreaseHandler = () => dispatch(decrease(item));

  //formats number
  const nf = new Intl.NumberFormat("en-US");

  return (
    <section key={item.id} className={styled.item}>
      <figure className={styled.item__image}>
        <img src={item.image} alt={item.name} />
      </figure>

      <article className={styled.item__content}>
        <h4 className={styled.item__name}>{item.name}</h4>

        <div className={styled.item__calculate}>
          <div className={styled["item__quantity-group"]}>
            <div onClick={decreaseHandler}>
              <AiFillMinusCircle color="#b5b5b5" size="25" />
            </div>

            <p>{item.quantity}</p>

            <div onClick={increaseHandler}>
              <AiFillPlusCircle color="#b5b5b5" size="25" />
            </div>
          </div>

          <p>x</p>

          <p>${nf.format(item.price)}</p>
        </div>

        <p className={styled.item__price}>${nf.format(item.productTotal)}</p>
      </article>
    </section>
  );
}

export default CartItem;
