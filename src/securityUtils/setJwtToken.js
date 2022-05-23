import axios from "axios";

const setJWTToken = (token) => {
  console.log(token);
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
    // axios.defaults.headers[""];
    console.log(axios.defaults.headers);
  } else {
    console.log("log deletes");
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setJWTToken;
