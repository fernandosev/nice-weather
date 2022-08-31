// Libs
import { takeLatest, call, put, all } from "redux-saga/effects";

// Sagas
import { locationRequest, locationSuccess, locationFailure } from "./slice";

export function* getCurrentLocation({
  payload,
}: {
  payload: {
    callbackFunction: (
      messageType: "success" | "error",
      messageText: string
    ) => void;
  };
}) {
  const {
    callbackFunction,
  }: {
    callbackFunction: (
      messageType: "success" | "error",
      messageText: string
    ) => void;
  } = payload;

  try {
    yield put(
      locationSuccess({
        lat: -16.596546,
        long: -49.256449,
      })
    );
    yield callbackFunction("success", "");
  } catch (err: any) {
    yield put(locationFailure());

    if (err.response?.data?.message) {
      yield callbackFunction("error", err.response?.data?.message);
    } else {
      yield callbackFunction("error", "Server error. Try again later.");
    }
  }
}

export default all([takeLatest(locationRequest, getCurrentLocation)]);
