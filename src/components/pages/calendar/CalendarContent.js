import { Avatar, Button, IconButton, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "../../../actions/user.action";
import "./CalendarContent.scss";
import Calendar from 'react-calendar';



const CalendarContent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userProfile = useSelector((state) => state.user.userProfile);

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      dispatch(actions.getUserByJWT())
    }else {
      navigate("/login")
    }
  }, [])

  return (
    <div id="calendarContent">
      {userProfile && (
           <div style={{ height: 700 }}>
             <Typography variant="h6" gutterBottom>
              THÔNG TIN LịCH ĐẶT
            </Typography>
           <Calendar
             value={new Date(2022, 7, 1)}
           />
         </div>
       
      )}
    </div>
  );
};

export default CalendarContent;
