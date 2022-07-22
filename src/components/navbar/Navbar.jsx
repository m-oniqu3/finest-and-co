import React from "react";
import styled from "./Navbar.module.css";
import Container from "../helpers/wrapper/Container";
import { AiOutlineShopping } from "react-icons/ai";
import { CgHeart } from "react-icons/cg";
import { NavLink } from "react-router-dom";

const Navbar = () => {
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

          <div className={styled.nav__icons}>
            <CgHeart size="22" color="var(--primary)" />
            <AiOutlineShopping size="24" color="var(--primary)" />
          </div>
        </nav>
      </Container>
    </div>
  );
};

export default Navbar;
