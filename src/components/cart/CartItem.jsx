import React from "react";
import styled from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { increase, decrease } from "../../store/features/cart/cartSlice";
import { BsPlusCircleFill } from "react-icons/bs";
import { AiFillMinusCircle } from "react-icons/ai";

function CartItem({ item }) {
  const dispatch = useDispatch();

  //dispatch the increase and decrease action
  const increaseHandler = () => dispatch(increase(item));
  const decreaseHandler = () => dispatch(decrease(item));

  //formats number
  const nf = new Intl.NumberFormat("en-US");

  return (
    <section key={item.id} className={styled.item}>
      <article className={styled.item__content}>
        <figure className={styled.item__image}>
          <img src={item.image} alt={item.name} />
        </figure>

        <div className={styled.item__caption}>
          <h4>{item.name}</h4>
          <p>$ {nf.format(item.price)}</p>
        </div>

        <div className={styled.total__group}>
          <div className={styled["item__quantity-group"]}>
            <div onClick={increaseHandler}>
              <BsPlusCircleFill color="var(--secondary-neutral)" size="20" />
            </div>

            <p>{item.quantity}</p>

            <div onClick={decreaseHandler}>
              <AiFillMinusCircle color="var(--secondary-neutral)" size="22" />
            </div>
          </div>

          <p>${nf.format(item.productTotal)}</p>
        </div>
      </article>
    </section>
  );
}

export default CartItem;
