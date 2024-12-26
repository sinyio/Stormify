import { WeatherData, ForecastData } from "@/entities/weatherData";

export interface WeatherDisplayProps {
  weatherData: WeatherData | null;
  forecastData: ForecastData | null;
}
