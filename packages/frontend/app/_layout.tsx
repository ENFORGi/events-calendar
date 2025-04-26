import * as SplashScreen from 'expo-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import authForm from '../routes/auth-form';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const Stack = createNativeStackNavigator()

  return (
    <>
      <Stack.Navigator>
          <Stack.Screen name='Auth' component={authForm} options={{headerShown: false}}/>
        </Stack.Navigator>
    </>
  );
}

