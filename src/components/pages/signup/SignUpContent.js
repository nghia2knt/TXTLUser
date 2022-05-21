import React, { useEffect, useState } from "react";

import "./SignUpContent.scss";
import {
  TextField,
  Input,
  InputAdornment,
  InputLabel,
  FormControl,
  IconButton,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Error, Visibility, VisibilityOff } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import logo from "../../../assets/T X T L.png";
import * as actions from "../../../actions/user.action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert } from "@material-ui/lab";



const SignUpContent = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRePassword] = useState('')
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [idCard, setIdCard] = useState('')
  const [disabled,setDisabled] = useState(false)
  const error = useSelector((state) => state.user.error);


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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const onSignUp = () => {
    
    const userSignUp = {
      email: email,
      password: password,
      phoneNumber:phoneNumber,
      name:name,
      idCard:idCard,
      birthDay:selectedDate,
      address: address
    }
    dispatch(actions.onLoadingTrue())
    dispatch(actions.register(userSignUp))
  }


  return (
    <div id="signUpContent">
     
      <img src={logo} alt="logo" />
      <h2>ĐĂNG KÝ</h2>
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
        <TextField id="Name" label="Họ và tên" className="text-field" onChange={(e) => setName(e.target.value)}/>

        <KeyboardDatePicker
          id="date-picker-dialog"
          label="Ngày sinh"
          format="dd-MM-yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          className="text-field"
          invalidDateMessage="Ngày sai định dạng"
        />

        <TextField id="phone" label="Số điện thoại" className="text-field" onChange={(e) => setPhoneNumber(e.target.value)}/>

        <TextField id="address" label="Địa chỉ" className="text-field" onChange={(e) => setAddress(e.target.value)}/>

        <TextField id="identify" label="CMND/CCCD" className="text-field" onChange={(e) => setIdCard(e.target.value)}/>

       
      </div>

      <Button variant="contained" color="primary" className="btn" onClick={onSignUp} disabled={disabled}>
        Đăng Ký
      </Button>
      <p className="login-link">
        Bạn đã có tài khoản?<a href="/login"> Đăng nhập ngay </a>
      </p>
      {error && (
        <Alert severity="error">Lỗi: {error}</Alert>
      )}
    </div>
  );
};

export default SignUpContent;
