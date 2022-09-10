// Libs
import { takeLatest, put, all } from "redux-saga/effects";

// Api
import {
  getCurrentWeather,
  WeatherResponseDTO,
} from "~/services/endpoints/weather";

// Store
import { weatherRequest, weatherSuccess, weatherFailure } from "./slice";

export function* _getCurrentWeather({
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
    const response: WeatherResponseDTO = yield getCurrentWeather({
      lat,
      lon: long,
    });

    const { feels_like, humidity, pressure, temp } = response.data.main;
    const city = response.data.name;
    const { description, main } = response.data.weather[0];

    yield put(
      weatherSuccess({
        temp,
        city,
        weatherCondition: main,
        description,
        feelsLike: feels_like,
        humidity,
        pressure,
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

export default all([takeLatest(weatherRequest, _getCurrentWeather)]);
