import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Location from 'expo-location';

interface Weather {
  temperature: number;
  windSpeed: number;
  humidity: number;
  location: string;
  hourlyForecast: {
    time: string[];
    temperature: number[];
    humidity: number[];
    windSpeed: number[];
  };
}

interface WeatherContextType {
  currentWeather: Weather | null;
  isLoading: boolean;
  error: string | null;
  refreshWeather: () => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

const cities = {
  'New York': { lat: 40.7128, lon: -74.0060 },
  'London': { lat: 51.5074, lon: -0.1278 },
  'Tokyo': { lat: 35.6762, lon: 139.6503 },
  'Paris': { lat: 48.8566, lon: 2.3522 },
};

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [currentWeather, setCurrentWeather] = useState<Weather | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (latitude: number, longitude: number, locationName: string = 'Current Location') => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
      );
      const data = await response.json();

      if (response.ok) {
        setCurrentWeather({
          temperature: Math.round(data.current.temperature_2m),
          windSpeed: Math.round(data.current.wind_speed_10m),
          humidity: data.hourly.relative_humidity_2m[0],
          location: locationName,
          hourlyForecast: {
            time: data.hourly.time.slice(0, 24),
            temperature: data.hourly.temperature_2m.slice(0, 24),
            humidity: data.hourly.relative_humidity_2m.slice(0, 24),
            windSpeed: data.hourly.wind_speed_10m.slice(0, 24),
          },
        });
      } else {
        setError('Failed to fetch weather data');
      }
    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshWeather = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      await fetchWeather(location.coords.latitude, location.coords.longitude);
    } catch (err) {
      setError('Could not fetch location');
    }
  };

  useEffect(() => {
    refreshWeather();
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        currentWeather,
        isLoading,
        error,
        refreshWeather,
      }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
}