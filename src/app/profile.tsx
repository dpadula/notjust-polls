import { Session } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { supabase } from '../lib/supabase';

const ProfileScreen = () => {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
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
