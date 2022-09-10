// API
import { weatherAPI } from "~/services/api";

// Types
import { WeatherResponseDTO } from "./types";

// @ENV
import { API_KEY } from "@env";

function getCurrentWeather({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}): Promise<WeatherResponseDTO> {
  return weatherAPI.get("/weather", {
    params: {
      lat,
      lon,
      lang: "pt_br",
      units: "metric",
      exclude: ["hourly", "daily"],
      apikey: API_KEY,
    },
  });
}

export { getCurrentWeather };
