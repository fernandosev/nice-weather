import React, { useEffect } from "react";

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
} from "./styles";
import { colors } from "~/styles";

// @Types
import { WeatherContitions } from "~/@types/weather";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { city, temp, description, weatherCondition, weatherLoading } =
    useAppSelector((store) => store.weather);
  const { lat, long, locationLoading, isPermissionGranted, geolocationError } =
    useAppSelector((store) => store.location);

  const hour = moment().format("HH");

  const getWeather = () => {
    if (!weatherLoading && lat && long)
      dispatch(
        weatherRequest({
          lat,
          long,
          callbackFunction: () => {},
        })
      );
  };

  const getLocation = () => {
    dispatch(clearWeatherData());
    dispatch(locationRequest());
  };

  useEffect(() => {
    getLocation();
  }, [isPermissionGranted]);

  useEffect(() => {
    if (!locationLoading && lat !== undefined && long !== undefined) {
      getWeather();
    }
  }, [locationLoading]);

  const renderNightIcon = (weather: WeatherContitions) => {
    switch (weather) {
      case WeatherContitions.clear:
        return "moon-outline";
      case WeatherContitions.clouds:
        return "cloudy-night-outline";
      case WeatherContitions.drizzle:
        return "rainy-outline";
      case WeatherContitions.rain:
        return "rainy-outline";
      case WeatherContitions.thunderstorm:
        return "thunderstorm-outline";
      case WeatherContitions.snow:
        return "snow-outline";
    }
  };

  const renderDayIcon = (weather: WeatherContitions) => {
    switch (weather) {
      case WeatherContitions.clear:
        return "sunny-outline";
      case WeatherContitions.clouds:
        return "md-partly-sunny-outline";
      case WeatherContitions.drizzle:
        return "rainy-outline";
      case WeatherContitions.rain:
        return "rainy-outline";
      case WeatherContitions.thunderstorm:
        return "thunderstorm-outline";
      case WeatherContitions.snow:
        return "snow-outline";
    }
  };

  const renderColor = (weather: WeatherContitions) => {
    if ((hour >= "18" && hour <= "23") || (hour >= "00" && hour <= "05")) {
      return colors.night;
    }

    switch (weather) {
      case WeatherContitions.clear:
        return colors.clear;
      case WeatherContitions.clouds:
        return colors.clouds;
      case WeatherContitions.rain:
        return colors.rain;
      case WeatherContitions.drizzle:
        return colors.drizzle;
      case WeatherContitions.thunderstorm:
        return colors.thunderstorm;
      case WeatherContitions.snow:
        return colors.snow;
    }
  };

  const renderLoadingText = () => {
    if (locationLoading) return "Obtendo localização atual...";
    else if (!isPermissionGranted)
      return "Permita que o app acesse a localização atual!";
    else if (geolocationError) return "Ative a localização do dispositivo!";
    else if (weatherLoading) return "Carregando dados climáticos...";
  };

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
          rightButtonFunction={getLocation}
          enableSpinRightButton={locationLoading || weatherLoading}
        />
      </SafeAreaHeader>

      {!locationLoading &&
        !weatherLoading &&
        temp &&
        city &&
        weatherCondition &&
        description && (
          <CurrentWeatherContainer>
            <LocationText>{city}</LocationText>
            <TemperatureContainer>
              <Icon
                iconClass="Ionicons"
                name={
                  (hour >= "18" && hour <= "23") ||
                  (hour >= "00" && hour <= "05")
                    ? renderNightIcon(weatherCondition)
                    : renderDayIcon(weatherCondition)
                }
                size={80}
                color={colors.secondary}
              />
              <TemperatureText>{`${Math.round(temp)}°C`}</TemperatureText>
            </TemperatureContainer>
            <WeatherText>{description}</WeatherText>
          </CurrentWeatherContainer>
        )}

      {(weatherLoading || locationLoading) && (
        <LoadingContainer>
          <LoadingText>{renderLoadingText()}</LoadingText>
        </LoadingContainer>
      )}
    </Container>
  );
};

export default Home;
