import React from "react";
import styled from "./Navbar.module.css";
import Container from "../helpers/wrapper/Container";
import { AiOutlineShopping, AiOutlineUser } from "react-icons/ai";
import { RiMenuLine } from "react-icons/ri";
import { CgHeart } from "react-icons/cg";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={styled.nav}>
      <Container>
        <nav className={styled.nav__group}>
          <p className={styled.logo}>finest&co</p>

          <ul className={styled.nav__icons}>
            <li>
              <NavLink to="/">
                <AiOutlineUser size="22" color="var(--primary)" />
              </NavLink>
            </li>

            <li>
              <NavLink to="/">
                <RiMenuLine size="22" color="var(--primary)" />
              </NavLink>
            </li>
          </ul>
        </nav>
      </Container>
    </div>
  );
};

export default Navbar;
