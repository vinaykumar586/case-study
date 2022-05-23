import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserHeader from "./../UserHeader";
import ListofAirlines from "../../../JSON/ListofAirlines";
import "./ManageBooking.scss";
import _map from "lodash/map";
import arrow from "../../../icons/right-arrow.png";
import FormSelect from "./../../../Forms/FormSelect";
import {
  searchByEmailId,
  searchByPnr,
  resetSearchByValue,
} from "./../../../services/Booking/action";
import _isEmpty from "lodash/isEmpty";
import { toast } from "react-toastify";
import bookingReducer from "./../../../services/Booking/bookingReducer";
import { MdArrowRight } from "react-icons/md";

const ManageBookings = () => {
  const [searchByValue, setSearchByValue] = useState("Search By Email");
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const bookingDetails = useSelector(
    (state) => state.bookingReducer.searchTicketDetails
  );
  const items = [
    {
      label: "Search By PNR",
      value: "Search By PNR",
    },
    {
      label: "Search By Email",
      value: "Search By Email",
    },
  ];
  const handleChange = (e) => {
    console.log(e);
    setSearchByValue(e.value);
  };
  const searchTicket = () => {
    console.log(searchText);
    if (_isEmpty(searchText)) {
      toast.error("please enter value");
    }
    if (!_isEmpty(searchText) && searchByValue === "Search By Email") {
      dispatch(searchByEmailId(searchText));
    }
    if (!_isEmpty(searchText) && searchByValue === "Search By PNR") {
      dispatch(searchByPnr(searchText));
    }
  };
  useEffect(() => {
    return () => {
      dispatch(resetSearchByValue());
    };
  }, []);
  console.log(bookingDetails, "bokkingggg");
  return (
    <div>
      <div style={{ height: "10vh" }}>
        <UserHeader />
      </div>
      <div className="search-box">
        <div className="search-ticket">
          <div>
            <input
              type="text"
              placeholder={`Please ${searchByValue}`}
              className="search-value"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="searchby">
            <FormSelect
              items={items}
              defaultValue={searchByValue}
              onChange={(e) => setSearchByValue(e.value)}
            />
          </div>
          <div>
            <button
              className="ticket-search-btn"
              onClick={() => searchTicket()}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div>
        <section>
          <div>
            {_map(bookingDetails, (item, key) => (
              <div className="airlines">
                <div className="list-airlines" key={key}>
                  <div className="align-content">
                    <div style={{ textAlign: "center" }}>
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
                      <span>
                        <span>
                          JourneyDate:
                          {item.journey_date.split("T")[0]}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="align-content">
                    <strong>Name:{item.name}</strong>
                  </div>
                  <div className="align-content">
                    <strong>PNR:{item.pnr}</strong>
                  </div>
                  <div className="align-content">
                    <strong>Email:{item.email}</strong>
                  </div>
                  <div className="align-content">
                    NumberOfSeats:{item.number_of_seats}
                  </div>
                  <div className="align-content">
                    <button className="btn-view">View Ticket</button>
                  </div>
                  <div className="align-content">
                    <button className="btn-cancel">Cancel</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
export default ManageBookings;
