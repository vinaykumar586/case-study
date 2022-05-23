import React from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
const LoginHere = () => {
  const history = useNavigate();
  const clickToLogin = () => {
    history("/login");
  };
  return (
    <div>
      <a onClick={() => clickToLogin()}>Click to Login Here</a>
    </div>
  );
};

export default LoginHere;
