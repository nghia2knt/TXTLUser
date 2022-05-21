import React from "react";
import { useSelector } from "react-redux";
import ListContent from "../../components/pages/home/ListContent";
import SearchContent from "../../components/pages/home/SearchContent";
import "./ListCars.scss";

const ListCars = () => {
  return <div id="listCars">
    <SearchContent/>
    <ListContent></ListContent>
    </div>;
};

export default ListCars;
