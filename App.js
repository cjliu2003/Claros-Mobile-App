import "react-native-gesture-handler";
import React from 'react';
import { StyleSheet } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContextProvider } from "./contexts/userContext";
import { Welcome, Login, CreateAccount, Home, Chat, Email } from "./screens";
import { StripeProvider } from "@stripe/stripe-react-native";
import {REACT_APP_STRIPE_PK} from '@env'


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
      <StripeProvider publishableKey={REACT_APP_STRIPE_PK}>
        <NavigationContainer theme={myTheme}>
          <Stack.Navigator initialRouteName="Home" screensOptions={globalScreenOptions}>
            <Stack.Screen style={styles.font} name='Welcome' component={Welcome} options={{ headerShown: false }} />
            <Stack.Screen name='Login' component={Login} options={{ headerShown: true }}/>
            <Stack.Screen name='Create Account' component={CreateAccount} options={{ headerShown: true }}/>
            {/* <Stack.Screen name='Chat' component={Chat} options={{ headerShown: false }}/> */}
            <Stack.Screen name='Home' component={Home} options={{ headerShown: false }}/>
            <Stack.Screen name='Email' component={Email} options={{ headerShown: true }} />
          </Stack.Navigator>
        </NavigationContainer>
      </StripeProvider>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({});
