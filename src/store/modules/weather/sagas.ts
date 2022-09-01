// Libs
import { takeLatest, call, put, all } from "redux-saga/effects";

// Api
import { api } from "~/services/api";

// Store
import { weatherRequest, weatherSuccess, weatherFailure } from "./slice";

// @Types
import { ResponseGenerator } from "./types";

// @ENV
import { API_BASE_URL, API_KEY } from "@env";

export function* getCurrentWeather({
  payload,
}: {
  payload: {
    lat: number;
    long: number;
    callbackFunction: (
      messageType: "success" | "error",
      messageText: string
    ) => void;
  };
}) {
  const {
    lat,
    long,
    callbackFunction,
  }: {
    lat: number;
    long: number;
    callbackFunction: (
      messageType: "success" | "error",
      messageText: string
    ) => void;
  } = payload;

  try {
    const response: ResponseGenerator = yield call(
      api.get,
      `/weather?lat=${lat}&lon=${long}&lang=pt_br&units=metric&exclude=hourly,daily&apikey=${API_KEY}`
    );

    const data = response.data;

    yield put(
      weatherSuccess({
        temp: data.main.temp,
        city: data.name,
        weatherCondition: data.weather[0].main,
        description: data.weather[0].description,
      })
    );
    yield callbackFunction("success", "");
  } catch (err: any) {
    yield put(weatherFailure());

    if (err.response?.data?.message) {
      yield callbackFunction("error", err.response?.data?.message);
    } else {
      yield callbackFunction("error", "Server error. Try again later.");
    }
  }
}

export default all([takeLatest(weatherRequest, getCurrentWeather)]);
