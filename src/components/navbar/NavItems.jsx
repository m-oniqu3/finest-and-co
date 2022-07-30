import React from "react";
import styled from "./NavItems.module.css";
import { NavLink } from "react-router-dom";

const NavItems = () => {
  return (
    <ul className={styled.items}>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/shop">Shop</NavLink>
      </li>
    </ul>
  );
};

export default NavItems;
