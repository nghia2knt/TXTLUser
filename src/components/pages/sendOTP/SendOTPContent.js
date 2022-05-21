import React, { useEffect, useState } from "react";

import "./SendOTPContent.scss";
import {
  TextField,
} from "@material-ui/core";
import { Button } from "@material-ui/core";
import logo from "../../../assets/T X T L.png";
import * as actions from "../../../actions/user.action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SendOTPContent = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      navigate("/home")
    }

  }, [])

  const onSend = () => {
    const user = {
      email: email
    }
    dispatch(actions.onLoadingTrue())
    dispatch(actions.sendOTP(user))
  }


  return (
    <div id="sendOTPContent">
      <h2>GỬI MÃ XÁC THỰC</h2>
      <div className="input-container">
        <TextField id="email" label="Email" className="text-field" onChange={(e) => setEmail(e.target.value)}/>

      </div>

      <Button variant="contained" color="primary" className="btn" onClick={onSend}>
        Xác nhận
      </Button>
     
    </div>
  );
};

export default SendOTPContent;
