import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';
import React from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SignUp = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: 'center',
      width: '100%',
      height: '100%',
    },
    inputContainer: {
      width: '60%',
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 8,
      paddingHorizontal: 12,
      height: 50,
      marginVertical: 12,
    },
    TextInput: {
      flex: 1,
      color: 'white',
      paddingLeft: 10,
    },
    loginButton: {
      backgroundColor: '#F97316',
      width: 256,
      height: 48,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40,
    },
  });
  const welcomeImage = require('@/assets/images/welcome.jpg');
  const router = useRouter();
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [error, setError] = React.useState('');

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSignUp = async() => {
    setError('');
    if(password !== confirmPassword){
        console.error('Passwords do not match');
        setError('Passwords do not match');
        return;
    }

    const response = await fetch('http://192.168.0.137:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({ username, email, password: confirmPassword }),
    });
    if(!response.ok) {
      console.error('Sign-up failed');
      return;
    }
    const data = await response.json();
    console.log('Sign-up successful', data);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <ImageBackground
          source={welcomeImage}
          style={styles.image}
          resizeMode="cover"
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                router.push('/');
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 20,
              }}
            >
              <Ionicons name="chevron-back" size={30} color="white" />
              <Text className="text-white">Back</Text>
            </TouchableOpacity>
            <Text className="text-white font-extrabold text-4xl pl-5 pt-10">
              Create an {'\n'}
            </Text>
            <Text className="text-orange-300 font-extrabold text-4xl pl-5">
              Account
            </Text>
            <View
              className="mt-20 flex items-center justify-items-center"
              style={{ alignSelf: 'center', width: '100%' }}
            >
              <View style={styles.inputContainer}>
                <Ionicons name="person" size={20} color="white" />
                <TextInput
                  placeholder="Username"
                  placeholderTextColor="white"
                  value={username}
                  onChangeText={setUsername}
                  style={styles.TextInput}
                />
              </View>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="white" />
                <TextInput
                  placeholder="Email Address"
                  placeholderTextColor="white"
                  value={email}
                  onChangeText={setEmail}
                  style={styles.TextInput}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="white" />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="white"
                  value={password}
                  onChangeText={setPassword}
                  style={styles.TextInput}
                  secureTextEntry={isPasswordVisible}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <MaterialCommunityIcons
                    name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="white"
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="white" />
                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor="white"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  style={styles.TextInput}
                  secureTextEntry={isPasswordVisible}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <MaterialCommunityIcons
                    name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="white"
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                </TouchableOpacity>
              </View>
              {error ? (
                <Text style={{ color: 'red' }}>{error}</Text>
              ) : null}
              <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
                <Text className="text-white font-bold">Sign Up</Text>
              </TouchableOpacity>
            </View>
            <View className="pt-5">
              <Text
                style={{
                  textDecorationLine: 'underline',
                  color: 'lightblue',
                  alignItems: 'center',
                  marginLeft: 80,
                }}
                onPress={() => {
                  console.log('Forgot Password pressed');
                }}
              >
                Forgot your password?
              </Text>
              <View
                className="flex-1 mt-20"
                style={{ alignItems: 'center', marginLeft: 80 }}
              >
                <Text className="text-white font-bold flex text-center mt-1">
                  Already have an account?
                  <Text
                    style={{
                      color: 'lightblue',
                      textDecorationLine: 'underline',
                    }}
                    onPress={() => router.push('/sign-in')}
                  >
                    {' '}
                    Sign In
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default SignUp;
