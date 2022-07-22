import React from "react";
import styled from "./Navbar.module.css";
import Container from "../helpers/wrapper/Container";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  return (
    <div className={styled.nav}>
      <Container>
        <nav className={styled.nav__group}>
          <p className={styled.logo}>finest&co</p>
          <GiHamburgerMenu size="22" color="var(--primary)" />
        </nav>
      </Container>
    </div>
  );
};

export default Navbar;
