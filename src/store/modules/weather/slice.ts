import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// @Types
import { WeatherContitions } from "~/@types/weather";
import { IInitialStateDTO } from "./types";

const initialState = {
  weatherLoading: false,
  city: undefined,
  temp: undefined,
  weatherCondition: undefined,
  description: undefined,
  feelsLike: undefined,
  humidity: undefined,
  pressure: undefined,
} as IInitialStateDTO;

const weather = createSlice({
  name: "weather",
  initialState,
  reducers: {
    weatherRequest(
      state,
      _action: PayloadAction<{
        lat: number;
        long: number;
        callbackFunction: (
          messageType: "success" | "error",
          messageText: string
        ) => void;
      }>
    ) {
      state.weatherLoading = true;
    },

    weatherSuccess(
      state,
      action: PayloadAction<{
        temp: number;
        city: string;
        weatherCondition: WeatherContitions;
        description: string;
        feelsLike: number;
        humidity: number;
        pressure: number;
      }>
    ) {
      const {
        temp,
        city,
        weatherCondition,
        description,
        feelsLike,
        humidity,
        pressure,
      } = action.payload;

      state.temp = temp;
      state.city = city;
      state.weatherCondition = weatherCondition;
      state.description = description;
      state.feelsLike = feelsLike;
      state.humidity = humidity;
      state.pressure = pressure;
      state.weatherLoading = false;
    },

    weatherFailure(state) {
      state.weatherLoading = false;
    },

    clearWeatherData(state) {
      state.city = undefined;
      state.temp = undefined;
      state.weatherCondition = undefined;
      state.description = undefined;
      state.feelsLike = undefined;
      state.humidity = undefined;
      state.pressure = undefined;
    },
  },
});

export const {
  weatherRequest,
  weatherSuccess,
  weatherFailure,
  clearWeatherData,
} = weather.actions;
export default weather.reducer;
