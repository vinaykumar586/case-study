const initialState = {
  searchTicketDetails: [],
  allBookingDetails: [],
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_BY_VALUE":
      return {
        ...state,
        searchTicketDetails: action.payload,
      };
    case "GET_ALL_BOOKINGS":
      return {
        ...state,
        allBookingDetails: action.payload,
      };
    case "RESET_SEARCH_BY_VALUE":
      return {
        ...state,
        searchTicketDetails: action.payload,
      };
    case "RESET_ALL_BOOKINGS":
      return {
        ...state,
        allBookingDetails: action.payload,
      };
    default:
      return state;
  }
};
export default bookingReducer;
