import { useNavigate } from "react-router-dom";
import apiService from "../services/api.service";
import { onLoadingFalse } from "./user.action";
export const ACTION_TYPES = {
  GET_CARS: "GET_CARS",
  GET_CAR: "GET_CAR",
};

export const getCars = (param) => (dispatch) => {
  apiService
      .cars()
      .getCars(param)
      .then((response) => {
          dispatch({
              type: ACTION_TYPES.GET_CARS,
              payload: response.data,
              cars: response.data.data,
              error: null
          });
      })
      .catch((error) => {
          dispatch({
                type: ACTION_TYPES.GET_CARS,
                error: "Không thể tải dữ liệu xe. - " + error.response.data.message.toString()
            });
    }).finally(()=>dispatch(onLoadingFalse()));
};

export const getCar = (id,navigate) => (dispatch) => {
    apiService
        .cars()
        .getCar(id)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.GET_CAR,
                payload: response.data,
                car: response.data.data,
                error: null
            });
            navigate("/create-invoice")

        })
        .catch((error) => {
            dispatch({
                  type: ACTION_TYPES.GET_CAR,
                  error: "Không thể tải dữ liệu xe. - " + error.response.data.message.toString()
              });
      }).finally(()=>dispatch(onLoadingFalse()));
  };

