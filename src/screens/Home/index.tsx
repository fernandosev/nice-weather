import React, { useCallback, useEffect, useMemo } from "react";

// Libs
import moment from "moment";

// Store
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import {
  weatherRequest,
  clearWeatherData,
} from "~/store/modules/weather/slice";
import { locationRequest } from "~/store/modules/location/slice";

// Components
import Icon from "~/components/Icon";
import Header from "~/components/Header";

// Styles
import {
  Container,
  SafeAreaHeader,
  CurrentWeatherContainer,
  LocationText,
  WeatherText,
  TemperatureContainer,
  TemperatureText,
  LoadingContainer,
  LoadingText,
  WeatherCards,
  WeatherCard,
  WeatherCardTitle,
  WeatherCardSubtitle,
} from "./styles";
import { colors } from "~/styles";

// @Types
import { WeatherContitions } from "~/@types/weather";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    city,
    temp,
    description,
    weatherCondition,
    weatherLoading,
    feelsLike,
    humidity,
    pressure,
  } = useAppSelector((store) => store.weather);
  const { lat, long, locationLoading, isPermissionGranted, geolocationError } =
    useAppSelector((store) => store.location);

  const hour = moment().format("HH");

  const weatherData = useMemo(
    () => ({
      Night: { background: colors.night },
      Clear: {
        background: colors.clear,
        dayIcon: "sunny-outline",
        nightIcon: "moon-outline",
      },
      Clouds: {
        background: colors.clouds,
        dayIcon: "md-partly-sunny-outline",
        nightIcon: "cloudy-night-outline",
      },
      Rain: {
        background: colors.rain,
        dayIcon: "rainy-outline",
        nightIcon: "rainy-outline",
      },
      Drizzle: {
        background: colors.drizzle,
        dayIcon: "rainy-outline",
        nightIcon: "rainy-outline",
      },
      Thunderstorm: {
        background: colors.thunderstorm,
        dayIcon: "thunderstorm-outline",
        nightIcon: "thunderstorm-outline",
      },
      Snow: {
        background: colors.snow,
        dayIcon: "snow-outline",
        nightIcon: "snow-outline",
      },
    }),
    []
  );

  const getWeather = useCallback(() => {
    if (lat !== undefined && long !== undefined) {
      dispatch(
        weatherRequest({
          lat,
          long,
          callbackFunction: () => {},
        })
      );
    }
  }, [lat, long]);

  const getLocation = useCallback(() => {
    if (
      isPermissionGranted &&
      !geolocationError &&
      !weatherLoading &&
      city === undefined &&
      temp === undefined &&
      description === undefined &&
      weatherCondition === undefined
    ) {
      dispatch(clearWeatherData());
      dispatch(locationRequest());
    }
  }, [
    isPermissionGranted,
    geolocationError,
    weatherLoading,
    city,
    temp,
    description,
    weatherCondition,
  ]);

  const refreshWeather = useCallback(() => {
    dispatch(clearWeatherData());
    getLocation();
    getWeather();
  }, [getLocation, getWeather]);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  useEffect(() => {
    getWeather();
  }, [getWeather]);

  const renderColor = useCallback((weather: WeatherContitions) => {
    if ((hour >= "18" && hour <= "23") || (hour >= "00" && hour <= "05")) {
      return weatherData.Night.background;
    }

    return weatherData[weather].background;
  }, []);

  const renderIcon = useCallback((weather: WeatherContitions): string => {
    if ((hour >= "18" && hour <= "23") || (hour >= "00" && hour <= "05"))
      return weatherData[weather].nightIcon;

    return weatherData[weather].dayIcon;
  }, []);

  const renderLoadingText = useCallback(() => {
    if (locationLoading) return "Obtendo localização atual...";
    else if (!isPermissionGranted) {
      return "Permita que o app acesse a localização atual!";
    } else if (geolocationError) {
      return "Ative a localização do dispositivo!";
    } else if (weatherLoading) {
      return "Carregando dados climáticos...";
    }
  }, [locationLoading, isPermissionGranted, geolocationError, weatherLoading]);

  return (
    <Container
      background={
        !weatherLoading && weatherCondition
          ? renderColor(weatherCondition)
          : undefined
      }
    >
      <SafeAreaHeader>
        <Header
          title="Nice Weather"
          rightButton="refresh"
          rightButtonFunction={refreshWeather}
          enableSpinRightButton={locationLoading || weatherLoading}
        />
      </SafeAreaHeader>

      {!locationLoading &&
        !weatherLoading &&
        isPermissionGranted &&
        !geolocationError &&
        temp &&
        city &&
        weatherCondition &&
        description &&
        feelsLike &&
        pressure &&
        humidity && (
          <CurrentWeatherContainer>
            <LocationText testID="city-text">{city}</LocationText>
            <TemperatureContainer>
              <Icon
                iconClass="Ionicons"
                name={
                  !weatherLoading && weatherCondition
                    ? renderIcon(weatherCondition)
                    : undefined
                }
                size={80}
                color={colors.secondary}
              />
              <TemperatureText testID="temp-text">{`${Math.round(
                temp
              )}°C`}</TemperatureText>

              <WeatherCards>
                <WeatherCard
                  background={
                    !weatherLoading && weatherCondition
                      ? renderColor(weatherCondition)
                      : undefined
                  }
                >
                  <WeatherCardTitle>{`${Math.round(
                    feelsLike
                  )}°C`}</WeatherCardTitle>
                  <WeatherCardSubtitle>Sensação</WeatherCardSubtitle>
                </WeatherCard>

                <WeatherCard
                  background={
                    !weatherLoading && weatherCondition
                      ? renderColor(weatherCondition)
                      : undefined
                  }
                >
                  <WeatherCardTitle>{`${Math.round(
                    humidity
                  )}%`}</WeatherCardTitle>
                  <WeatherCardSubtitle>Humidade</WeatherCardSubtitle>
                </WeatherCard>

                <WeatherCard
                  background={
                    !weatherLoading && weatherCondition
                      ? renderColor(weatherCondition)
                      : undefined
                  }
                >
                  <WeatherCardTitle>{`${Math.round(
                    pressure
                  )} hPA`}</WeatherCardTitle>
                  <WeatherCardSubtitle>Pressão</WeatherCardSubtitle>
                </WeatherCard>
              </WeatherCards>
            </TemperatureContainer>
            <WeatherText testID="description-text">{description}</WeatherText>
          </CurrentWeatherContainer>
        )}

      {(weatherLoading ||
        locationLoading ||
        !isPermissionGranted ||
        geolocationError) && (
        <LoadingContainer>
          <LoadingText testID="loading-text">{renderLoadingText()}</LoadingText>
        </LoadingContainer>
      )}
    </Container>
  );
};

export default Home;
