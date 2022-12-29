
import "react-native-gesture-handler";
import React from 'react';
import { StyleSheet } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContextProvider } from "./contexts/userContext";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import CreateAccountScreen from "./screens/CreateAccountScreen";
import HomeScreen from "./screens/HomeScreen";
import BetHistory from "./screens/BetHistory";

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#ffffff"},
  headerTitleStyle: {color: "black"},
  headerTintColor: "black",
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
        <Stack.Navigator initialRouteName="Welcome" screenOptions={globalScreenOptions}>
          <Stack.Screen style={styles.font} name='Welcome' component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='Create Account' component={CreateAccountScreen} options={{ headerShown: false }}/>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Bet History' component={BetHistory} />
          {/* <Stack.Screen name='Center' component={CenterScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  font: {
    fontFamily: 'Manrope'
  }
});
