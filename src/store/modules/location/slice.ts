import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// @Types
import { IInitialStateDTO } from "./types";

const initialState = {
  locationLoading: false,
  isPermissionGranted: false,
  geolocationError: undefined,
  lat: undefined,
  long: undefined,
} as IInitialStateDTO;

const location = createSlice({
  name: "location",
  initialState,
  reducers: {
    locationRequest(state) {
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
      state.locationLoading = false;
    },

    locationFailure(state) {
      state.locationLoading = false;
    },

    setIsPermissionGranted(state, action: PayloadAction<{ granted: boolean }>) {
      const { granted } = action.payload;

      state.isPermissionGranted = granted;
    },

    setGeolocationError(state, action: PayloadAction<{ error?: boolean }>) {
      const { error } = action.payload;

      state.geolocationError = error;
    },
  },
});

export const {
  locationRequest,
  locationSuccess,
  locationFailure,
  setIsPermissionGranted,
  setGeolocationError,
} = location.actions;
export default location.reducer;
