import { Panorama } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api.service";
import { onLoadingFalse } from "./user.action";
export const ACTION_TYPES = {
  CREATE_INVOICE: "CREATE_INVOICE",
  NEW_SELECT: "NEW_SELECT",
  GET_SELF_INVOICES: "GET_SELF_INVOICES"
};

export const createInvoice = (requestBody) => (dispatch) => {
  apiService
      .invoices()
      .createInvoice(requestBody)
      .then((response) => {
          dispatch({
              type: ACTION_TYPES.CREATE_INVOICE,
              payload: response.data,
              invoice: response.data.data,
              error: null
          });
          window.location.href='/calendar'
        })
      .catch((error) => {
          dispatch({
                type: ACTION_TYPES.CREATE_INVOICE,
                error: "Không thể tạo hóa đơn. - " + error.response.data.message.toString()
            });
    }).finally(()=>dispatch(onLoadingFalse()));
};

export const newSelect = (request) => (dispatch) => {
    dispatch({
        type: ACTION_TYPES.NEW_SELECT,
        time: request,
        duration: parseFloat((request.toDate-request.fromDate)/(3600000)).toFixed(0),
        error: null
    })
  };

export const getSelfInvoices = (param) => (dispatch) => {
    apiService
        .invoices()
        .getSelfInvoices(param)
        .then((response) => {
            dispatch({
                type: ACTION_TYPES.GET_SELF_INVOICES,
                payload: response.data,
                selfInvoices: response.data.data,
                error: null
            });
        })
        .catch((error) => {
            dispatch({
                  type: ACTION_TYPES.GET_SELF_INVOICES,
                  error: "Không thể tạo tải danh sách hóa đơn. - " + error.response.data.message.toString()
              });
      }).finally(()=>dispatch(onLoadingFalse()));
  };
