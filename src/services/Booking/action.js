import axios from "axios";
import * as types from "./actionTypes";

export const bookingFlightTicket = (bookingDetails) => (dispatch) => {
  axios
    .post("http://localhost:9001/api/v1.0/flight/booking", bookingDetails, {
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch({
      //   type: types.something,
      //   payload: res.data,
      // });
    });
};
export const searchByEmailId = (email) => (dispatch) => {
  axios
    .get(`http://localhost:9001/api/v1.0/flight/searchByEmail/${email}`)
    .then((res) => {
      dispatch({
        type: types.SEARCH_BY_VALUE,
        payload: res.data,
      });
    });
};
export const searchByPnr = (pnr) => (dispatch) => {
  let arr = [];
  axios
    .get(`http://localhost:9001/api/v1.0/flight/searchByPnr/${pnr}`)
    .then((res) => {
      console.log(res);
      arr.push(res.data);
      dispatch({
        type: types.SEARCH_BY_VALUE,
        payload: arr,
      });
    });
};

export const getAllBookings = () => (dispatch) => {
  axios.get("http://localhost:9001/api/v1.0/flight/bookings").then((res) => {
    dispatch({
      type: types.GET_ALL_BOOKINGS,
      payload: res.data,
    });
  });
};

export const resetSearchByValue = () => (dispatch) => {
  dispatch({
    type: types.RESET_SEARCH_BY_VALUE,
    payload: [],
  });
};

export const resetAllBookings = () => (dispatch) => {
  dispatch({
    tyep: types.RESET_ALL_BOOKINGS,
    payload: [],
  });
};
