import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Login from "../Login/Login";

import UserHeader from "./UserHeader";
const User = () => {
  const data = useLocation();
  return (
    <div>
      <UserHeader />
    </div>
  );
};
export default User;
