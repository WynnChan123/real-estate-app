import { Link, useRouter } from 'expo-router';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import { useEffect, useRef } from 'react';

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
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const line = StyleSheet.create({
    horizontalLine:  {
      borderBottomColor: 'white',
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginVertical: 10,
      width: '80%',  
      alignSelf: 'center',
    }
  })

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '256495861377-ljnqgsc36j9d359mef08bnv154benqrc.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }, [fadeAnim]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <ImageBackground
          source={welcomeImage}
          style={styles.image}
          resizeMode="cover"
        >
          <Animated.View 
            style={{ 
              opacity: fadeAnim }}
          >
            <Text className="font-bold text-2xl my-10 flex-justify-center text-center text-white">
              Welcome to Price Point
            </Text>
          <Text className="text-white text-center px-4">
            Find Your Perfect Stay.{"\n"}
            Set your budget, explore options, {"\n"}
            and let our smart guide match you {"\n"}
            with places that fit your plans.
          </Text>
          </Animated.View>
          <View className="flex-1 justify-center items-center">
            <TouchableOpacity
              onPress={() => router.push('/sign-in')}
              className="bg-transparent px-6 py-3 rounded-lg items-center my-4 pl-10 pr-10 border border-white"
            >
              <Text className="text-white font-bold text-lg text-center">
                Sign In
              </Text>
            </TouchableOpacity>
            <Text className="pt-5 text-white text-xs">OR</Text>
            <GoogleSigninButton
              style={{ width: 192, height: 48, marginTop: 20 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={() => {
                console.log('Google Sign-In pressed');
              }}
            />
            <View style={line.horizontalLine} />
            <Text className="text-white font-bold flex text-center mt-1">Don't have an account? {"\n"}
              <Text 
                style = {{ color: 'lightblue', textDecorationLine: 'underline' }} 
                onPress={() => router.push('/sign-up')}>SIGN UP NOW
              </Text>
            </Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
