import { WeatherContitions } from "~/@types/weather";

export interface IInitialStateDTO {
  weatherLoading: boolean;
  temp?: number;
  city?: string;
  weatherCondition?: WeatherContitions;
  description?: string;
  feelsLike?: number;
  humidity?: number;
  pressure?: number;
}
