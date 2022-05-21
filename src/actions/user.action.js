import { useNavigate } from "react-router-dom";
import apiService from "../services/api.service";
export const ACTION_TYPES = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  ACTIVE: "ACTIVE",
  GET_USER_JWT: "GET_USER_JWT",
  EDIT_PROFILE_USER: "EDIT_PROFILE_USER",
  CHANGE_AVATAR: "CHANGE_AVATAR",
  CHANGE_PASSWORD: "CHANGE_PASSWORD",
  SENDOTP: "SENDOTP",
  RESET_PASSWORD: "RESET_PASSWORD",
  LOADING_TRUE: "LOADING_TRUE",
  LOADING_FALSE: "LOADING_FALSE",
};

export const login = (user) => (dispatch) => {
  apiService
      .auth()
      .login(user)
      .then((response) => {
          if (response.data.data) {
              localStorage.setItem("jwt", response.data.data);
              window.location.href='/home'
          }
      })
      .catch((error) => dispatch({
            type: ACTION_TYPES.LOGIN,
            error: "Không thể đăng nhập. - " + error.response.data.message.toString()
    })).finally(()=>dispatch(onLoadingFalse()));
};

export const sendOTP = (user) => (dispatch) => {
    apiService
        .auth()
        .sendOTP(user)
        .then((response) => {
                localStorage.setItem("email-otp",user.email);
                window.location.href='/reset-password'
        
        })
        .catch((error) => dispatch({
              type: ACTION_TYPES.SENDOTP,
              error: "Không thể gửi OTP. - " + error.response.data.message.toString()
      })).finally(()=>dispatch(onLoadingFalse()));
  };

  export const resetPassword = (user) => (dispatch) => {
    apiService
        .auth()
        .resetPassword(user)
        .then((response) => {
                window.location.href='/login'
        
        })
        .catch((error) => dispatch({
              type: ACTION_TYPES.RESET_PASSWORD,
              error: "Không thể đặt lại mật khẩu. - " + error.response.data.message.toString()
      })).finally(()=>dispatch(onLoadingFalse()));
  };


  export const register = (user) => (dispatch) => {
    apiService
        .auth()
        .register(user)
        .then((response) => {
                localStorage.setItem("email-register",user.email);
                window.location.href='/active'
        
        })
        .catch((error) => dispatch({
              type: ACTION_TYPES.REGISTER,
              error: "Không thể đăng ký. - " + error.response.data.message.toString()
      })).finally(()=>dispatch(onLoadingFalse()));
  };


export const active = (user) => (dispatch) => {
    apiService
        .auth()
        .active(user)
        .then((response) => {
                window.location.href='/login'
        })
        .catch((error) => dispatch({
              type: ACTION_TYPES.ACTIVE,
              error: "Không thể kích hoạt. - " + error.response.data.message.toString()
      })).finally(()=>dispatch(onLoadingFalse()));
  };

export const getUserByJWT = () => (dispatch) => {
  apiService
      .user()
      .getUserByJWT()
      .then((response) => {
          dispatch({
              type: ACTION_TYPES.GET_USER_JWT,
              payload: response.data,
              user: response.data.data,
              error: null
          });
      })
      .catch((error) => {
          dispatch({
                type: ACTION_TYPES.GET_USER_JWT,
                error: "Không thể tải dữ liệu người dùng. - " + error.response.data.message.toString()
            });
    }).finally(()=>dispatch(onLoadingFalse()));
};

export const editProfileUser = (requestBody,navigate) => (dispatch) => {
    apiService
        .user()
        .editProfileUser(requestBody)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.EDIT_PROFILE_USER,
                payload: response.data,
                user: response.data.data,
                error: null
            });
            navigate("/user-profile")
        })
        .catch((error) => {
            dispatch({
                type: ACTION_TYPES.EDIT_PROFILE_USER,
                error: "Không thể chỉnh sửa thông tin người dùng. - " + error.response.data.message.toString()
            })
            return false
    }).finally(()=>dispatch(onLoadingFalse()));
};

export const changePassword = (requestBody,navigate) => (dispatch) => {
    apiService
        .user()
        .changePassword(requestBody)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.CHANGE_PASSWORD,
                payload: response.data,
                user: response.data.data,
                error: null
            });
            navigate("/user-profile")
        })
        .catch((error) => dispatch({
            type: ACTION_TYPES.CHANGE_PASSWORD,
            error: "Không thể thay đổi mật khẩu. - " + error.response.data.message.toString()
        })).finally(()=>dispatch(onLoadingFalse()));
};

export const changeAvatar = (formData) => (dispatch) => {
    apiService
        .user()
        .changeAvatar(formData)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.CHANGE_AVATAR,
                payload: response.data,
                user: response.data.data,
                error: null
            });
        })
        .catch((error) => dispatch({
            type: ACTION_TYPES.CHANGE_AVATAR,
            error: "Không thể thay đổi avatar. - " + error.response.data.message.toString()
        })).finally(()=>dispatch(onLoadingFalse()));
};

export const onLoadingTrue = () => (dispatch) => {
    dispatch({
            type: ACTION_TYPES.LOADING_TRUE,
    });
};

export const onLoadingFalse = () => (dispatch) => {
    dispatch({
            type: ACTION_TYPES.LOADING_FALSE,
    });
};