import React, { useState } from "react";

import "./NewPassword.scss";
import {
  Input,
  InputAdornment,
  InputLabel,
  FormControl,
  IconButton,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import logo from "../../../../assets/T X T L.png";

const NewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((state) => !state);
  };

  const handleShowPasswordConfirm = () => {
    setShowPasswordConfirm((state) => !state);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div id="newPassword">
      <img src={logo} alt="logo" />
      <h2>KHÔI PHỤC MẬT KHẨU</h2>
      <div className="input-container">
        <FormControl className="text-field">
          <InputLabel htmlFor="password">Mật khẩu mới</InputLabel>
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
          />
        </FormControl>

        <FormControl className="text-field">
          <InputLabel htmlFor="password">Xác nhận mật khẩu</InputLabel>
          <Input
            id="password"
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
          />
        </FormControl>
      </div>
      <Button variant="contained" color="primary" className="btn">
        Xác nhận
      </Button>
    </div>
  );
};

export default NewPassword;
