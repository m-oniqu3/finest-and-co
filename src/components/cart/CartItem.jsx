import React from "react";
import styled from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { increase, decrease } from "../../store/features/cart/cartSlice";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

function CartItem({ item }) {
  const dispatch = useDispatch();
  console.log(item);
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
              <AiOutlineMinus size="15" />
            </div>

            <p>{item.quantity}</p>

            <div onClick={increaseHandler}>
              <AiOutlinePlus size="15" />
            </div>
          </div>

          <p>x</p>

          <p>{nf.format(item.price)}</p>
        </div>

        <p className={styled.item__price}>{nf.format(item.productTotal)}</p>
      </article>
    </section>
  );
}

export default CartItem;
