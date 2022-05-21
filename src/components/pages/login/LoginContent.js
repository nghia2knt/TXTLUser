import React, { useEffect, useState } from "react";

import "./LoginContent.scss";
import {
  TextField,
  Input,
  InputAdornment,
  InputLabel,
  FormControl,
  IconButton,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import logo from "../../../assets/T X T L.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "../../../actions/user.action";
import { Alert } from "@material-ui/lab";


const LoginContent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user);
  const error = useSelector((state) => state.user.error);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      navigate("/home")
    }
  }, [])
  const onLogin = () => {
    const userLogin = {
      email: email,
      password: password
    }
    dispatch(actions.onLoadingTrue())
    dispatch(actions.login(userLogin))
  }


  const handleShowPassword = () => {
    setShowPassword((state) => !state);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div id="loginContent">
      <img src={logo} alt="logo" />
      <h2>ĐĂNG NHẬP</h2>
      <div className="input-container">
        <TextField id="email" label="Email" className="text-field" onChange={(e) => setEmail(e.target.value)}/>
        <FormControl className="text-field">
          <InputLabel htmlFor="password">Mật khẩu</InputLabel>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <div className="link-container">
          <a href="/send-otp">Quên mật khẩu? </a>
        </div>
      </div>
      <Button variant="contained" color="primary" className="btn" onClick={onLogin}>
        Đăng Nhập
      </Button>
      <p className="signup-link">
        Bạn chưa có tài khoản?<a href="/signup"> Đăng ký ngay </a>
      </p>
      {error && (
        <Alert severity="error">Lỗi: {error}</Alert>
      )}
    </div>
  );
};

export default LoginContent;
