import "react-native-gesture-handler";
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContextProvider } from "./contexts/userContext";
import { Welcome, Login, CreateAccount, Home, Chat, Email, Center, Pricing, CTA } from "./screens";

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#FFFFFF"},
  headerTitleStyle: {color: "black"},
  headerTintColor: "black",
}

export default function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome" screensOptions={globalScreenOptions}>
            <Stack.Screen name='Welcome' component={Welcome} options={{ headerShown: false }} />
            <Stack.Screen name='Login' component={Login} options={{ headerShown: true }} />
            <Stack.Screen name='Create Account' component={CreateAccount} options={{ headerShown: true }} />
            <Stack.Screen name='Chat' component={Chat} options={{ headerShown: false }} />
            <Stack.Screen name='Home' component={Home} options={{ headerShown: false } }/>
            <Stack.Screen name='Pricing' component={Pricing} options={{ headerShown: false } }/>
            <Stack.Screen name='Email' component={Email} options={{ headerShown: true }} />
            <Stack.Screen name='Center' component={Center} options={{ headerShown: true }} />
            <Stack.Screen name='CTA' component={CTA} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({});