import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

type JwtPayload = {
  userId: string;
  username: string;
  email: string;
}

const useAuth = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try{
        const token = await AsyncStorage.getItem('token');
        if(!token){
          return;
        }
        const decoded = jwtDecode<JwtPayload>(token);
        setUserId(decoded.userId);
        setUsername(decoded.username);
        setEmail(decoded.email);
      }catch(error){
          console.error('Error decoding token:', error);
          return null;
      }finally{
        setLoading(false);
      }
    };
    loadUser();
  },[]);

  return { userId, username, email, loading };

}


export default useAuth;
