import React, { Component } from "react";
import { render } from "@testing-library/react";
import UserHeader from "./../User/UserHeader";

import axios from "axios";
import "./bookFlight.scss";
import OneWay from "./Oneway/oneWayFlights";

import RoundTrip from "./Roundtriip/roundTrip";
import _isEmpty from "lodash/isEmpty";

import { connect } from "react-redux";
import { flightBook } from "./../../services/Flight/action";
class BookFlight extends Component {
  state = {
    name: "oneWay",
    search: false,
    origin: "",
    destination: "",
    journeyDate: "",
    airlines: [],
    flightsNotFound: "",
  };

  componentDidMount() {
    if (!_isEmpty(this.props.flightsData)) {
      this.setState({
        airlines: this.props.flightsData,
      });
    }
    if (!_isEmpty(this.props.flightsNotFoundMessage)) {
      this.setState({
        airlines: this.props.flightsNotFoundMessage,
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log("props");
    if (this.props.flightsData !== nextProps.flightsData) {
      console.log("nextProps");
      this.setState({
        airlines: nextProps.flightsData,
      });
    }

    if (
      this.props.flightsNotFoundMessage !== nextProps.flightsNotFoundMessage
    ) {
      this.setState({
        flightsNotFound: nextProps.flightsNotFoundMessage,
      });
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  searchFlight = () => {
    const { origin, destination, journeyDate } = this.state;
    this.props.flightBook(origin, destination, journeyDate);
  };

  render() {
    const {
      name,
      search,
      airlines,
      flightsNotFound,
      origin,
      destination,
      journeyDate,
    } = this.state;
    console.log(airlines, flightsNotFound);
    return (
      <div className="book-flight">
        <div className="top-book">
          <UserHeader />
          <div className="flight-option">
            <div class="way-select">
              <input
                type="radio"
                name="name"
                value="oneWay"
                onChange={(e) => this.handleChange(e)}
                checked={this.state.name === "oneWay"}
              />
              <label>One Way</label>
              {/* <input
                type="radio"
                name="roundtrip"
                value="roundTrip"
                onClick={(e) => this.handleChange(e)}
                checked={this.state.name === "roundTrip"}
              />
              <label>Round Trip</label> */}
            </div>
            <div>
              <lable>From</lable>
              <input
                placeholder="flying from"
                name="origin"
                value={this.state.origin}
                onChange={(e) => this.handleChange(e)}
              />
              <label>To</label>
              <input
                placeholder="flying to"
                name="destination"
                value={this.state.destination}
                onChange={(e) => this.handleChange(e)}
              />
            </div>
            <div class="add-date">
              <label>Onward Journey</label>
              <input
                type="date"
                placeholder="Pick a date"
                onChange={(e) => this.handleChange(e)}
                name="journeyDate"
                value={this.state.journeyDate}
              />
              {/* {this.state.name === "roundTrip" && (
                <>
                  <label>Return Journey</label>
                  <input type="date" placeholder="Pick a date" />
                </>
              )} */}
            </div>
            <div>
              <div className="search-btn">
                <button
                  className="btn-s"
                  onClick={() => this.searchFlight()}
                  disabled={
                    _isEmpty(origin) ||
                    _isEmpty(destination) ||
                    _isEmpty(journeyDate)
                  }
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flight-content">
          {!_isEmpty(airlines) ? (
            <OneWay
              flightsData={this.state.airlines}
              flightsNotFound={this.state.flightsNotFound}
            />
          ) : (
            <div style={{ textAlign: "center" }}>
              <h1>{this.state.flightsNotFound}</h1>
            </div>
          )}
          {/* {name === "roundTrip" && search && <RoundTrip />} */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    flightsData: state.flightReducer.flightsData,
    flightsNotFoundMessage: state.flightReducer.flightsNotFoundMessage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    flightBook: (origin, destination, journeyDate) =>
      dispatch(flightBook(origin, destination, journeyDate)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BookFlight);
