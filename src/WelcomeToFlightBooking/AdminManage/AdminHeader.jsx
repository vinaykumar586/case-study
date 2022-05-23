import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/RAdmin/action";
import "./AdminHeader.scss";
const AdminHeader = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    // localStorage.setItem("Auth", false);
    dispatch(logout());
    history("/");
  };
  const history = useNavigate();
  return (
    <div style={{ height: "10vh", background: "#c3c3c3" }}>
      <div>
        <div className="admin-activites">
          <a>Manage Schedules</a>
          <Link to="/admin/managediscounts">
            <a>Manage Discounts</a>
          </Link>
          <Link to="/admin/manageairlines">
            <a>Manage Airlines</a>
          </Link>
          <Link to="/admin/reports">
            <a>Reports</a>
          </Link>
          <button
            className="admin-log-btn"
            onClick={() => {
              handleLogout();
            }}
          >
            AdminLogout
          </button>
        </div>
      </div>
    </div>
  );
};
export default AdminHeader;
