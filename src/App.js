import React, { useState, useEffect, useMemo } from "react";
import FlightHome from "./WelcomeToFlightBooking/FlightHome";
import "./App.scss";
import Admin from "./WelcomeToFlightBooking/Admin/Admin";
import User from "./WelcomeToFlightBooking/User/User";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import _isEmpty from "lodash/isEmpty";
import ManageAirlines from "./WelcomeToFlightBooking/ManageAirline/ManageAirlines";
import logo from "../src/icons/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  Navigate,
  useNavigate,
  useHistory,
} from "react-router-dom";
// import Navigate from "react-router-dom";
import Login from "./WelcomeToFlightBooking/Login/Login";
import BookFlight from "./WelcomeToFlightBooking/BookFlight/bookFlight";
import ManageBookings from "./WelcomeToFlightBooking/User/ManageBookings/ManageBookings";
import TravellerDetails from "./WelcomeToFlightBooking/TravellerDetails/TravellerDetails";
import Reports from "./WelcomeToFlightBooking/Admin/Reports";
import BookingHistory from "./WelcomeToFlightBooking/User/BookingHistory";
import ManageDiscount from "./WelcomeToFlightBooking/ManageDiscounts/ManageDiscounts";
import TicketBooking from "./WelcomeToFlightBooking/BookingSuccess/BookTicketSuccess";
import { ADMIN_LOGIN_SUCCESS } from "./services/RAdmin/actionTypes";
import jwt_decode from "jwt-decode";
import { logout } from "../src/services/RAdmin/action";
import setJWTToken from "./securityUtils/setJwtToken";
import store from "./services/store";

import LoginHere from "./WelcomeToFlightBooking/Login/LoginHere";
const App = () => {
  const jwtToken = localStorage.jwtToken;
  const dispatch = useDispatch();
  const validToken = useSelector((state) => state.login.validToken);
  // const history = Navigate();
  console.log(validToken);
  if (jwtToken) {
    setJWTToken(jwtToken);
    const decoded_jwtToken = jwt_decode(jwtToken);
    store.dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: decoded_jwtToken,
    });

    const currentTime = Date.now() / 1000;
    if (decoded_jwtToken.exp < currentTime) {
      dispatch(logout());
      window.location.href = "/";
    }
  }
  // const adminAuth = useSelector((state) => state.login);
  const Auth = JSON.parse(localStorage.getItem("Auth")) || false;
  useEffect(() => {}, []);
  return (
    <BrowserRouter>
      <div className="welcome-flights">
        <div>
          {/* <div style={{ height: "10vh" }}>
            <a href={window.location.origin}>
              <img className="logo" src={logo} />
            </a>
          </div> */}
          {/* {_isEmpty(userData.user) && !Auth && <FlightHome />} */}

          <Routes>
            <Route path="/" element={<FlightHome />} />
            <Route path="/login" element={<Login />} />
            {/* {validToken ? ( */}
            <>
              <Route
                path="/admin"
                element={
                  !_isEmpty(jwtToken) ? <Admin /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/admin/manageairlines"
                element={
                  !_isEmpty(jwtToken) ? (
                    <ManageAirlines />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/admin/reports"
                element={
                  !_isEmpty(jwtToken) ? <Reports /> : <Navigate to="/login" />
                }
              />
            </>
            {/* ) : (
              <>
                <Route path="/loginHere" element={<LoginHere />} />
              </>
            )} */}

            <Route path="/user" element={<User />} />
            <Route path="/user/bookflight" element={<BookFlight />} />
            <Route path="/user/bookings" element={<ManageBookings />} />
            <Route path="/user/bookinghistory" element={<BookingHistory />} />
            <Route
              path="/user/bookflight/travellers"
              element={<TravellerDetails />}
            />
            <Route
              path="/user/bookflight/travellers/booked"
              element={<TicketBooking />}
            />
            <Route path="/admin/managediscounts" element={<ManageDiscount />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
