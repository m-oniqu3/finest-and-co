import React, { useEffect, useState } from "react";
import styled from "./Navbar.module.css";
import Container from "../helpers/wrapper/Container";
import { AiOutlineUser } from "react-icons/ai";
import { RiMenuLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import Menu from "./Menu";
import NavItems from "./NavItems";
import { IoCartOutline } from "react-icons/io5";
import { CgHeart } from "react-icons/cg";
import { useSelector } from "react-redux";
import Logout from "../auth/Logout";
import Modal from "../helpers/modal/Modal";

const Navbar = (props) => {
  const { user } = useSelector((state) => state.auth);
  const { amountOfItemsInCart } = useSelector((state) => state.cart);
  const { amountOfItemsInWishList } = useSelector((state) => state.wishlist);
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { light } = props;

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

  //change color of navbar depending on light prop
  const color = light ? "var(--primary-light)" : "var(--primary)";

  //when user is logged in, show logout modal else navigate to account page
  const handleAccount = () => {
    if (!user.id) navigate("/account");
    else setOpenModal((state) => !state);
  };

  const handleHome = () => navigate("/");

  return (
    <>
      <div className={styled.nav}>
        <Container>
          <nav className={styled.nav__group}>
            <p
              className="logo"
              style={{ color: `${color}` }}
              onClick={handleHome}
            >
              finest&co
            </p>

            <div className={styled.nav__items}>
              <NavItems color={color} />
            </div>

            <ul className={styled.nav__icons}>
              <li onClick={handleAccount}>
                <AiOutlineUser size="22" color={color} />
              </li>

              <li onClick={handleMenu} className={styled.nav__menu}>
                <RiMenuLine size="22" color={color} />
              </li>

              <div className={styled.nav__shop__icons}>
                <li>
                  <NavLink to="/wishlist">
                    <CgHeart size="22" color={color} />
                  </NavLink>

                  {/* show amount of items if it is not null and if user exists */}
                  {!!amountOfItemsInWishList && user?.id && (
                    <span className={styled.nav__amount}>
                      {amountOfItemsInWishList}
                    </span>
                  )}
                </li>
                <li>
                  <NavLink to="/cart">
                    <IoCartOutline size="25" color={color} />
                  </NavLink>

                  {/* show amount of items if it is not null and if user exists */}
                  {!!amountOfItemsInCart && user?.id && (
                    <span className={styled.nav__amount}>
                      {amountOfItemsInCart}
                    </span>
                  )}
                </li>
              </div>
            </ul>
          </nav>
        </Container>
      </div>

      {/* open mobile Menu */}
      {isOpen && <Menu setIsOpen={setIsOpen} />}

      {/* open modal */}
      {openModal && (
        <Modal setOpenModal={setOpenModal} openModal={openModal}>
          <Logout setOpenModal={setOpenModal} />
        </Modal>
      )}
    </>
  );
};

export default Navbar;
