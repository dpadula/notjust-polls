import { Link, Stack } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';

const polls = [
  { id: 1, title: 'Poll 1' },
  { id: 2, title: 'Poll 2' },
  { id: 3, title: 'Poll 3' },
];

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
          <Link href={`/polls/${item.id}` as any} style={styles.pollContainer}>
            <Text>
              {item.id} {item.title}
            </Text>
          </Link>
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
