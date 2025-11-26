import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const poll = {
  question: 'What is your favorite color?',
  options: ['Red', 'Green', 'Blue'],
};

const PollDetails = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>
        {poll.question} {id}
      </Text>
      {poll.options.map((option) => (
        <Text key={option}>{option}</Text>
      ))}
    </View>
  );
};

export default PollDetails;

const styles = StyleSheet.create({});
