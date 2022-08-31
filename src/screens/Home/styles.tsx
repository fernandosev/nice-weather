import styled from "styled-components/native";
import { colors, metrics } from "~/styles";

export const Container = styled.View<{ backgorund?: string }>`
  flex: 1;
  background-color: ${(props) => props.background ?? colors.primary};
`;

export const SafeAreaHeader = styled.SafeAreaView``;

export const CurrentWeatherContainer = styled.SafeAreaView`
  flex: 1;
  margin: 0 ${metrics.baseMargin}px;
  padding-bottom: ${metrics.basePadding}px;
`;

export const LocationText = styled.Text`
  font-size: 36px;
  font-weight: 200;
  color: ${colors.primaryText};
`;

export const TemperatureContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TemperatureText = styled.Text`
  font-size: 72px;
  font-weight: 300;
  color: ${colors.primaryText};
  margin-top: 80px;
`;

export const WeatherText = styled.Text`
  font-size: 28px;
  font-weight: 300;
  text-align: right;
  color: ${colors.primaryText};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const LoadingText = styled.Text`
  font-size: 18px;
  font-weight: 400;
  color: ${colors.primaryText};
`;
