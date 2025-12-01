import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const ProfileScreen = () => {
  const { session } = useAuth();

  return (
    <View>
      {session && session.user && (
        <Text>
          {session.user.id} {session.user.email}
        </Text>
      )}

      <View style={styles.button}>
        <Button title='Sign Out' onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  button: { marginTop: 20, padding: 10 },
});
