import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { List } from 'react-native-paper';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuth from '@/app/hooks/useAuth';



const dashboard = () => {
  const navigation = useNavigation();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const userId = useAuth();

  const handleCreateChat = async() => {
  try{
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`http://${apiUrl}/session/createSession`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ userId })
    });

    if(!response.ok){
      throw new Error('Failed to create chat');
    }

    const data = await response.json();
    console.log('Chat created:', data);
    console.log('Session ID created:', data.result.newSession._id);
    //route to the created chat
    router.push({ pathname: "/chat/[sessionId]", params: { sessionId: data.result.newSession._id} });
  }catch(error){
    console.error('Error creating chat:', error);
  }
}

  const styles = StyleSheet.create({
    topBar: {
      backgroundColor: '#050D1A',
      height: 60,
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      alignItems: 'center',
      flexDirection: 'row',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
      paddingHorizontal: 24,
      alignItems: 'center',
    },
    page: {
      flex: 1,
      backgroundColor: '#050D1A',
    },
    createbutton: {
      backgroundColor: '#F97316',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
      borderRadius: 8,
      height: 40,
      width: 150,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#1E293B',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderTopWidth: 1,
      borderTopColor: '#1E293B',
      marginHorizontal: 16,
      marginBottom: 12,
      borderRadius: 12,
    },
    inputfield: {
      flex: 1, // takes remaining width, leaving room for send button
      color: 'white',
      paddingHorizontal: 12,
      paddingVertical: 8,
      fontSize: 16,
      borderWidth: 1,
      borderColor: 'white',
      marginHorizontal: 8,
    },
    sendButton: {
      marginLeft: 8,
    },
  });
  return (
        <SafeAreaView style={styles.page} edges={['top', 'left', 'right']}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
              <List.Icon color="white" icon="equal" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.createbutton}
              onPress={() => handleCreateChat() }
            >
              <Text className="text-white font-bold">+ New Chat</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <Text className="text-white font-extrabold justify-center flex">
              What do you want to ask?
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputfield}
              placeholder="Where do you want to stay?"
              placeholderTextColor="#94A3B8"
            />
            <TouchableOpacity style={styles.sendButton}>
              <List.Icon color="white" icon="send" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
  );
};

export default dashboard;
