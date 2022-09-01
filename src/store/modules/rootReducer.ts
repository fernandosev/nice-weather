import { combineReducers } from "@reduxjs/toolkit";

import weather from "./weather/slice";
import location from "./location/slice";

const rootReducer = combineReducers({
  weather,
  location,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
