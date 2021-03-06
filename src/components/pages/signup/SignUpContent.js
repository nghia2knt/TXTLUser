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
      <h2>????NG K??</h2>
      <div className="input-container">
        <TextField id="email" label="Email" className="text-field" onChange={(e) => setEmail(e.target.value)}/>
        <FormControl className="text-field">
          <InputLabel htmlFor="password">M???t kh???u</InputLabel>
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
          <InputLabel htmlFor="passwordConfirm">X??c nh???n m???t kh???u</InputLabel>
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
        <TextField id="Name" label="H??? v?? t??n" className="text-field" onChange={(e) => setName(e.target.value)}/>

        <KeyboardDatePicker
          id="date-picker-dialog"
          label="Ng??y sinh"
          format="dd-MM-yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          className="text-field"
          invalidDateMessage="Ng??y sai ?????nh d???ng"
        />

        <TextField id="phone" label="S??? ??i???n tho???i" className="text-field" onChange={(e) => setPhoneNumber(e.target.value)}/>

        <TextField id="address" label="?????a ch???" className="text-field" onChange={(e) => setAddress(e.target.value)}/>

        <TextField id="identify" label="CMND/CCCD" className="text-field" onChange={(e) => setIdCard(e.target.value)}/>

       
      </div>

      <Button variant="contained" color="primary" className="btn" onClick={onSignUp} disabled={disabled}>
        ????ng K??
      </Button>
      <p className="login-link">
        B???n ???? c?? t??i kho???n?<a href="/login"> ????ng nh???p ngay </a>
      </p>
      {error && (
        <Alert severity="error">L???i: {error}</Alert>
      )}
    </div>
  );
};

export default SignUpContent;
