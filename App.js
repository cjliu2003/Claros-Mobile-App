import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContextProvider } from "./contexts/userContext";
import { Splash, Welcome, Login, CreateAccount, Home, Email, Center, CTA } from "./screens";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Purchases from 'react-native-purchases';
import { Platform } from 'react-native';

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#FFFFFF"},
  headerTitleStyle: {color: "black"},
  headerTintColor: "black",
}

export class Payments extends React.Component {

  componentDidMount() {
    this.configureRevenueCat();
  }

  async configureRevenueCat() {
    Purchases.setDebugLogsEnabled(true);
    if (Platform.OS === 'ios') {
        console.log('The platform is iOS')
        await Purchases.configure({ 
          apiKey: "appl_ojeITQxIMBehijogjimVTULazFJ" 
        });
    }
  }
}

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialRoute, setInitialRoute] = useState("Splash");

  useEffect(() => {
    async function checkIfLoggedIn() {
        const userToken = await AsyncStorage.getItem('userToken');
        setInitialRoute(userToken && userToken !== "" ? "Home" : "Welcome");
        setTimeout(() => {
          setIsLoaded(true);
        }, 3000);
    };
    const payments = new Payments();
    payments.configureRevenueCat();
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