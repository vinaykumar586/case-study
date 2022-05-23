import React from "react";
import reportWebVitals from "./../../../reportWebVitals";
import arrow from "../../../icons/right-arrow.png";
import _isEmpty from "lodash/isEmpty";
import { useNavigate } from "react-router-dom";
import "./roundTripFooter.scss";
const RoundTripFooter = ({ onwardItem, returnItem }) => {
  const navigate = useNavigate();
  const bookRoundTrip = () => {
    const item = {};
    item.way = "roundtrip";
    item.onwardItem = onwardItem;
    item.returnItem = returnItem;
    navigate("/user/bookflight/travellers", { state: item });
  };
  return (
    <div style={{ display: "flex" }}>
      <div>
        {!_isEmpty(onwardItem) && (
          <div className="rairlines">
            <div className="rlist-airlines">
              {/* <img src={onwardItem.airlineLogo} /> */}
              <div style={{ margin: "1rem" }}>
                <strong>{onwardItem.airlineName}</strong>
                <div>
                  <small>{onwardItem.flightNumber}</small>
                </div>
              </div>
              <div style={{ margin: "1rem" }}>
                <div>
                  <span>
                    <span>{onwardItem.startTime}</span>
                    <img
                      src={arrow}
                      style={{
                        height: "2vh",
                        paddingLeft: "5px",
                        width: "3vh",
                      }}
                    />
                    <span>{onwardItem.endTime}</span>
                  </span>
                </div>
                <div>
                  <span>
                    <span>{onwardItem.origin}</span>
                    <img
                      src={arrow}
                      style={{
                        height: "2vh",
                        paddingLeft: "5px",
                        width: "3vh",
                      }}
                    />{" "}
                    <span>{onwardItem.destination}</span>
                  </span>
                </div>
              </div>
              <h1 style={{ margin: "1rem" }}>{`₹${onwardItem.price}`}</h1>
            </div>
          </div>
        )}
      </div>
      <div>
        <div>
          {!_isEmpty(returnItem) && (
            <div className="rairlines">
              <div className="rlist-airlines">
                {/* <img src={onwardItem.airlineLogo} /> */}
                <div style={{ margin: "1rem" }}>
                  <strong>{returnItem.airlineName}</strong>
                  <div>
                    <small>{returnItem.flightNumber}</small>
                  </div>
                </div>
                <div style={{ margin: "1rem" }}>
                  <div>
                    <span>
                      <span>{returnItem.startTime}</span>
                      <img
                        src={arrow}
                        style={{
                          height: "2vh",
                          paddingLeft: "5px",
                          width: "3vh",
                        }}
                      />
                      <span>{returnItem.endTime}</span>
                    </span>
                  </div>
                  <div>
                    <span>
                      <span>{returnItem.origin}</span>
                      <img
                        src={arrow}
                        style={{
                          height: "2vh",
                          paddingLeft: "5px",
                          width: "3vh",
                        }}
                      />{" "}
                      <span>{returnItem.destination}</span>
                    </span>
                  </div>
                </div>
                <h1 style={{ margin: "1rem" }}>{`₹${returnItem.price}`}</h1>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        {!_isEmpty(onwardItem) && !_isEmpty(returnItem) && (
          <div style={{ margin: "1rem" }}>
            <strong>Total : {onwardItem.price + returnItem.price}</strong>
            <button
              className="rbook"
              onClick={() => bookRoundTrip(onwardItem, returnItem)}
            >
              Book Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default RoundTripFooter;
