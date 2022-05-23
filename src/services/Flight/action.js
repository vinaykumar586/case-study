import axios from "axios";
import * as types from "./actionTypes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _isEmpty from "lodash/isEmpty";
export const flightBook = (origin, destination, journeyDate) => (dispatch) => {
  console.log(origin, destination, journeyDate);
  axios
    .post(
      `http://localhost:9001/api/v1.0/flight/search?origin=${origin}&destination=${destination}&journeyDate=${journeyDate}&block=${false}`,
      {
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type",
        },
      }
    )
    .then((result) => {
      console.log(result.data);
      let airlineData;
      let message;
      if (!_isEmpty(result.data)) {
        airlineData = result.data;
        message = "";
      } else {
        airlineData = null;
        message = `No Flights Found ${origin} to ${destination} on ${journeyDate}`;
      }
      dispatch({
        type: types.SEARCH_FLIGHTS_DATA,
        payload: airlineData,
        message: message,
      });
    });
  // .catch((err) => {});
};

export const addAirlines = (flightDetails) => (dispatch) => {
  axios
    .post(
      "http://localhost:9000/api/v1.0/flight/airline/register",
      flightDetails,
      {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      }
    )
    .then((res) => {
      if (res.status === 201) {
        const message = "Airline added Successfully";
        toast.success("Airline added Successfully");
        dispatch({
          type: types.ADD_AIRLINE,
          payload: message,
        });
      }
      console.log(res);
    })
    .catch((error) => {
      //   toast.error(error);
    });
};

export const blockAirlines = (id, block) => (dispatch) => {
  axios
    .put(`http://localhost:9001/airlines/${id}?block=${block}`)
    .then((res) => {
      console.log(res);
    });
};
export const getManageAirlines = () => (dispatch) => {};
// export const flightBooks = () => {
//     axios.get('localhost:8080/api/v1.0/flight/search')
//     .then(res.json =>{
//         dispatch({
//             type: types.something,
//             payload: res.data
//         })
//     })
// }
// export const flighadminLogint = () => (dispatch) => {
//   axios.post("localhost:8080/api/v1.0/flight/admin/login").then((res) => {
//     dispatch({
//       type: types.something,
//       payload: res.data,
//     });
//   });
// };
// export const ticketPnr = () => (dispatch) => {
//   axios.get("localhost:8080/api/v1.0/flight/ticket/{pnr}").then((res) => {
//     dispatch({
//       type: types.something,
//       payload: res.data,
//     });
//   });
// };
// export const addFlight = () => (dispatch) => {
//   axios.get("/api/v1.0/flight/airline/inventory/add").then((res) => {
//     dispatch({
//       type: types.something,
//       payload: res.data,
//     });
//   });
// };
// export const addAirline = () => (dispatch) => {
//   axios.get("/api/v1.0/flight/airline/register").then((res) => {
//     dispatch({
//       type: types.something,
//       payload: res.data,
//     });
//   });
// };
// export const flighadminLogint = () => (dispatch) => {
//   axios.get("localhost:8080/api/v1.0/flight/admin/login").then((res) => {
//     dispatch({
//       type: types.something,
//       payload: res.data,
//     });
//   });
// };
