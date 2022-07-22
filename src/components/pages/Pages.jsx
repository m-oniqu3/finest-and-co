import React from "react";
import Navbar from "../navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Shop from "./Shop";

const Pages = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </div>
  );
};

export default Pages;
