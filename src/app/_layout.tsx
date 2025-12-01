import AuthProvider from '@/providers/AuthProvider';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name='index' options={{ title: 'Polls' }} />
        <Stack.Screen name='(auth)' options={{ title: 'Login' }} />
        <Stack.Screen name='(protected)' options={{ title: 'Profile' }} />
      </Stack>
    </AuthProvider>
  );
}
