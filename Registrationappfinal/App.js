import React from 'react';
import { SafeAreaView } from 'react-native';
import HomePage from './pages/HomePage';
import { 
  useFonts,
  Lato_400Regular,
  Lato_700Bold 
} from '@expo-google-fonts/lato';
import Toast from 'react-native-toast-message';

export default function App() {
  let [fontsLoaded] = useFonts({
    'Lato': Lato_400Regular,
    'Lato-Bold': Lato_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
    <SafeAreaView style={{ flex: 1 }}>
      <HomePage />
    </SafeAreaView>
    <Toast />

    </>
  );
}