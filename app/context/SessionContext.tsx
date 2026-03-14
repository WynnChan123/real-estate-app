import React from 'react';
import { createContext, useState } from 'react';
import { SessionProps } from '../(root)/(tabs)/_layout';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SessionContextType = {
  sessions: SessionProps[];
  fetchSessions: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType>({ sessions: [], fetchSessions: async () => {} });


export const SessionProvider = ({ children } : { children: React.ReactNode }) => {
  const [sessions, setSessions] = useState<SessionProps[]>([]);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  
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

  return (
    <SessionContext.Provider value = {{ sessions, fetchSessions }}>
      {children}
    </SessionContext.Provider>
  )
}

export default SessionContext;
