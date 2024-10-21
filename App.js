import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './pages/SplashScreen';
import StartedScreen from './pages/StartedScreen';

export default function App() {
  const Stack = createStackNavigator();

  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="StartedScreen"
          component={StartedScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
          />
        <Stack.Screen 
          name="SelectUser" 
          component={SelectUser}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
