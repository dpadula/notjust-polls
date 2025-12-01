import { supabase } from '@/lib/supabase';
import { Poll, Vote } from '@/types/db';
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
import { useAuth } from '../../providers/AuthProvider';

const PollDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [poll, setPoll] = useState<Poll | null>(null);
  const [userVote, setUserVote] = useState<Vote | null>(null);
  const [selected, setSelected] = useState<string | null>('');

  const { user } = useAuth();

  useEffect(() => {
    const fetchPolls = async () => {
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

    const fetchUserVote = async () => {
      if (!user) {
        return;
      }
      let { data, error } = await supabase
        .from('votes')
        .select('*')
        .eq('poll_id', Number.parseInt(id))
        .eq('user_id', user.id)
        .limit(1)
        .single();

      setUserVote(data);
      if (data) {
        setSelected(data.option);
      }
    };

    fetchPolls();
    fetchUserVote();
  }, []);

  if (!poll) {
    return <ActivityIndicator />;
  }

  const votar = async () => {
   const newVote: any = {
     option: selected,
     poll_id: poll.id,
     user_id: user?.id,
   };
   if (userVote) {
     newVote.id = userVote.id;
   }
   const { data, error } = await supabase
     .from('votes')
     .upsert([newVote])
     .select()
     .single();

   if (error) {
     console.log(error);
     Alert.alert('Failed to vote');
   } else {
     setUserVote(data);
     Alert.alert('Thank you for your vote');
   }
    console.warn(`Voted for ${selected}`);
  };

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
