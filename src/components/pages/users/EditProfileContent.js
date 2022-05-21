import {Button, TextField, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { KeyboardDatePicker, KeyboardDateTimePicker } from "@material-ui/pickers";
import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "../../../actions/user.action";
import "./UserProfileContent.scss";

const EditProfileContent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userProfile = useSelector((state) => state.user.userProfile);
  const error = useSelector((state) => state.user.error);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      dispatch(actions.getUserByJWT())
    }else {
      navigate("/login")
    }
  }, [])
  const handleDateChange = (date) => {
    setSelectedDate(date)
  };

  const onSave = () => {
    const requestBody = {
      phoneNumber: userProfile.phoneNumber,
      name: userProfile.name,
      idCard:userProfile.idCard,
      birthDay: selectedDate,
      avatar: userProfile.avatar,
      address: userProfile.address
    }
    dispatch(actions.onLoadingTrue())
    dispatch(actions.editProfileUser(requestBody,navigate))
  }

  return (
    <div id="userProfileContent">
      {userProfile && (
        <div className="input-container">
          <Typography variant="h6" textAlign="center">CHỈNH SỬA THÔNG TIN</Typography>
          <TextField id="name" label="Tên" className="text-field" fullWidth defaultValue={userProfile.name} onChange={(e) => userProfile.name=(e.target.value)}/>
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
          <TextField id="idcard" label="CMND/CCCD" className="text-field" fullWidth defaultValue={userProfile.idCard} onChange={(e) => userProfile.idCard = e.target.value}/>
          <TextField id="phonenumber" label="Số điện thoại" className="text-field"  fullWidth defaultValue={userProfile.phoneNumber} onChange={(e) => userProfile.phoneNumber = e.target.value}/>
          <TextField id="address" label="Địa chỉ" className="text-field" fullWidth defaultValue={userProfile.address} onChange={(e) => userProfile.address = e.target.value}/>
          <Button variant="contained" onClick={onSave}>Lưu</Button>
        </div>
      )}
      {error && (
        <Alert severity="error">Lỗi: {error}</Alert>
      )}
    </div>
  );
};

export default EditProfileContent;
