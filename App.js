import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './auth/Login';  
import SelectUser from './pages/SelectUser';
import PetterRegister from './pages/PetterRegister';

import 'react-native-gesture-handler';




const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          <Stack.Screen 
              name="SelectUser" 
              component={SelectUser}
              options={{ headerShown: false }} />  
          
          <Stack.Screen 
             name="PetterRegister" 
             component={PetterRegister}
             options={{ headerShown: false }}
             />

        </Stack.Navigator>
        
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
