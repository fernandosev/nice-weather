import React from "react";

import { render } from "@testing-library/react-native";

import Home from "~/screens/Home";
import { renderWithProviders } from "~/utils/test-utils";

describe("Home Screen", () => {
  test("if user don't grandted location permission show the message", () => {
    const message = "Permita que o app acesse a localização atual!";

    const { getByTestId } = renderWithProviders(<Home />, {
      preloadedState: {
        location: { locationLoading: false, isPermissionGranted: false },
      },
    });

    const loadingText = getByTestId("loading-text");
    expect(loadingText.props.children).toEqual(message);
  });

  test("if the app show the message when loading location data", () => {
    const message = "Obtendo localização atual...";

    const { getByTestId } = renderWithProviders(<Home />, {
      preloadedState: {
        location: { locationLoading: true, isPermissionGranted: true },
      },
    });

    const loadingText = getByTestId("loading-text");
    expect(loadingText.props.children).toEqual(message);
  });
});
