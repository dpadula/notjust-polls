import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const poll = {
  question: 'What is your favorite color?',
  options: ['Red', 'Green', 'Blue'],
};

const PollDetails = () => {
  const { id } = useLocalSearchParams();
  const [selected, setSelected] = useState('Red');
  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {poll.question} {id}
      </Text>
      {poll.options.map((option) => (
        <View key={option} style={styles.optionsContainer}>
          <Feather
            name={selected === option ? 'check-circle' : 'circle'}
            size={20}
            color={selected === option ? 'green' : 'black'}
            onPress={() => setSelected(option)}
          />
          <Text key={option}>{option}</Text>
        </View>
      ))}
    </View>
  );
};

export default PollDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 5,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  optionsContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
