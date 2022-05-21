import { combineReducers } from "redux";
import { carsReducer } from "./cars.reducer";
import { invoicesReducer } from "./invoices.reducer";
import { userReducer } from "./user.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  cars: carsReducer,
  invoices: invoicesReducer,
});
