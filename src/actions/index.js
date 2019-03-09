import {
  SELECT_COIN,
  SELECT_CURRENCY,
  SELECT_TIME_LENGTH
} from "../constants/index";

export const selectCoinId = coin => {
  return { type: SELECT_COIN, payload: coin };
};

export const selectCurrency = currency => {
  return { type: SELECT_CURRENCY, payload: currency };
};

export const selectTimeLength = timeLength => {
  return { type: SELECT_TIME_LENGTH, payload: timeLength };
};
