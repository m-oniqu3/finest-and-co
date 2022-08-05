import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Container from "../wrapper/Container";
import styled from "./Modal.module.css";

const Modal = (props) => {
  const { children, setOpenModal, openModal } = props;

  //if openModal is true, prevent scrolling on body
  useEffect(() => {
    if (openModal === true) {
      document.body.style.overflow = "hidden";
    }

    return () => (document.body.style.overflow = "unset");
  }, [openModal]);

  //close modal when user clicks outside of modal
  const handleClose = () => setOpenModal((state) => !state);

  //stop event propagation to prevent closing modal when user clicks inside modal */
  const handleEvent = (e) => e.stopPropagation();

  return ReactDOM.createPortal(
    <div className={styled.modal__background} onClick={handleClose}>
      <Container>
        <div onClick={(e) => handleEvent(e)}>{children}</div>
      </Container>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
