import { Link, useRouter } from 'expo-router';
import { Text, View, StyleSheet, ImageBackground, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';


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
});

export default function Index() {
  const welcomeImage = require('../../../assets/images/welcome.jpg');
  const router = useRouter();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '256495861377-ljnqgsc36j9d359mef08bnv154benqrc.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <ImageBackground
          source={welcomeImage}
          style={styles.image}
          resizeMode="cover"
        >
          <Text className="font-bold text-lg my-10 flex-justify-center text-center text-white">
            Welcome to Price Point
          </Text>
          <View className="flex-1 justify-center items-center">
            <TouchableOpacity
              onPress={() => router.push('/sign-in')}
              className="bg-transparent px-6 py-3 rounded-lg items-center my-4 pl-10 pr-10 border border-white"
            >
              <Text className="text-white font-bold text-lg text-center">
                Sign In
              </Text>
            </TouchableOpacity>  
            <Text className="pt-5 text-white text-xs">OR SIGN IN WITH</Text>  
          </View>    
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => { console.log('Google Sign-In pressed'); }}
        />
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
