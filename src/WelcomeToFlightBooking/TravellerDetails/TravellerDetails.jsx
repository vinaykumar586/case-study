import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _map from "lodash/map";
import _filter from "lodash/filter";
import arrow from "../../icons/right-arrow.png";
import "./TravellerDetails.scss";
import FormSelect from "../../Forms/FormSelect";
import axios from "axios";

import { bookingFlightTicket } from "./../../services/Booking/action";
const TravellerDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passengers, setPassengerList] = useState([
    {
      name: "",
      gender: "",
      age: "",
    },
  ]);
  const [travellerDetails, setTravellerDetails] = useState({
    flight_number: location.state.flight_number,
    name: "",
    email: "",
    origin: location.state.origin,
    destination: location.state.destination,
    journey_date: location.state.start_time,
    meal: "",
    number_of_seats: "",
    price: location.state.price,
    // booking_date: new Date().toLocaleDateString(),
    flight_id: location.state.id,
    passengers,
  });
  // console.log(location);
  const removePassenger = (index, data) => {
    // console.log(index);
    if (passengers.length > 1) {
      const p = _filter(passengers, (item, i) => {
        return item.name !== data.name;
      });
      // const p = _filter(passengers, (item, i) => {
      //   return index !== i;
      // });
      setPassengerList(p);
    }
  };
  const Fare = {
    baseFare: "",
    mealCharges: "",
    feeFare: "",
  };
  const gender = ["Male", "Female"];
  let finalBookingDetails = {};

  const ticketBook = async () => {
    let bookingticket = {};

    finalBookingDetails.passengers = passengers;
    finalBookingDetails = { ...finalBookingDetails, ...travellerDetails };
    bookingticket.bookingticket = travellerDetails;
    console.log(bookingticket);
    dispatch(bookingFlightTicket(bookingticket));
    // console.log(response);
    // console.log(finalBookingDetails);
    // if (response.status === 201) {
    //   finalBookingDetails.pnr = Math.random().toString(36).slice(4);
    //   finalBookingDetails.numberOfSeats = passengers.length;
    //   finalBookingDetails.startTime = location.state.startTime;
    //   finalBookingDetails.endTime = location.state.endTime;
    //   axios.post("http://localhost:8000/ticketDetails", finalBookingDetails);
    // }
    navigate("/user/bookflight/travellers/booked", {
      state: finalBookingDetails,
    });
  };
  const seatOrder = () => {
    const seats = [];
    for (let i = 1; i <= 12; i++) {
      seats.push(i);
    }
    return seats;
  };
  // console.log(passengers);
  const bookingDetails = () => {
    return (
      <div className="contact-details">
        <p>Contact Details</p>
        <label>Name</label>
        <input
          placeholder="Enter a Name"
          name="name"
          onChange={(e) =>
            setTravellerDetails({
              ...travellerDetails,
              [e.target.name]: e.target.value,
            })
          }
        />
        <label>Email</label>
        <input
          placeholder="Enter a Email"
          name="email"
          onChange={(e) =>
            setTravellerDetails({
              ...travellerDetails,
              [e.target.name]: e.target.value,
            })
          }
        />
      </div>
    );
  };
  const travelPassangers = () => {
    return _map(passengers, (item, index) => (
      <div className="passenger-details">
        <div>
          <p>Name</p>
          <input
            placeholder="Enter Name"
            name="name"
            onChange={(e) => {
              item.name = e.target.value;
              setPassengerList([...passengers]);
            }}
          />
        </div>
        <div className="">
          <p>Age</p>
          <input
            placeholder="Enter Age"
            name="age"
            onChange={(e) => {
              item.age = e.target.value;
              setPassengerList([...passengers]);
            }}
          />
        </div>
        <div>
          <p>Gender</p>
          <FormSelect
            name="gender"
            items={_map(gender, (i, k) => ({
              label: i,
              value: i,
            }))}
            name="gender"
            isMulti={false}
            onChange={(e) => {
              item.gender = e.value;
              setPassengerList([...passengers]);
            }}
          />
        </div>
        <div style={{ marginTop: "4rem", marginLeft: "1rem" }}>
          {index !== 0 && (
            <button
              onClick={() => removePassenger(index, item)}
              className="btn-remove"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    ));
  };
  console.log(location);
  const item = location.state;
  const onwardItem = location.state.onwardItem;
  const returnItem = location.state.returnItem;
  const addPassenger = () => {
    if (travellerDetails.number_of_seats > passengers.length) {
      setPassengerList([
        ...passengers,
        {
          name: "",
          gender: "",
          age: "",
        },
      ]);
    }
  };
  const selectMeal = (e) => {
    let meal = e.value;
    setTravellerDetails({
      ...travellerDetails,
      meal,
    });
  };
  const selectSeats = (e) => {
    let number_of_seats = e.value;
    setTravellerDetails({
      ...travellerDetails,
      number_of_seats,
    });
  };
  console.log(travellerDetails);
  return (
    <div style={{ display: "flex" }}>
      <div className="traveller-page">
        {true && (
          <section>
            <div className="tra-airline">
              <img src={item.logo} style={{ width: "6rem" }} />
              <div style={{ margin: "1rem" }}>
                <strong>{item.airline_name}</strong>
                <div>
                  <small>{item.flight_number}</small>
                </div>
              </div>
              <div style={{ margin: "1rem" }}>
                <div>
                  <span>
                    <span>
                      {" "}
                      {new Date(item.start_time).toLocaleTimeString("en-US")}
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
              <div style={{ marginLeft: "18px" }}>
                <h2>{`₹${item.price}`}</h2>
              </div>
            </div>
          </section>
        )}
        {/* {item.way === "roundtrip" && (
          <div className="roundtrip-details">
            <section>
              <div className="tra-rairline">
                <strong>Onward</strong>

                <img
                  src={onwardItem.airlineLogo}
                  style={{ height: "3rem", width: "5rem" }}
                />
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
                      <span>{onwardItem.from}</span>
                      <img
                        src={arrow}
                        style={{
                          height: "2vh",
                          paddingLeft: "5px",
                          width: "3vh",
                        }}
                      />{" "}
                      <span>{onwardItem.to}</span>
                    </span>
                  </div>
                </div>
                <div style={{ marginLeft: "18px" }}>
                  <h2>{`₹${onwardItem.price}`}</h2>
                </div>
              </div>
            </section>
            <section>
              <div className="tra-rairline">
                <strong>return</strong>
                <img
                  src={returnItem.airlineLogo}
                  style={{ height: "3rem", width: "5rem" }}
                />
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
                      <span>{returnItem.from}</span>
                      <img
                        src={arrow}
                        style={{
                          height: "2vh",
                          paddingLeft: "5px",
                          width: "3vh",
                        }}
                      />{" "}
                      <span>{returnItem.to}</span>
                    </span>
                  </div>
                </div>
                <div style={{ marginLeft: "18px" }}>
                  <h2>{`₹${returnItem.price}`}</h2>
                </div>
              </div>
            </section>
          </div>
        )} */}
        <div style={{ margin: "20px" }}>
          <div className="meal">
            <div>
              <p>Add Meal</p>
              <FormSelect
                name="addmeal"
                items={_map(location.state.meal.split(","), (item) => ({
                  value: item,
                  label: item,
                }))}
                onChange={(e) => selectMeal(e)}
              />
            </div>
            <div>
              <p>Select Seats</p>
              <FormSelect
                name="number_of_seats"
                items={_map(seatOrder(), (item) => ({
                  value: item,
                  label: item,
                }))}
                onChange={(e) => selectSeats(e)}
              />
            </div>
          </div>
          <div>
            <div>
              <h3 style={{ textAlign: "center" }}>Traveller Details</h3>
              <button onClick={() => addPassenger()} className="btn-passanger">
                Add Passenger
              </button>
            </div>
            {travelPassangers()}
            {bookingDetails()}
          </div>
        </div>
      </div>
      <div className="fare-sum">
        <div>
          <h3 style={{ textAlign: "center" }}>Fare Summary</h3>
        </div>
        <div className="fee-fare">
          <div>
            <span>
              <span>Base Fare </span>
              <span className="price">
                {item.way === "oneway"
                  ? item.price
                  : onwardItem.price + returnItem.price}
              </span>
            </span>
          </div>
          <div>
            <span>
              <span>Fee Fare </span>
              <span className="price">222</span>
            </span>
          </div>
          <div>
            <span>
              <span>Meal Cost </span>
              <span className="price">0</span>
            </span>
          </div>
        </div>

        <div>
          <span>
            <span>Total Amount </span>
            <span className="price">
              {item.way === "oneway"
                ? item.price + 222
                : onwardItem.price + returnItem.price + 222}
            </span>
          </span>
        </div>

        <button className="btn-con" onClick={() => ticketBook()}>
          Continue
        </button>
        <span style={{ marginLeft: "20px" }}>
          <input placeholder="Enter PromoCode" />
          <button style={{ height: "5vh", width: "23vh" }}>ApplyCoupon</button>
        </span>
      </div>
    </div>
  );
};
export default TravellerDetails;
