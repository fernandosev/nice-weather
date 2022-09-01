import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react-native";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import weatherSlice from "~/store/modules/weather/slice";
import locationSlice from "~/store/modules/location/slice";

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: { weather: weatherSlice, location: locationSlice },
      preloadedState,
    }),
    ...renderOptions
  }
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
