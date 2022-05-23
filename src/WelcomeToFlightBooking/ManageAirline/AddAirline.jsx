import React, { useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./AddAirline.scss";
import FormMultiSelect from "../../Forms/FormMultiSelect";
import FormSelect from "../../Forms/FormSelect";
import _map from "lodash/map";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _isEmpty from "lodash/isEmpty";
import _includes from "lodash/includes";

import { addAirlines } from "./../../services/Flight/action";
import flightReducer from "./../../services/Flight/flightReducer";
import Flightlogos from "./../../Flightlogos";

const AddAirline = ({ setOpenAirline, openAirline }) => {
  const dispatch = useDispatch();
  const airlineSuccessMessage = useSelector(
    (state) => state.flightReducer.airlineSuccessMsg
  );
  const [flightDetails, setFlightDetails] = useState({
    airline_name: "",
    flight_number: "",
    logo: "",
    origin: "",
    destination: "",
    start_time: "",
    end_time: "",
    meal: "",
    price: "",
    block: false,
  });
  console.log(flightDetails);
  const addAirLine = (e) => {
    e.preventDefault();

    if (
      _isEmpty(flightDetails.airline_name) ||
      !/^[A-Za-z]+$/i.test(flightDetails.airline_name)
    ) {
      toast.error("Numbers and Special Charcters Not allowed for Airline Name");
    } else if (!flightDetails.logo.match(/\.(jpg|jpeg|png|gif)$/)) {
      toast.error("Please select valid logo with extension png,jpg,jpeg,gif");
    } else if (
      _isEmpty(flightDetails.flight_number) ||
      !/^(?=.{2,8}$)[A-Za-z_ ][A-za-z0-9 ]*(?:[_A-Za-z0-9 ]+)*$/.test(
        flightDetails.flight_number
      )
    ) {
      toast.error("Special Charcters Not allowed for flight number");
    } else if (
      _isEmpty(flightDetails.meal) ||
      !/^[A-Za-z, ]+$/i.test(flightDetails.meal)
    ) {
      toast.error("Numbers and Special Charcters Not allowed for Meal");
    } else if (
      _isEmpty(flightDetails.price) ||
      !/^[0-9]+$/i.test(flightDetails.price)
    ) {
      toast.error("Please Enter Price Only Number allowed");
    } else {
      dispatch(addAirlines(flightDetails));
    }
    console.log("error");
  };
  const handleChange = (e) => {
    setFlightDetails({ ...flightDetails, meal: _map(e, (m) => m.value) });
  };
  return (
    <div className="airline-modal">
      <form
        style={{
          border: "2px solid #78786e",
        }}
        onSubmit={(e) => addAirLine(e)}
      >
        <h1 className="add-title">Add Airlines</h1>
        <div className="">
          <div>
            <label className="airline-label">Airline Name: </label>
            <input
              name="airline_name"
              placeholder="Airline Name"
              required
              onChange={(e) =>
                setFlightDetails({
                  ...flightDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="airline-label">Upload Logo: </label>
            <FormSelect
              name="logo"
              placeholder="Upload logo URL"
              required
              defaultValue={flightDetails.logo}
              items={Flightlogos.logos}
              onChange={(e) =>
                setFlightDetails({
                  ...flightDetails,

                  logo: e.value,
                })
              }
            />
          </div>
          <div>
            <label className="airline-label">Flight Number: </label>
            <input
              name="flight_number"
              placeholder="Flight Number"
              required
              onChange={(e) =>
                setFlightDetails({
                  ...flightDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="airline-label">From: </label>
            <input
              name="origin"
              placeholder="From"
              required
              onChange={(e) =>
                setFlightDetails({
                  ...flightDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="airline-label">To: </label>
            <input
              name="destination"
              placeholder="To"
              required
              onChange={(e) =>
                setFlightDetails({
                  ...flightDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="airline-label">Start Time: </label>
            <input
              name="start_time"
              type="datetime-local"
              placeholder="Start Time"
              required
              onChange={(e) =>
                setFlightDetails({
                  ...flightDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="airline-label">End Time: </label>
            <input
              name="end_time"
              type="datetime-local"
              placeholder="End Time"
              required
              onChange={(e) =>
                setFlightDetails({
                  ...flightDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="airline-label">Price: </label>
            <input
              name="price"
              placeholder="Price"
              required
              onChange={(e) =>
                setFlightDetails({
                  ...flightDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="airline-label">Meal: </label>
            <input
              type="select"
              name="meal"
              placeholder="Meal"
              required
              onChange={(e) =>
                setFlightDetails({
                  ...flightDetails,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          {/* <div>
          <label className="airline-label">Instrument: </label>
          <input
            name="instrument"
            placeholder="Instrument"
            required
            onChange={(e) =>
              setFlightDetails({
                ...flightDetails,
                [e.target.name]: e.target.value,
              })
            }
          />
        </div> */}
          {/* <div>
          <label className="airline-label">Meal: </label>
          <div className="meal-rule">
            <FormSelect
              name="meal"
              items={[
                { value: "veg", label: "veg" },
                { value: "non-veg", label: "non-veg" },
              ]}
              isMulti={true}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div> */}
        </div>
        <div className="submit-airline">
          <button className="btn-add">Add</button>
          <button
            className="bt-cancel"
            onClick={() => setOpenAirline(!openAirline)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddAirline;
