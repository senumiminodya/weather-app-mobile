import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useWeather } from '@/context/weather-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function WeatherScreen() {
  const { currentWeather, isLoading, error, refreshWeather } = useWeather();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (!currentWeather) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>No weather data available</Text>
      </View>
    );
  }

  const getTimeFromISO = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
  };

  return (
    <LinearGradient
      colors={['#1f2937', '#111827', '#030712']}
      style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={refreshWeather}
              tintColor="#fff"
            />
          }>
          <Animated.View entering={FadeInDown.delay(200)} style={styles.header}>
            <Text style={styles.location}>{currentWeather.location}</Text>
            <Text style={styles.temperature}>{currentWeather.temperature}°</Text>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(400)}
            style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Ionicons name="water-outline" size={24} color="#fff" />
              <Text style={styles.detailText}>
                {currentWeather.humidity}% Humidity
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="wind-outline" size={24} color="#fff" />
              <Text style={styles.detailText}>
                {currentWeather.windSpeed} m/s Wind
              </Text>
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(600)}
            style={styles.forecastContainer}>
            <Text style={styles.forecastTitle}>24-Hour Forecast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {currentWeather.hourlyForecast.time.map((time, index) => (
                <View key={time} style={styles.hourlyItem}>
                  <Text style={styles.hourlyTime}>{getTimeFromISO(time)}</Text>
                  <Text style={styles.hourlyTemp}>
                    {Math.round(currentWeather.hourlyForecast.temperature[index])}°
                  </Text>
                  <View style={styles.hourlyWind}>
                    <Ionicons name="wind-outline" size={16} color="#fff" />
                    <Text style={styles.hourlyWindText}>
                      {Math.round(
                        currentWeather.hourlyForecast.windSpeed[index]
                      )}
                      m/s
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 60,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f2937',
  },
  header: {
    alignItems: 'center',
  },
  location: {
    fontSize: 35,
    fontWeight: '300',
    color: '#fff',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 96,
    fontWeight: '200',
    color: '#fff',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 15,
    borderRadius: 15,
    minWidth: 150,
  },
  detailText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
  },
  error: {
    color: '#fff',
    fontSize: 18,
  },
  forecastContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  forecastTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
  },
  hourlyItem: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 15,
    borderRadius: 15,
    marginRight: 10,
    alignItems: 'center',
    width: width * 0.25,
  },
  hourlyTime: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  hourlyTemp: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '300',
    marginVertical: 5,
  },
  hourlyWind: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  hourlyWindText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 5,
  },
});