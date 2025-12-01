import { supabase } from '@/lib/supabase';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text } from 'react-native';

const polls = [
  { id: 1, title: 'Poll 1' },
  { id: 2, title: 'Poll 2' },
  { id: 3, title: 'Poll 3' },
];

const HomeScreen = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      console.log('Fetching...');

      let { data, error } = await supabase.from('polls').select('*');
      if (error) {
        Alert.alert('Error fetching data');
      }
      setPolls(data);
    };
    fetchPolls();
  }, []);

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
          headerTitleAlign: 'center',
          headerRight: () => (
            <Link href={`/polls/new` as any} asChild>
              <AntDesign name='plus' size={24} color='white' />
            </Link>
          ),
          headerLeft: () => (
            <Link href={`/profile` as any} asChild>
              <AntDesign name='user' size={24} color='white' />
            </Link>
          ),
        }}
      />
      <FlatList
        data={polls}
        style={{ backgroundColor: 'gainsboro' }}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <Link href={`/polls/${item.id}` as any} style={styles.pollContainer}>
            <Text>
              {item.id} {item.question}
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
