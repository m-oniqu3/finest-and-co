import React, { useState } from "react";
import styled from "./Logout.module.css";
import Button from "../helpers/ui/button/Button";
import { HiLogout } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../firebase/firebase-config";
import { setUser } from "../../store/features/user/authSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../helpers/loading/Loading";
import { IoCloseSharp } from "react-icons/io5";
import LinkAccounts from "./LinkAccounts";
import Modal from "../helpers/modal/Modal";

const Logout = (props) => {
  const { setOpenModal } = props;
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [openSignInModal, setOpenSignInModal] = useState(false);
  const navigate = useNavigate();

  //logout user
  const handleLogout = async () => {
    setLoading(true);

    try {
      await logOut();
      dispatch(setUser(null));
      navigate("/", { replace: true });
    } catch (error) {
      alert(error.message);
    }

    setLoading(false);
  };

  //open sign in modal
  const handleModal = () => setOpenSignInModal((state) => !state);

  //close modal
  const handleCancel = () => setOpenModal((state) => !state);

  //dynamic text
  const text = user?.isAnonymous
    ? "You are using a guest acount. If you logout now, all your data will be lost."
    : "Leaving so soon?";

  if (loading) return <Loading />;

  return (
    <>
      <section className={styled.logout}>
        <div className={styled.close} onClick={handleCancel}>
          <IoCloseSharp size={25} />
        </div>

        <div className={styled.logout__icon}>
          <HiLogout size={25} />
        </div>

        <article>
          <h1 className={styled.logout__heading}>
            Are you sure you want to logout?
          </h1>
          <p className={`text ${styled.logout__text}`}>{text}</p>

          {user?.isAnonymous && (
            <p
              className={`text ${styled.logout__transfer}`}
              onClick={handleModal}
            >
              I want to save my data
            </p>
          )}

          <div className={styled.logout__btns}>
            <Button className="primary" onClick={handleLogout}>
              Logout
            </Button>
            <Button className="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </article>
      </section>

      {openSignInModal && (
        <Modal openModal={openSignInModal}>
          <LinkAccounts />
        </Modal>
      )}
    </>
  );
};

export default Logout;
