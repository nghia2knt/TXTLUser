import {Button, TextField, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "../../../actions/user.action";
import "./UserProfileContent.scss";

const ChangePasswordContent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [reNewPassword, setReNewPassword] = useState('')
  const userProfile = useSelector((state) => state.user.userProfile);
  const error = useSelector((state) => state.user.error);
  const [errorInfo, setErrorInfo] = useState(error)

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      dispatch(actions.getUserByJWT())
    }else {
      navigate("/login")
    }
    if (error) {
      setErrorInfo(error)
    }
  }, [])

  const onSave = () => {
    if (newPassword != reNewPassword) {
      setErrorInfo("Mật khẩu mới và mật khẩu nhập lại không khớp")
    } else {
      const requestBody = {
        oldPassword: oldPassword,
        newPassword: newPassword
      }
      dispatch(actions.onLoadingTrue())
      dispatch(actions.changePassword(requestBody,navigate))
    }
  }

  return (
    <div id="userProfileContent">
      {userProfile && (
        <div className="input-container">
          <Typography variant="h6">THAY ĐỔI MẬT KHẤU</Typography>
          <TextField id="old-password" label="Mật khẩu cũ" className="text-field" fullWidth defaultValue={oldPassword} onChange={(e) => {setOldPassword(e.target.value)}}/>
          <TextField id="new-password" label="Mật khẩu mới" className="text-field" fullWidth defaultValue={newPassword} onChange={(e) => {setNewPassword(e.target.value)}}/>
          <TextField id="re-new-password" label="Nhập lại mật khẩu mới" className="text-field" fullWidth defaultValue={reNewPassword} onChange={(e) => {setReNewPassword(e.target.value)}}/>
          <Button variant="contained" onClick={onSave}>Lưu</Button>
        </div>
      )}
       {errorInfo && (
        <Alert severity="error">Lỗi: {errorInfo}</Alert>
      )}
    </div>
  );
};

export default ChangePasswordContent;
