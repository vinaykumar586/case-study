import * as types from "./actionTypes";
const initialState = {
  flightsData: [],
  manageAirlineData: [],
  airlineSuccessMsg: "",
  flightsNotFoundMessage: "",
};

const flightReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SEARCH_FLIGHTS_DATA:
      return {
        ...state,
        flightsData: action.payload,
        flightsNotFoundMessage: action.message,
      };
      break;
    case types.ADD_AIRLINE:
      return {
        ...state,
        airlineSuccessMsg: action.payload,
      };
      break;
    // case types.NO_FLIGHTS_FOUND:
    //   return {
    //     ...state,
    //     flightsNotFoundMessage: action.payload,
    //     flightsData: action.airlineData,
    //   };
    //   break;
    default:
      return state;
  }
};
export default flightReducer;
