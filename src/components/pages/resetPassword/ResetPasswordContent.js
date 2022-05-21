import React, { useEffect, useState } from "react";

import "./ResetPasswordContent.scss";
import {
  TextField,
  Input,
  InputAdornment,
  InputLabel,
  FormControl,
  IconButton,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import logo from "../../../assets/T X T L.png";
import * as actions from "../../../actions/user.action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ResetPasswordContent = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRePassword] = useState('')
 


  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      navigate("/home")
    }


  }, [])

  const handleShowPassword = () => {
    setShowPassword((state) => !state);
  };

  const handleShowPasswordConfirm = () => {
    setShowPasswordConfirm((state) => !state);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const onSubmit = () => {
    const user = {
      email: localStorage.getItem('email-otp'),
      otp: otp,
      newPassword: password
    }
    dispatch(actions.onLoadingTrue())
    dispatch(actions.resetPassword(user))
  }


  return (
    <div id="resetPasswordContent">
      <h2>ĐẶT LẠI MẬT KHẨU</h2>
      <h4>Tài khoản: {localStorage.getItem('email-otp')}</h4>

      <div className="input-container">
        <TextField id="otp" label="OTP" className="text-field" onChange={(e) => setOtp(e.target.value)}/>
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

        <FormControl className="text-field">
          <InputLabel htmlFor="passwordConfirm">Xác nhận mật khẩu</InputLabel>
          <Input
            id="passwordConfirm"
            type={showPasswordConfirm ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowPasswordConfirm}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            onChange={(e) => setRePassword(e.target.value)}

          />
        </FormControl>

       
      </div>

      <Button variant="contained" color="primary" className="btn" onClick={onSubmit}>
        Xác nhận
      </Button>
     
    </div>
  );
};

export default ResetPasswordContent;
