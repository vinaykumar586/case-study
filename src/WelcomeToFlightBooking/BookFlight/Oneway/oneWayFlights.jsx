import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ListofAirlines from "../../../JSON/ListofAirlines";
import _map from "lodash/map";
import arrow from "../../../icons/right-arrow.png";
import "./oneway.scss";
import axios from "axios";
import flightReducer from "./../../../services/Flight/flightReducer";
import _isEmpty from "lodash/isEmpty";
const OneWay = ({ flightsData, flightsNotFound }) => {
  const [airlines, setAirlines] = useState([]);
  const navigate = useNavigate();
  const bookingFlightTicket = (item) => {
    item.way = "oneway";
    navigate(`/user/bookflight/travellers`, {
      state: item,
    });
  };
  useEffect(() => {
    setAirlines(flightsData);
  }, []);
  console.log(flightsNotFound, airlines);
  return (
    <div>
      {!_isEmpty(airlines) &&
        _map(airlines, (item, key) => (
          <div className="airlines" key={key}>
            <div className="list-airlines">
              <img src={item.logo} />
              <div style={{ marginTop: "1rem" }}>
                <strong>{item.airline_name}</strong>
                <div>
                  <small>{item.flight_number}</small>
                </div>
              </div>
              <div>
                <div style={{ textAlign: "center" }}>
                  <span>
                    <span>{item.start_time.split("T")[1].substring(0, 5)}</span>
                    <img
                      src={arrow}
                      style={{
                        height: "2vh",
                        paddingLeft: "5px",
                        width: "3vh",
                      }}
                    />
                    <span>{item.end_time.split("T")[1].substring(0, 5)}</span>
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
              <div style={{ marginTop: "28px" }}>
                <button
                  className="btn-book"
                  onClick={() => bookingFlightTicket(item)}
                >
                  BOOK
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
export default OneWay;
