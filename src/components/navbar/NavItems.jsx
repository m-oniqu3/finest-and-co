import React from "react";
import styled from "./NavItems.module.css";
import { NavLink } from "react-router-dom";

const NavItems = (props) => {
  const { color } = props;
  return (
    <ul className={styled.items}>
      <li>
        <NavLink to="/" style={{ color: `${color}` }}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/shop" style={{ color: `${color}` }}>
          Shop
        </NavLink>
      </li>
    </ul>
  );
};

export default NavItems;
