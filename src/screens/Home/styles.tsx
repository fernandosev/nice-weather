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
  margin: 40px 0;
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

export const WeatherCards = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const WeatherCard = styled.View.attrs<{ backgorund?: string }>({
  shadowColor: colors.grey3,
  shadowOffset: {
    width: 3,
    height: 3,
  },
  shadowOpacity: 0.25,
  shadowRadius: 5.0,

  elevation: 10,
})`
  background-color: ${(props) => props.background ?? colors.primary};
  width: 100px;
  height: 90px;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
`;

export const WeatherCardTitle = styled.Text`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
  color: ${colors.primaryText};
`;

export const WeatherCardSubtitle = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.primaryText};
`;
