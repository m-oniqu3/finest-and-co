import React from "react";
import styled from "./Navbar.module.css";
import Container from "../helpers/wrapper/Container";
import { AiOutlineShopping } from "react-icons/ai";
import { CgHeart } from "react-icons/cg";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { amountOfItemsInCart } = useSelector((state) => state.cart);

  return (
    <div className={styled.nav}>
      <Container>
        <nav className={styled.nav__group}>
          <p className={styled.logo}>finest&co</p>

          <ul className={styled.nav__links}>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/shop">Shop</NavLink>
            </li>
          </ul>

          <ul className={styled.nav__icons}>
            <li>
              <NavLink to="/wishlist">
                <CgHeart size="22" color="var(--primary)" />
              </NavLink>
            </li>

            <li>
              <Link to="/cart">
                <AiOutlineShopping size="22" color="var(--primary)" />
              </Link>
              {amountOfItemsInCart > 0 && (
                <p className={styled.amount}>{amountOfItemsInCart}</p>
              )}
            </li>
          </ul>
        </nav>
      </Container>
    </div>
  );
};

export default Navbar;
