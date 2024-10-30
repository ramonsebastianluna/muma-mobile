import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './pages/SplashScreen';
import StartedScreen from './pages/StartedScreen';
import Login from './auth/Login';  
import SelectUser from './pages/SelectUser';
import PetterRegister from './pages/PetterRegister';
import ProtectorRegister from './pages/ProtectorRegister';
import AccountValidation from './pages/AccountValidation'; 
import RegisterSuccess from './pages/RegisterSuccess';
import RegisterRefused from './pages/RegisterRefused'
import Home from './pages/Home';
import { store } from './app/store';
import { Provider } from 'react-redux';
import UploadSuccessful from './pages/UploadSuccessful';
import PettAdd from './pages/PettAdd';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
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
          <Stack.Screen 
            name="PetterRegister" 
            component={PetterRegister}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="ProtectorRegister" 
            component={ProtectorRegister}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="AccountValidation" 
            component={AccountValidation}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="RegisterSuccess" 
            component={RegisterSuccess}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="RegisterRefused" 
            component={RegisterRefused}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Home" 
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="UploadSuccessful" 
            component={UploadSuccessful}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PettAdd" 
            component={PettAdd}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>     
      </NavigationContainer>
    </Provider>
  );
}
