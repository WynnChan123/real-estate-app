import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import useAuth from '@/app/hooks/useAuth';

export interface SessionProps {
  _id: string;
  title: string;
  created_at: Date;
}

function CustomDrawerContent(){
  const router = useRouter();
  const { userId, username, email, loading } = useAuth();

  useEffect(() => {
    if(loading) {
      return;
    }
    if (!userId) {
      console.error('User ID is missing. Cannot fetch sessions.');
      return;
    }

    const fetchSessions = async () => {
      try {
        const response = await fetch(`http://localhost:3000/session/getSessions/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        console.log('Sessions:', data);
        if (!response.ok) {
          throw new Error("Failed to fetch sessions");
        }
      }catch (error) {
        console.error('Error fetching sessions:', error);
      }
    }


    fetchSessions();
  }, [userId]);

  return (
    <View style={{ flex: 1, backgroundColor: '#050D1A', padding: 16 }}>
      <Text style={styles.header}>My Chats</Text>
        <Text className="text-white">Username: {username}</Text>
        <Text className="text-white">Email: {email}</Text>

    </View>
  );
}

export default function TabsLayout() {

  return (
    <GestureHandlerRootView style ={{ flex: 1 }}>
      <Drawer
        drawerContent = {() => <CustomDrawerContent />}
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: '#242424',
          drawerHideStatusBarOnOpen: true,
          drawerStyle: {
            backgroundColor: '#050D1A',
          },
          drawerLabelStyle: {
            fontWeight: 'bold',
            color: 'white',
          },
        }}
      >
        <Drawer.Screen name="dashboard" options={{ title: 'Dashboard' }} />
        <Drawer.Screen name="explore" options={{ drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="index"   options={{ drawerItemStyle: { display: 'none' } }} />
        <Drawer.Screen name="profile" options={{ drawerItemStyle: { display: 'none' } }} />
      </Drawer>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  header: {
    color: 'white',
    fontSize: 18,
    marginBottom: 16,
  }
})