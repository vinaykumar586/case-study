import React, { useState, useEffect } from "react";
import UserHeader from "./UserHeader";
import _map from "lodash/map";
import arrow from "./../../icons/right-arrow.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBookings,
  resetAllBookings,
} from "./../../services/Booking/action";
import bookingReducer from "./../../services/Booking/bookingReducer";

const BookingHistory = () => {
  const dispatch = useDispatch();
  const getAllBookingDetails = useSelector(
    (state) => state.bookingReducer.allBookingDetails
  );
  useEffect(() => {
    dispatch(getAllBookings());
    return () => {
      dispatch(resetAllBookings());
    };
  }, []);
  return (
    <div>
      <UserHeader />
      <section>
        <div>
          {_map(getAllBookingDetails, (item, key) => (
            <div className="airlines">
              <div className="list-airlines" key={key}>
                <div>
                  <div style={{ textAlign: "center" }}>
                    <span>
                      {/* <span>
                        {item.startTime.split("T")[1] -
                          item.endTime.split("T")[1]}
                      </span> */}
                      <span>
                        <strong>
                          JourneyDate:
                          {item.journey_date.split("T")[0]}
                        </strong>
                        {/* {new Date(item.start_time).getHours() +
                            ":" +
                            new Date(item.start_time).getMinutes()} */}
                        {/* {new Date(item.start_time).toLocaleTimeString("en-US")} */}
                      </span>
                      {/* <img
                        src={arrow}
                        style={{
                          height: "2vh",
                          paddingLeft: "5px",
                          width: "3vh",
                        }}
                      />
                      <span>
                        {item.end_time.split("T")[1].substring(0, 5)}
                        {/* {new Date(item.end_time).getHours() +
                            ":" +
                            new Date(item.end_time).getMinutes()} */}
                      {/* {new Date(item.end_time).toLocaleTimeString("en-US")} */}
                      {/* </span> */}
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

                <div>
                  <strong>Name:{item.name}</strong>
                </div>
                <div>
                  <strong>PNR:{item.pnr}</strong>
                </div>
                <div>
                  <strong>Email:{item.email}</strong>
                </div>
                <div>NumberOfSeats:{item.number_of_seats}</div>
                <button className="btn-view">View Ticket</button>
                <button className="btn-cancel">Cancel</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default BookingHistory;
