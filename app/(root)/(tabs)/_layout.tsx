import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import useAuth from '@/app/hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SessionProps {
  _id: string;
  title: string;
  created_at: Date;
}

const Item = ({ title }: { title: string }) => (
  <View style={styles.item}>
    <Text style={styles.itemText}>{title}</Text>
  </View>
);

function CustomDrawerContent(){
  const router = useRouter();
  const { userId, username, email, loading } = useAuth();
  const [sessions, setSessions] = useState<SessionProps[]>([]);

  const renderItem = ({ item }: { item: SessionProps }) => (
    <Pressable
      onPress={() => router.push({ pathname: "/chat/[sessionId]", params: { sessionId: item._id} })}
    >
      <Item title={item.title} />
    </Pressable>
  );

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
        const token = await AsyncStorage.getItem('token');

        const response = await fetch(`http://10.10.11.202:3000/session/getSessions/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch sessions");
        }
        const data = await response.json();
        console.log('Sessions:', data);
        setSessions(data.result.sessions);
      }catch (error) {
        console.error('Error fetching sessions:', error);
      }
    }

    fetchSessions();
  }, [userId, loading]);

  return (
    <View style={{ flex: 1, backgroundColor: '#050D1A', padding: 16 }}>
      <Text style={styles.header}>My Chats</Text>
        <Text className="text-white">Username: {username}</Text>
        <Text className="text-white">Logged in as: {email}</Text>
        <FlatList
          data={sessions}
          keyExtractor={item => item._id} 
          renderItem = {renderItem}
          
        />
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
  },
  item: {
    backgroundColor: '#050D1A',
    padding: 12,
    borderRadius: 8,
    paddingTop: 14,
  },
  itemText: {
    color: 'white',
    fontSize: 16,
  }
})