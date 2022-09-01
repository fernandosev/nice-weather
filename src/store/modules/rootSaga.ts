import { all } from "typed-redux-saga";

import weather from "./weather/sagas";
import location from "./location/sagas";

export default function* rootReducer() {
  return yield* all([weather, location]);
}
