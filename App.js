
import "react-native-gesture-handler";
import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContextProvider } from "./contexts/userContext";
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import HomeScreen from "./screens/HomeScreen";

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "transparent"},
  headerTitleStyle: {color: "white"},
  headerTintColor: "white",
}

export default function App() {

  return (
    <UserContextProvider>
      <NavigationContainer>
        <Stack.Navigator style={styles.container} initialRouteName="Welcome">
          <Stack.Screen name='Welcome' component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Create Account' component={CreateAccountScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Manrope',
  },
});
