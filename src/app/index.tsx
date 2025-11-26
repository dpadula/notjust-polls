import { Stack } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const polls = [1, 2, 3];

const HomeScreen = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Polls',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <FlatList
        data={polls}
        style={{ backgroundColor: 'gainsboro' }}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <View style={styles.pollContainer}>
            <Text>{item}</Text>
          </View>
        )}
      />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 5,
  },
  pollTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  pollContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
});
