
import "react-native-gesture-handler";
import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import { UserContextProvider } from "./contexts/userContext";
import HomeScreen from "./screens/HomeScreen";
import CenterScreen from "./screens/CenterScreen";

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#0060ff"},
  headerTitleStyle: {color: "white"},
  headerTintColor: "white",
}

const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0060ff',
    background: '#ffffff',
  }
}

export default function App() {

  return (
    <UserContextProvider>
      <NavigationContainer theme={myTheme}>
        <Stack.Navigator style={styles.container} initialRouteName="Login" screenOptions={globalScreenOptions}>
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Home' component={HomeScreen} />
          {/* <Stack.Screen name='Center' component={CenterScreen} /> */}
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
