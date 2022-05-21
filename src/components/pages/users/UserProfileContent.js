import { Avatar, Button, IconButton, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "../../../actions/user.action";
import "./UserProfileContent.scss";

const UserProfileContent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userProfile = useSelector((state) => state.user.userProfile);

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      dispatch(actions.getUserByJWT())
    }else {
      navigate("/login")
    }
  }, [])

  const onChangeAvatar = (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    console.log(formData)
    dispatch(actions.onLoadingTrue())
    dispatch(actions.changeAvatar(formData))
  };

  const onEdit = () => {
    navigate("/user-profile/edit");
  };

  return (
    <div id="userProfileContent">
      {userProfile && (
        <div className="input-container">
          <Typography variant="h6" textAlign="center">THÔNG TIN CÁ NHÂN</Typography>
          <IconButton variant="contained" component="label">
            <Avatar  style={{ width: 150, height: 150 }} alt="user-avatar" src={userProfile.avatar}>Ảnh</Avatar>
            <input type="file" hidden accept=".jpg, .jpeg, .png, .gif" onChange={onChangeAvatar}/>
          </IconButton>
          <TextField id="name" label="Tên" className="text-field" fullWidth value={userProfile.name}/>
          <TextField id="email" label="Email" className="text-field" fullWidth value={userProfile.email}/>
          <TextField id="birthday" label="Ngày sinh" className="text-field" fullWidth value={userProfile.birthDay}/>
          <TextField id="idcard" label="CMND/CCCD" className="text-field" fullWidth value={userProfile.idCard}/>
          <TextField id="phonenumber" label="Số điện thoại" className="text-field"  fullWidth value={userProfile.phoneNumber}/>
          <TextField id="address" label="Địa chỉ" className="text-field" fullWidth value={userProfile.address}/>
          <Button variant="contained" onClick={onEdit}>Chỉnh sửa thông tin</Button>
        </div>
     
      )}
    </div>
  );
};

export default UserProfileContent;
