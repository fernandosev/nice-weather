import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// @Types
import { WeatherContitions } from "~/@types/weather";
import { IInitialStateDTO } from "./types";

const initialState = {
  locationLoading: false,
  lat: undefined,
  long: undefined,
} as IInitialStateDTO;

const location = createSlice({
  name: "location",
  initialState,
  reducers: {
    locationRequest(
      state,
      _action: PayloadAction<{
        callbackFunction: (
          messageType: "success" | "error",
          messageText: string
        ) => void;
      }>
    ) {
      state.locationLoading = true;
    },

    locationSuccess(
      state,
      action: PayloadAction<{
        lat: number;
        long: number;
      }>
    ) {
      const { lat, long } = action.payload;

      state.lat = lat;
      state.long = long;
    },

    locationFailure(state) {
      state.locationLoading = false;
    },
  },
});

export const { locationRequest, locationSuccess, locationFailure } =
  location.actions;
export default location.reducer;
