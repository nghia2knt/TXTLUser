import React from "react";
import { Outlet } from "react-router-dom";

import "./MainLayout.scss";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet />
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
