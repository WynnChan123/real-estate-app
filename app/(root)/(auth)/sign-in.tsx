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

const SignIn = () => {
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
              Welcome {'\n'}
              Back!
            </Text>
            <View
              className="mt-20 flex items-center justify-items-center"
              style={{ alignSelf: 'center', width: '100%' }}
            >
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
                />
              </View>
              <TouchableOpacity style={styles.loginButton}>
                <Text className="text-white font-bold">Log In</Text>
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
                  Don't have an account?
                  <Text
                    style={{
                      color: 'lightblue',
                      textDecorationLine: 'underline',
                    }}
                    onPress={() => router.push('/sign-up')}
                  >
                    {' '}
                    SIGN UP NOW
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
export default SignIn;
