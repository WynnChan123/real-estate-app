//(root)/_layout.tsx
import { Redirect, Stack } from 'expo-router';
import useAuth from '../hooks/useAuth';
import { SessionProvider } from '@/app/context/SessionContext';

export default function RootGroupLayout() {
  const { userId, loading } = useAuth();

  console.log('RootLayout - loading:', loading, 'userId:', userId);

  if (loading) return null;
  if (!userId) return <Redirect href="/(auth)/sign-in" />;
  return (
    <SessionProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SessionProvider>
  );
}
