import { ACTION_TYPES } from "../actions/cars.action";

const initialState = {
  listSearchCars:[],
  error: null,
  selectedCar:null,
};

export const carsReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case ACTION_TYPES.GET_CARS:{
      if (actions.error) {
        return {
          ...state,
          listSearchCars: [],
          error: actions.error
        };
      }else{
          
        return {
          ...state,
          listSearchCars: actions.cars,
          error: actions.error
        };
      }
        
    }
    case ACTION_TYPES.GET_CAR:{
      if (actions.error) {
        return {
          ...state,
          selectedCar: null,
          error: actions.error
        };
      }else{
          
        return {
          ...state,
          selectedCar: actions.car,
          error: actions.error
        };
      }
        
    }
    default:
          return state;
    }
};
