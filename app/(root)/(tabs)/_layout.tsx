import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
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
  const [sessions, setSessions] = useState<SessionProps[]>([]);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const { username, email, loading } = useAuth(); 

  const renderItem = ({ item }: { item: SessionProps }) => (
    <Pressable
      onPress={() => router.push({ pathname: "/chat/[sessionId]", params: { sessionId: item._id} })}
    >
      <Item title={item.title} />
    </Pressable>
  );

    const fetchSessions = async () => {
    
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('Token:', token);

        if (!token) return;

        const response = await fetch(`http://${apiUrl}/session/getSessions`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });

        console.log('Status:', response.status);
        const data = await response.json();
        console.log('Response:', JSON.stringify(data, null, 2));

        if (!response.ok) {
          throw new Error("Failed to fetch sessions");
        }
        // const data = await response.json();
        console.log('Sessions:', data);
        const sessions = data.result.sessions;
        const sortedSessions = sessions.sort((a: SessionProps, b: SessionProps)=> { 
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()});
        setSessions(sortedSessions);
      }catch (error) {
        console.error('Error fetching sessions:', error);
      }
    };

    const handleLogout = async () => {
      await AsyncStorage.removeItem('token');
      router.replace('/(auth)/sign-in');
    }

  useEffect(() => {
    if(loading){
      return;
    }

    fetchSessions();
  }, [loading]);


  return (
    <View style={{ flex: 1, backgroundColor: '#050D1A', padding: 16 }}>
      <Text style={styles.header}>My Chats</Text>
        <Text className="text-white">Username: {username}</Text>
        <Text className="text-white">Logged in as: {email}</Text>
        <FlatList
          data={sessions}
          keyExtractor={item => item._id} 
          renderItem = {renderItem}
          style = {{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 16 }}
          
        />
      <Pressable onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>
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
        <Drawer.Screen name="chat/[sessionId]" options={{ drawerItemStyle: { display: 'none' } }} />
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
  },
  logoutButton: {
    backgroundColor: '#F97316',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})