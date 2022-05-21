import React from "react";

import "./EmailForgot.scss";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import logo from "../../../../assets/T X T L.png";

const EmailForgot = () => {
  return (
    <div id="emailForgot">
      <img src={logo} alt="logo" />
      <h2>QUÊN MẬt KHẨU</h2>
      <p className="note">
        Bạn hãy điền email mà bạn đã sử dụng để đăng ký tài khoản. Bạn sẽ nhận
        được mã OTP để khôi phục lại mật khẩu
      </p>
      <div className="input-container">
        <TextField id="email" label="Email" className="text-field" />
      </div>
      <Button variant="contained" color="primary" className="btn">
        Gửi Mã
      </Button>
      <p className="login-link">
        Bạn đã nhớ mật khẩu?<a href="/login"> Đăng nhập ngay </a>
      </p>
    </div>
  );
};

export default EmailForgot;
