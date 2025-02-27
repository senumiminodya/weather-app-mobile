import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@/context/theme-context';
import { WeatherProvider } from '@/context/weather-context';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="light" />
      </WeatherProvider>
    </ThemeProvider>
  );
}