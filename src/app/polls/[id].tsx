import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PollDetails = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>PollDetails {id}</Text>
    </View>
  );
};

export default PollDetails;

const styles = StyleSheet.create({});
