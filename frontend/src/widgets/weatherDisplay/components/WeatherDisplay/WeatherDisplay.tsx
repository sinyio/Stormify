import { FC } from "react";
import { WeatherDisplayProps } from "./types";

export const WeatherDisplay: FC<WeatherDisplayProps> = ({
  weatherData,
  forecastData,
}) => {
  if (!weatherData) {
    return <p>No weather data available.</p>;
  }
  if (!forecastData) {
    return <p>No weather forecast available.</p>;
  }
  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-2">Weather in {weatherData.name}</h2>
      <p>Temperature: {weatherData.main.temp}°C</p>
      <p>Description: {weatherData.weather[0].description}</p>
      <p>Wind Speed: {weatherData.wind.speed} m/s</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <h3 className="text-lg font-bold mb-2">Weather Forecast</h3>
      {forecastData &&
        forecastData.list.map((forecast, index) => (
          <div key={index}>
            <p>Temperature: {forecast.main.temp}°C</p>
            <p>Description: {forecast.weather[0].description}</p>
            <p>Wind Speed: {forecast.wind.speed} m/s</p>
          </div>
        ))}
    </div>
  );
};
