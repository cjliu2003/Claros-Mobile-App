import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContextProvider } from "./contexts/userContext";
import { Splash, Welcome, Login, CreateAccount, Home, Email, Center, CTA } from "./screens";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#FFFFFF"},
  headerTitleStyle: {color: "black"},
  headerTintColor: "black",
}

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialRoute, setInitialRoute] = useState("Splash");

  // Connection to the backend server established in './backend/server.js'
  const [responseData, setResponseData] = useState();

  useEffect(() => {
      async function getData() {
          try {
              const response = await axios.get('https://053d-128-12-123-61.ngrok.io');
              setResponseData(response.data);
              console.log(responseData); // Log the response data here
          } catch (error) {
              console.error(error);
          }
      }
      getData();
  }, []);

  useEffect(() => {
    async function checkIfLoggedIn() {
        const userToken = await AsyncStorage.getItem('userToken');
        setInitialRoute(userToken && userToken !== "" ? "Home" : "Welcome");
        setTimeout(() => {
          setIsLoaded(true);
        }, 3000);
    };
    checkIfLoggedIn();
  }, []);
    
  if(!isLoaded) return <Splash />;

  return (
    <UserContextProvider>
      <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRoute} screensOptions={globalScreenOptions}>
            <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />
            <Stack.Screen name='Welcome' component={Welcome} options={{ headerShown: false }} />
            <Stack.Screen name='Login' component={Login} options={{ headerShown: true }} />
            <Stack.Screen name='Create Account' component={CreateAccount} options={{ headerShown: true }} />
            <Stack.Screen name='Home' component={Home} options={{ headerShown: false } }/>
            <Stack.Screen name='Email' component={Email} options={{ headerShown: true }} />
            <Stack.Screen name='Center' component={Center} options={{ headerShown: true }} />
            <Stack.Screen name='CTA' component={CTA} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({});