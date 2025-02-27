import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function MapScreen() {
  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.title}>Weather Map</Text>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.placeholderText}>Weather Map Coming Soon</Text>
        </View>
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
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
    padding: 20,
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    margin: 20,
    borderRadius: 15,
  },
  placeholderText: {
    color: '#fff',
    fontSize: 18,
  },
});