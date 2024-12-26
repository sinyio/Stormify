"use client";
import { FC, useState } from "react";
import Link from "next/link";
import useFetchSearchHistory from "@/hooks/useFetchSearchHistory";
import { AuthProvider, useAuth } from "@/features/auth";
import { SearchForm } from "@/features/searchWeather";
import { fetchWeatherForecast } from "@/features/fetchWeather";
import { WeatherDisplay } from "@/widgets/weatherDisplay";
import { SearchHistoryDisplay } from "@/widgets/searchHistoryDisplay";
import { WeatherData, ForecastData } from "@/entities/weatherData";

const Home: FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const { history } = useFetchSearchHistory();
  const { token, isLoggedIn, refreshToken, logout } = useAuth();

  const handleSearch = async (data: WeatherData) => {
    setWeatherData(data);
    const forecast = await fetchWeatherForecast(data.name, token, refreshToken);
    setForecastData(forecast);
  };

  return (
    <AuthProvider>
      <div className="container mx-auto p-4">
        <nav className="mb-4">
          <Link href="/">Home</Link>
          {isLoggedIn ? (
            <>
              <button onClick={logout} className="ml-2">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="ml-2">
                Login
              </Link>
              <Link href="/register" className="ml-2">
                Register
              </Link>
            </>
          )}
        </nav>
        <h1 className="text-2xl font-bold mb-4">Weather App</h1>
        {isLoggedIn ? (
          <>
            <SearchForm onSearch={handleSearch} />
            <WeatherDisplay
              weatherData={weatherData}
              forecastData={forecastData}
            />
            <SearchHistoryDisplay history={history} />
          </>
        ) : (
          <p>Please login or register</p>
        )}
      </div>
    </AuthProvider>
  );
};

export default Home;
