import React, { useState, useConext, createContext } from "react";
import "./FlightHome.scss";
import { Link, useLocation } from "react-router-dom";
import Login from "./Login/Login";
// export const OpenConext = createContext();

const FlightHome = () => {
  const [open, setOpen] = useState(false);

  return (
    // <OpenConext.Provider value={open}>
    <div className="welcome-page">
      <div className="welcome-title">
        <h1 className="title">Welcome To Flight Ticket Booking</h1>
      </div>
      <div class="header-content">
        <Link
          to="login"
          state={{
            placeholder: "Please Enter Admin Name",
            name: "Admin",
            label: "Admin",
          }}
          onClick={() => setOpen(!open)}
        >
          <a className="header-admin">Admin</a>
        </Link>
        <Link to="user" className="title-user">
          <a className="header-user">User</a>
        </Link>
      </div>
      {open && <Login setOpen={setOpen} open={open} />}
    </div>
    // </OpenConext.Provider>
  );
};

export default FlightHome;
