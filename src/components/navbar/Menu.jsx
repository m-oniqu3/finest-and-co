import React from "react";
import styled from "./Menu.module.css";
import Container from "../helpers/wrapper/Container";
import { VscClose } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";

const Menu = (props) => {
  const handleClose = () => props.setIsOpen((state) => !state);

  return (
    <div className={styled.menu}>
      <Container>
        <div className={styled.menu__header}>
          <p className="logo">finest&co</p>

          <div className={styled.menu__icons}>
            <span>
              <AiOutlineUser size="22" color="var(--primary)" />
            </span>
            <span onClick={handleClose}>
              <VscClose size="28" color="var(--primary)" />
            </span>
          </div>
        </div>

        <ul className={styled.menu__list}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/wishlist">Wishlist</Link>
          </li>
        </ul>
      </Container>
    </div>
  );
};

export default Menu;
