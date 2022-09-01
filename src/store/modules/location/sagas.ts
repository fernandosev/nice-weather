// Libs
import { takeLatest, put, all } from "redux-saga/effects";
import Geolocation from "@react-native-community/geolocation";

// Store
import { locationRequest, locationSuccess, locationFailure } from "./slice";
import { setGeolocationError } from "~/store/modules/location/slice";

// Get current position
function getPosition(options) {
  return new Promise((resolve, reject) =>
    Geolocation.getCurrentPosition(resolve, reject, options)
  );
}

export function* getCurrentLocation() {
  try {
    const position = yield getPosition({
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
    });

    const { latitude, longitude } = position.coords;

    yield put(setGeolocationError({ error: false }));
    yield put(
      locationSuccess({
        lat: latitude,
        long: longitude,
      })
    );
  } catch (err: any) {
    put(setGeolocationError({ error: true }));
    put(locationFailure());
  }
}

export default all([takeLatest(locationRequest, getCurrentLocation)]);
