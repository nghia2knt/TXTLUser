import { ACTION_TYPES } from "../actions/invoices.action";

const initialState = {
    error: null,
    time:null,
    duration:0,
    selfInvoices: [],
};



export const invoicesReducer = (state = initialState, actions) => {
    switch (actions.type) {
      case ACTION_TYPES.NEW_SELECT:{
          return {
            ...state,
            time: actions.time,
            duration: actions.duration,
            error: actions.error
          };
      }
      case ACTION_TYPES.GET_SELF_INVOICES:{
        if (actions.error) {
          return {
            ...state,
            selfInvoices: [],
            error: actions.error
          };
        }else{
            
          return {
            ...state,
            selfInvoices: actions.selfInvoices,
            error: actions.error
          };
        }
          
      }
      case ACTION_TYPES.CREATE_INVOICE:{
        if (actions.error) {
          return {
            ...state,
            error: actions.error
          };
        }else{
            
          return {
            ...state,
            error: actions.error
          };
        }
          
      }
      default:
            return state;
      }
  };