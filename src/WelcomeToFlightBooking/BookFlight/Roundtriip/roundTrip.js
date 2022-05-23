import React, { useState } from "react";
import ListofAirlines from "../../../JSON/ListofAirlines";
import arrow from "../../../icons/right-arrow.png";
import "./roundTrip.scss";
import _map from "lodash/map";

import _findIndex from "lodash/findIndex";
import RoundTripFooter from "./roundTripFooter";
import { _isEmpty } from "lodash/isEmpty";
const RoundTrip = () => {
  const [onindex, onsetIndex] = useState("");
  const [reindex, resetIndex] = useState("");
  const [onwardItem, setOnwardItem] = useState();
  const [returnItem, setReturnItem] = useState();

  const onWardClick = (item) => {
    setOnwardItem(item);
    const ind = _findIndex(
      ListofAirlines.Airlines,
      (i, k) => i.flightNumber === item.flightNumber
    );
    onsetIndex(ind);
  };
  const returnClick = (item) => {
    setReturnItem(item);
    const ind = _findIndex(
      ListofAirlines.Airlines,
      (i, k) => i.flightNumber === item.flightNumber
    );
    resetIndex(ind);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "50%" }}>
        {_map(ListofAirlines.Airlines, (item, key) => {
          const clickedStyle = {
            cursor: "pointer",
            border: onindex === key ? "2px solid #5392f9" : "none",
          };
          const pointer = {
            background: onindex === key ? "#5392f9" : "none",
          };
          console.log(key);
          return (
            <div className="airlines">
              <div
                className="list-airlines"
                key={key}
                onClick={() => onWardClick(item)}
                style={clickedStyle}
              >
                <img src={item.airlineLogo} />
                <div style={{ marginTop: "1rem" }}>
                  <strong>{item.airlineName}</strong>
                  <div>
                    <small>{item.flightNumber}</small>
                  </div>
                </div>
                <div>
                  <div>
                    <span>
                      <span>{item.startTime}</span>
                      <img
                        src={arrow}
                        style={{
                          height: "2vh",
                          paddingLeft: "5px",
                          width: "3vh",
                        }}
                      />
                      <span>{item.endTime}</span>
                    </span>
                  </div>
                  <div>
                    <span>
                      <span>{item.from}</span>
                      <img
                        src={arrow}
                        style={{
                          height: "2vh",
                          paddingLeft: "5px",
                          width: "3vh",
                        }}
                      />{" "}
                      <span>{item.to}</span>
                    </span>
                  </div>
                </div>
                <h1>{`₹${item.price}`}</h1>
                {/* <div style={{ marginTop: "28px" }}>
                  <button className="btn-book">BOOK</button>
                </div> */}
                <span className="circle">
                  <span class="customRadioBtn">
                    <span class="outer" style={pointer}>
                      <span class="inner"></span>
                    </span>
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ width: "50%" }}>
        {_map(ListofAirlines.Airlines, (item, key) => {
          const clickedStyle = {
            cursor: "pointer",
            border: reindex === key ? "2px solid #5392f9" : "none",
          };
          const pointer = {
            background: reindex === key ? "#5392f9" : "none",
          };
          return (
            <div className="airlines">
              <div
                className="list-airlines"
                key={key}
                style={clickedStyle}
                onClick={() => returnClick(item)}
              >
                <img src={item.airlineLogo} />
                <div style={{ marginTop: "1rem" }}>
                  <strong>{item.airlineName}</strong>
                  <div>
                    <small>{item.flightNumber}</small>
                  </div>
                </div>
                <div>
                  <div>
                    <span>
                      <span>{item.startTime}</span>
                      <img
                        src={arrow}
                        style={{
                          height: "2vh",
                          paddingLeft: "5px",
                          width: "3vh",
                        }}
                      />
                      <span>{item.endTime}</span>
                    </span>
                  </div>
                  <div>
                    <span>
                      <span>{item.from}</span>
                      <img
                        src={arrow}
                        style={{
                          height: "2vh",
                          paddingLeft: "5px",
                          width: "3vh",
                        }}
                      />{" "}
                      <span>{item.to}</span>
                    </span>
                  </div>
                </div>
                <h1>{`₹${item.price}`}</h1>
                {/* <div style={{ marginTop: "28px" }}>
                  <button className="btn-book">BOOK</button>
                </div> */}
                <span className="circle">
                  <span class="customRadioBtn">
                    <span class="outer" style={pointer}>
                      <span class="inner"></span>
                    </span>
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {/* {!_isEmpty(onwardItem) ||
        (!_isEmpty(returnItem) && ( */}
      <div className="rfooter">
        <RoundTripFooter onwardItem={onwardItem} returnItem={returnItem} />
      </div>
      {/* ))} */}
    </div>
  );
};
export default RoundTrip;
