import {
  SELECT_COIN,
  SELECT_CURRENCY,
  SELECT_TIME_LENGTH
} from "../constants/index";

export function selectCoin(coin) {
  return { type: SELECT_COIN, payload: coin };
}

export function selectCurrency(currency) {
  return { type: SELECT_CURRENCY, payload: currency };
}

export function selectTimeLength(timeLength) {
  return { type: SELECT_TIME_LENGTH, payload: timeLength };
}
