import * as SplashScreen from 'expo-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import authForm from './(auth)/auth-form';
import CalendarEvents from './(calendar)/calendar';
import { PrimeReactProvider } from "primereact/api"


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const Stack = createNativeStackNavigator()

  return (
    <>
      <PrimeReactProvider>
        <Stack.Navigator initialRouteName='Auth'>
            <Stack.Screen name='Auth' component={authForm} options={{headerShown: false}}/>
            <Stack.Screen name='Calendar' component={CalendarEvents} options={{headerShown: false}}/>
          </Stack.Navigator>
      </PrimeReactProvider>
    </>
  );
}

