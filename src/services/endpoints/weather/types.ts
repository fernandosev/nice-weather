import { AxiosResponseGenerator } from "~/@types/axios";
import { WeatherContitions } from "~/@types/weather";

// Interfaces
interface WeatherResponseDTO extends AxiosResponseGenerator {
  data: {
    main: {
      temp: number;
      feels_like: number;
      pressure: number;
      humidity: number;
    };
    name: string;
    weather: [
      {
        main: WeatherContitions;
        description: string;
      }
    ];
  };
}

export type { WeatherResponseDTO };
