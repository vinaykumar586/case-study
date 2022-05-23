import React, { useState, useEffect, useMemo } from "react";
import AdminHeader from "../AdminManage/AdminHeader";
import { useDispatch, useSelector } from "react-redux";
import "./ManageAirline.scss";
import ListofAirlines from "../../JSON/ListofAirlines";
import _map from "lodash/map";
import AddAirline from "./AddAirline";
import arrow from "../../icons/right-arrow.png";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import flightReducer from "./../../services/Flight/flightReducer";
import _isEmpty from "lodash/isEmpty";
import { blockAirlines } from "./../../services/Flight/action";

const ManageAirlines = () => {
  const [openAirline, setOpenAirline] = useState(false);
  const [airLines, setAirlines] = useState("");
  const [update, setUpdate] = useState(false);
  const dispatch = useDispatch();
  const airlineSuccessMessage = useSelector(
    (state) => state.flightReducer.airlineSuccessMsg
  );
  // const getAirlines = useMemo(() => {
  //   axios
  //     .get("http://localhost:8080/airlines", {
  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  //     })
  //     .then((res) => {
  //       setAirlines(res.data);
  //     });
  //   console.log("hitted");
  // }, [update]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/api/v1.0/flight/airlines", {
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type",
        },
      })
      .then((res) => {
        setAirlines(res.data);
        console.log(res.data);
      });
    console.log("hitted");
  }, [update]);

  const duration = (t0, t1) => {
    let d = new Date(t1) - new Date(t0);
    let weekdays = Math.floor(d / 1000 / 60 / 60 / 24 / 7);
    let days = Math.floor(d / 1000 / 60 / 60 / 24 - weekdays * 7);
    let hours = Math.floor(d / 1000 / 60 / 60 - weekdays * 7 * 24 - days * 24);
    let minutes = Math.floor(
      d / 1000 / 60 - weekdays * 7 * 24 * 60 - days * 24 * 60 - hours * 60
    );
    let seconds = Math.floor(
      d / 1000 -
        weekdays * 7 * 24 * 60 * 60 -
        days * 24 * 60 * 60 -
        hours * 60 * 60 -
        minutes * 60
    );
    let milliseconds = Math.floor(
      d -
        weekdays * 7 * 24 * 60 * 60 * 1000 -
        days * 24 * 60 * 60 * 1000 -
        hours * 60 * 60 * 1000 -
        minutes * 60 * 1000 -
        seconds * 1000
    );
    let t = {};
    ["weekdays", "days", "hours", "minutes", "seconds", "milliseconds"].forEach(
      (q) => {
        if (eval(q) > 0) {
          t[q] = eval(q);
        }
      }
    );
    return t;
  };
  const blockAirline = (id, block) => {
    dispatch(blockAirlines(id, block));
    // axios
    //   .put(`http://localhost:8080/airlines/${id}?block=${block}`, {
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     const line = !block ? "unblocked" : "blocked";
    //     if (res.status === 200) {
    //       toast.success(`Airline ${line}`);
    //       setUpdate(!update);
    //     }
    //   });
  };
  return (
    <div>
      <AdminHeader />
      {/* {!_isEmpty(airlineSuccessMessage) && toast.success(airlineSuccessMessage)} */}
      <div className="manage-airlines">
        <div className="manage-airlines-title">
          <h1 className="list-title">List Of Airlines</h1>
          <button
            className="add-airline"
            onClick={() => setOpenAirline(!openAirline)}
          >
            Add New Airline
          </button>
          <div
            style={{ height: "100vh", overflow: "scroll", overflowX: "hidden" }}
          >
            {_map(airLines, (item, key) => (
              <div className="airlines" key={key}>
                <div className="list-airlines">
                  <img
                    src={item.logo}
                    style={{ height: "10vh", marginTop: "2.5vh" }}
                  />
                  <div style={{ marginTop: "1rem" }}>
                    <strong>{item.airline_name}</strong>
                    <div>
                      <small>{item.flight_number}</small>
                    </div>
                  </div>
                  <div>
                    <div style={{ textAlign: "center" }}>
                      <span>
                        {/* <span>
                        {item.startTime.split("T")[1] -
                          item.endTime.split("T")[1]}
                      </span> */}
                        <span>
                          {/* {item.start_time.split("T")[1].substring(0, 5)} */}
                          {/* {new Date(item.start_time).getHours() +
                            ":" +
                            new Date(item.start_time).getMinutes()} */}
                          {new Date(item.start_time).toLocaleTimeString(
                            "en-US"
                          )}
                        </span>
                        <img
                          src={arrow}
                          style={{
                            height: "2vh",
                            paddingLeft: "5px",
                            width: "3vh",
                          }}
                        />
                        <span>
                          {/* {item.end_time.split("T")[1].substring(0, 5)} */}
                          {/* {new Date(item.end_time).getHours() +
                            ":" +
                            new Date(item.end_time).getMinutes()} */}
                          {new Date(item.end_time).toLocaleTimeString("en-US")}
                        </span>
                      </span>
                    </div>
                    <div>
                      <span>
                        <span>{item.origin}</span>
                        <img
                          src={arrow}
                          style={{
                            height: "2vh",
                            paddingLeft: "5px",
                            width: "3vh",
                          }}
                        />{" "}
                        <span>{item.destination}</span>
                      </span>
                    </div>
                  </div>
                  <h1>{`₹${item.price}`}</h1>
                  <div>
                    <button
                      className="btn-block"
                      onClick={() => blockAirline(item.id, !item.block)}
                    >
                      {item.block ? "unblock" : "block"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {openAirline && (
        <AddAirline setOpenAirline={setOpenAirline} openAirline={openAirline} />
      )}
    </div>
  );
};

export default ManageAirlines;
