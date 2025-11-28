import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from './providers/AuthProvider';

const ProfileScreen = () => {
  const { session } = useAuth();

  return (
    <View>
      {session && session.user && (
        <Text>
          {session.user.id} {session.user.email}
        </Text>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
