import { combineReducers } from "redux";
import loginReducer from "./RAdmin/loginReducer";
import bookingReducer from "./Booking/bookingReducer";

import flightReducer from "./Flight/flightReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  flightReducer,
  bookingReducer,
});
export default rootReducer;
