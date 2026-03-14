import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  FlatList,
} from 'react-native';
import { List } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import useAuth from '@/app/hooks/useAuth';
import SessionContext from '@/app/context/SessionContext';

export interface MessageProps {
  _id: string;
  content: string;
  role: string;
  created_at: Date;
}

const styles = StyleSheet.create({
  bubbleContainer: {
    marginVertical: 4,
    marginHorizontal: 12,
    flexDirection: 'row',
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  botContainer: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 12,
  },
  userBubble: {
    backgroundColor: '#FF6B00',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: '#1E2A3A',
    borderBottomRightRadius: 4,
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
  content: {
    color: 'white',
    fontSize: 16,
  },
  page: {
    flex: 1,
    backgroundColor: '#050D1A',
  },
  topBar: {
    backgroundColor: '#050D1A',
    height: 60,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
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
});

const SessionId = () => {
  const navigation = useNavigation();
  const { sessionId } = useLocalSearchParams();
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [messageContent, setMessageContent] = useState('');
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const userId = useAuth();
  const router = useRouter();
  const { fetchSessions } = useContext(SessionContext);

  const handleSendMessage = async (messageContent: string) => {
    try {
        const token = await AsyncStorage.getItem('token');
        if(token) {
            const response = await fetch(`http://${apiUrl}/chat/createMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ sessionId, content: messageContent })
            });

            if (!response.ok) {
               throw new Error('Failed to send message');
            }
          
           const data = await response.json(); 
           console.log('Message sent:', data);
           
          setMessageContent('');
          fetchMessages();
        }
    }catch (error) {
        console.error('Error sending message:', error);
    }
  }
    const fetchMessages = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(
          `http://${apiUrl}/session/getSession/${sessionId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }

        const data = await response.json();
        console.log('Messages:', data);
        setMessages(data.result.chats);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

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

  useEffect(() => {
    fetchMessages();
  }, [sessionId]);
  
  useFocusEffect(
    useCallback(() => {
      fetchSessions();
    }, [])
  );
  const messageBubble = ({ message }: { message: MessageProps }) => {
    const isUser = message.role === 'user';

    return (
      <View
        style={[
          styles.bubbleContainer,
          isUser ? styles.userContainer : styles.botContainer,
        ]}
      >
        <View
          style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}
        >
          <Text style={styles.content}>{message.content}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.page} edges={['top', 'left', 'right']}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <List.Icon color="white" icon="equal" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.createbutton}
          onPress={() => handleCreateChat()}
        >
          <Text className="text-white font-bold">+ New Chat</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => messageBubble({ message: item })}
        style={{ flex: 1 }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputfield}
          placeholder="Where do you want to stay?"
          placeholderTextColor="#94A3B8"
          value={messageContent}
          onChangeText={setMessageContent}
        />
        <TouchableOpacity style={styles.sendButton} onPress={() => handleSendMessage(messageContent)}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SessionId;
