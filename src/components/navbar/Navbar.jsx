import React, { useEffect, useState } from "react";
import styled from "./Navbar.module.css";
import Container from "../helpers/wrapper/Container";
import { AiOutlineUser } from "react-icons/ai";
import { RiMenuLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import Menu from "./Menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  //if isOpen is true, prevent scrolling on body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else if (!isOpen) {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  //function to change isOpen state
  const handleMenu = () => setIsOpen((state) => !state);

  return (
    <>
      <div className={styled.nav}>
        <Container>
          <nav className={styled.nav__group}>
            <p className="logo">finest&co</p>

            <ul className={styled.nav__icons}>
              <li>
                <NavLink to="/">
                  <AiOutlineUser size="22" color="var(--primary)" />
                </NavLink>
              </li>

              <li onClick={handleMenu}>
                <RiMenuLine size="22" color="var(--primary)" />
              </li>
            </ul>
          </nav>
        </Container>
      </div>
      {isOpen && <Menu setIsOpen={setIsOpen} />}
    </>
  );
};

export default Navbar;
