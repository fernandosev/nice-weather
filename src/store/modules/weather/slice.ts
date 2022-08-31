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
      }>
    ) {
      const { temp, city, weatherCondition, description } = action.payload;

      state.temp = temp;
      state.city = city;
      state.weatherCondition = weatherCondition;
      state.description = description;
      state.weatherLoading = false;
    },

    weatherFailure(state) {
      state.weatherLoading = false;
    },
  },
});

export const { weatherRequest, weatherSuccess, weatherFailure } =
  weather.actions;
export default weather.reducer;
