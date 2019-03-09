import {
  SELECT_COIN,
  SELECT_CURRENCY,
  SELECT_TIME_LENGTH
} from "../constants/index";

const initialState = {
  coinId: "1",
  currency: "EUR",
  timeLength: "30d"
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_COIN:
      return Object.assign({}, state, {
        coinId: action.payload
      });
    case SELECT_CURRENCY:
      return Object.assign({}, state, {
        currency: action.payload
      });
    case SELECT_TIME_LENGTH:
      return Object.assign({}, state, {
        timeLength: action.payload
      });
    default:
      return state;
  }
};

export default rootReducer;
