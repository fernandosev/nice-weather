import React from "react";
import { WeatherContitions } from "~/@types/weather";

import Home from "~/screens/Home";
import { renderWithProviders } from "~/utils/test-utils";

describe("Home Screen", () => {
  test("if the user doesn't grant location permission show the message", () => {
    const message = "Permita que o app acesse a localização atual!";

    const { getByTestId } = renderWithProviders(<Home />, {
      preloadedState: {
        location: { locationLoading: false, isPermissionGranted: false },
      },
    });

    const loadingText = getByTestId("loading-text");
    expect(loadingText.props.children).toEqual(message);
  });

  test("if the app show the message when loading location data is true", () => {
    const message = "Obtendo localização atual...";

    const { getByTestId } = renderWithProviders(<Home />, {
      preloadedState: {
        location: { locationLoading: true, isPermissionGranted: true },
      },
    });

    const loadingText = getByTestId("loading-text");
    expect(loadingText.props.children).toEqual(message);
  });

  test("if the app shows the message when the device location has an error", () => {
    const message = "Ative a localização do dispositivo!";

    const { getByTestId } = renderWithProviders(<Home />, {
      preloadedState: {
        location: {
          geolocationError: true,
          locationLoading: false,
          isPermissionGranted: true,
        },
      },
    });

    const loadingText = getByTestId("loading-text");

    expect(loadingText.props.children).toEqual(message);
  });

  test("if the app shows the message when the device is loading weather data", () => {
    const message = "Carregando dados climáticos...";

    const { getByTestId } = renderWithProviders(<Home />, {
      preloadedState: {
        location: {
          geolocationError: false,
          locationLoading: false,
          isPermissionGranted: true,
        },

        weather: { weatherLoading: true },
      },
    });

    const loadingText = getByTestId("loading-text");

    expect(loadingText.props.children).toEqual(message);
  });

  test("if the app displays the weather informations", () => {
    const city = "Goiânia";
    const temp = 28;
    const description = "poucas nuvens";
    const weatherCondition = WeatherContitions.clear;

    const { getByTestId } = renderWithProviders(<Home />, {
      preloadedState: {
        location: {
          geolocationError: false,
          locationLoading: false,
          isPermissionGranted: true,
        },

        weather: {
          weatherLoading: false,
          city,
          temp,
          description,
          weatherCondition,
        },
      },
    });

    const cityText = getByTestId("city-text");
    const tempText = getByTestId("temp-text");
    const descriptionText = getByTestId("description-text");

    expect(cityText.props.children).toEqual(city);
    expect(tempText.props.children).toEqual(`${temp}°C`);
    expect(descriptionText.props.children).toEqual(description);
  });
});

// weather: { city, temp, description, weatherCondition, weatherLoading: false },
