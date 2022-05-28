import React from "react";
import { useSelector } from "react-redux";
import CarInfoContent from "../../components/pages/carInfo/CarInfoContent";
import "./CarInfo.scss";

const CarInfo = () => {
  return <div id="carInfo">
      <CarInfoContent></CarInfoContent>
    </div>;
};

export default CarInfo;
