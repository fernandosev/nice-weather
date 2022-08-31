import { WeatherContitions } from "~/@types/weather";

export interface IInitialStateDTO {
  weatherLoading: boolean;
  temp?: number;
  city?: string;
  weatherCondition?: WeatherContitions;
  description?: string;
}

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}
