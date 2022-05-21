import React, { useState } from "react";

import "./ActiveContent.scss";
import {
  TextField,
} from "@material-ui/core";
import { Button } from "@material-ui/core";
import logo from "../../../assets/T X T L.png";
import * as actions from "../../../actions/user.action";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@material-ui/lab";

const ActiveContent = () => {
  const dispatch = useDispatch()
  const [otpinput, setOtpinput] = useState('');
  const error = useSelector((state) => state.user.error);

  const onSubmit = () => {
    const otp = {
      email: localStorage.getItem('email-register'),
      otp: otpinput
    }
    dispatch(actions.onLoadingTrue())
    dispatch(actions.active(otp))
  }


  return (
    <div id="activeContent">
      <h2>KÍCH HOẠT TÀI KHOẢN</h2>
      <div className="input-container">
        <TextField id="otp" label="OTP" className="text-field" onChange={(e) => setOtpinput(e.target.value)}/>
      </div>

      <Button variant="contained" color="primary" className="btn" onClick={onSubmit}>
        Kích hoạt
      </Button>
      {error && (
        <Alert severity="error">Lỗi: {error}</Alert>
      )}
    </div>
  );
};

export default ActiveContent;
