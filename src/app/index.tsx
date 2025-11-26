import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
      <View style={styles.pollContainer}>
        <Text>index</Text>
      </View>
      <StatusBar style='auto' />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gainsboro',
  },
  pollTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  pollContainer: {
    backgroundColor: 'white',
  },
});
