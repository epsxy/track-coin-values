import {
  SELECT_COIN,
  SELECT_CURRENCY,
  SELECT_TIME_LENGTH
} from "../constants/index";

export function selectCoin(payload) {
  return { type: SELECT_COIN, payload };
}

export function selectCurrency(payload) {
  return { type: SELECT_CURRENCY, payload };
}

export function selectTimeLength(timeLength) {
  console.warn("action");
  return { type: SELECT_TIME_LENGTH, timeLength };
}
