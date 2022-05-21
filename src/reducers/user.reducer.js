import { ACTION_TYPES } from "../actions/user.action";

const initialState = {
  userProfile:null,
  jwt: null,
  error: null,
  loading: false
};

export const userReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case ACTION_TYPES.LOGIN:{
      if (actions.error) {
        return {
          ...state,
          error: actions.error
        };
      }else{
        return {
          ...state,
          jwt: actions.jwt,
          error: actions.error
        };
      }
        
    }
    case ACTION_TYPES.GET_USER_JWT:{
      if (actions.error) {
        return {
          ...state,
          error: actions.error,
          userProfile: null
        };
      }else {
        return {
          ...state,
          userProfile: actions.user,
          error: actions.error
        };
      }
        
    }
    case ACTION_TYPES.EDIT_PROFILE_USER:{
      if (actions.error) {
        return {
          ...state,
          error: actions.error
        };
      }else {
        return {
          ...state,
          userProfile: actions.user,
          error: actions.error
        };
      }
    }
    case ACTION_TYPES.REGISTER:{
      if (actions.error) {
        return {
          ...state,
          error: actions.error
        };
      }else {
        return {
          ...state,
          error: actions.error
        };
      }
    }
    case ACTION_TYPES.CHANGE_AVATAR:{
      if (actions.error) {
        return {
          ...state,
          error: actions.error
        };
      }else {
        return {
          ...state,
          userProfile: actions.user,
          error: actions.error
        };
      }
    }
    case ACTION_TYPES.CHANGE_PASSWORD:{
      if (actions.error) {
        return {
          ...state,
          error: actions.error
        };
      }else {
        return {
          ...state,
          userProfile: actions.user,
          error: actions.error
        };
      }
    }
    case ACTION_TYPES.ACTIVE:{
      if (actions.error) {
        return {
          ...state,
          error: actions.error
        };
      }else {
        return {
          ...state,
          error: actions.error
        };
      }
    }

    case ACTION_TYPES.LOADING_TRUE:{
      return {
        ...state,
      loading: true
      }
    }
    case ACTION_TYPES.LOADING_FALSE:{
      return {
        ...state,
      loading: false
      }
    }
    default:
          return state;
    }
    
};
