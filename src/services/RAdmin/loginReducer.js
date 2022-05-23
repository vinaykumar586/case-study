import * as types from "./actionTypes";

import _isEmpty from "lodash/isEmpty";
const initialState = {
  auth: false,
  validToken: false,
  user: {},
};

const booleanActionPayload = (payload) => {
  if (!_isEmpty(payload)) {
    return true;
  } else {
    return false;
  }
};
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        validToken: booleanActionPayload(action.payload),
        user: action.payload,
      };
      break;
    // case types.ADMIN_LOGOUT_SUCCESS:
    //   return {
    //     ...state,
    //     validToken: booleanActionPayload(action.payload),
    //     user: action.payload,
    //   };
    // break;
    default:
      return state;
  }
};
export default loginReducer;
