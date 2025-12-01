import { supabase } from '@/lib/supabase';
import { Poll } from '@/types/db';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const PollDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selected, setSelected] = useState('');
  const [poll, setPoll] = useState<Poll | null>(null);

  const votar = () => {
    console.warn(`Voted for ${selected}`);
  };

  useEffect(() => {
    const fetchPolls = async () => {
      console.log('Fetching...');

      let { data, error } = await supabase
        .from('polls')
        .select('*')
        .eq('id', Number.parseInt(id))
        .single();
      if (error) {
        Alert.alert('Error fetching data');
      }
      setPoll(data);
    };
    fetchPolls();
  }, []);

  if (!poll) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {poll.question} {id}
      </Text>
      {poll.options.map((option, index) => (
        <Pressable
          key={index}
          style={styles.optionsContainer}
          onPress={() => setSelected(option)}
        >
          <Feather
            name={selected === option ? 'check-circle' : 'circle'}
            size={20}
            color={selected === option ? 'green' : 'black'}
          />
          <Text key={option}>{option}</Text>
        </Pressable>
      ))}
      <View style={styles.voteButton}>
        <Button title='Votar' onPress={votar} />
      </View>
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
  voteButton: {
    padding: 10,
  },
});
