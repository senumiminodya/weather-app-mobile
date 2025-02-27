import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

const locations = [
  { id: '1', name: 'New York', temperature: 22, condition: 'Partly Cloudy' },
  { id: '2', name: 'London', temperature: 18, condition: 'Rainy' },
  { id: '3', name: 'Tokyo', temperature: 25, condition: 'Sunny' },
  { id: '4', name: 'Paris', temperature: 20, condition: 'Cloudy' },
];

export default function LocationsScreen() {
  return (
    <LinearGradient
      colors={['#1f2937', '#111827', '#030712']}
      style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.title}>Weather Locations</Text>
        <FlatList
          data={locations}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInDown.delay(index * 200)}>
              <Pressable style={styles.locationItem}>
                <View style={styles.locationInfo}>
                  <Text style={styles.locationName}>{item.name}</Text>
                  <Text style={styles.locationCondition}>{item.condition}</Text>
                </View>
                <View style={styles.locationTemp}>
                  <Text style={styles.tempText}>{item.temperature}°</Text>
                  <Ionicons
                    name="chevron-forward"
                    size={24}
                    color="rgba(255,255,255,0.5)"
                  />
                </View>
              </Pressable>
            </Animated.View>
          )}
          contentContainerStyle={styles.listContent}
        />
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
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#fff',
    padding: 20,
  },
  listContent: {
    paddingHorizontal: 20,
  },
  locationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    marginBottom: 10,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  locationCondition: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
  },
  locationTemp: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tempText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginRight: 10,
  },
});