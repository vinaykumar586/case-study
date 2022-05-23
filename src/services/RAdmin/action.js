import * as types from "./actionTypes";
import jwt_decode from "jwt-decode";
import axios from "axios";

import setJWTToken from "./../../securityUtils/setJwtToken";
export const loginAdmin = (loginRequest) => (dispatch) => {
  console.log(loginRequest);
  axios
    .post("http://localhost:9000/api/v1.0/flight/admin/login", loginRequest, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    })
    .then((res) => {
      if (res.data.success && res.status === 200) {
        const { token } = res.data;
        // store the token in the localStorage
        localStorage.setItem("jwtToken", token);
        // set our token in header ***
        setJWTToken(token);
        // decode token on React
        const decoded = jwt_decode(token);
        // dispatch to our securityReducer
        console.log(res);
        dispatch({
          type: types.ADMIN_LOGIN_SUCCESS,
          payload: decoded,
        });
      }
    });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);
  console.log("logoutt");
  dispatch({
    type: types.ADMIN_LOGIN_SUCCESS,
    payload: {},
  });
};
