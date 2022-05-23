import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./UserHeader.scss";
const UserHeader = () => {
  //   const handleLogout = () => {
  //     localStorage.setItem("Auth", false);
  //     history("/");
  //   };
  //   const history = useNavigate();
  return (
    <div>
      <div className="user-activites">
        <Link to="/" style={{ padding: "15px" }}>
          <a>Home</a>
        </Link>
        <Link to="/user/bookflight" style={{ padding: "15px" }}>
          <a>Book Flight</a>
        </Link>
        <Link to="/user/bookings" style={{ padding: "15px" }}>
          <a>Manage Bookings</a>
        </Link>
        <Link to="/user/bookinghistory" style={{ padding: "15px" }}>
          <a>Booking History</a>
        </Link>
      </div>
    </div>
  );
};
export default UserHeader;
