import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const CreatePoll = () => {
  return (
    <View>
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
          headerRight: () => <Text>Save</Text>,
        }}
      />
      <Text>CreatePoll</Text>
    </View>
  );
};

export default CreatePoll;

const styles = StyleSheet.create({});
