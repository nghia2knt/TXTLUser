import React from "react";

import "./ValidateCode.scss";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import logo from "../../../../assets/T X T L.png";

const ValidateCode = () => {
  return (
    <div id="validateCode">
      <img src={logo} alt="logo" />
      <h2>XÁC NHẬN MÃ OTP</h2>
      <div className="note">
        Chúng tôi đã gửi mã xác nhận OTP đến email của bạn -
        h2222222222222@gmail.com
      </div>
      <div className="input-container">
        <TextField id="otp" label="OTP" className="text-field" />
      </div>
      <Button variant="contained" color="primary" className="btn">
        Xác nhận
      </Button>
      <p className="resend">Bạn chưa nhận được mã OTP ?</p>
      <p className="resend-text"> Gửi Lại </p>
    </div>
  );
};

export default ValidateCode;
