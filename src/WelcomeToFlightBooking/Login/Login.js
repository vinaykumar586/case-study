import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Login.scss";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import _isEmpty from "lodash/isEmpty";
// import { _isEmpty } from "lodash/isEmpty";
import axios from "axios";
import { loginAdmin } from "../../services/RAdmin/action";
import loginReducer from "../../services/RAdmin/loginReducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const Login = ({ setOpen, open }) => {
  const data = useLocation();
  const history = useNavigate();
  const dispatch = useDispatch();
  const placeholder = data;

  const validToken = useSelector((state) => state.login.validToken);
  console.log(validToken);
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
  const [adminCredentials, setAdminCredentials] = useState({});
  const pushAdmin = () => {
    if (validToken) {
      history("/admin");
      // return <Navigate to="/admin" replace={true} />;
    }
  };

  useEffect(() => {
    pushAdmin();
  }, [validToken]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAdmin(loginDetails));
    console.log(placeholder, e);
  };
  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-center">
        <h1 style={{ textAlign: "center" }}>Login</h1>
        <div className="login-page">
          <label className="label-name">Admin</label>
          <input
            name="username"
            value={loginDetails.username}
            onChange={(e) =>
              setLoginDetails({
                ...loginDetails,
                [e.target.name]: e.target.value,
              })
            }
            placeholder={"Enter Username"}
          />
          <label className="label-pass">Password</label>
          <input
            name="password"
            value={loginDetails.password}
            onChange={(e) =>
              setLoginDetails({
                ...loginDetails,
                [e.target.name]: e.target.value,
              })
            }
            placeholder="Enter Password"
            type="password"
          />
          <div className="btn-sub">
            <button className="login-button">Login</button>
            <button onClick={() => history("/")} className="login-cancel">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default Login;
