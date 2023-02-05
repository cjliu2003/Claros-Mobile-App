import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContextProvider, useUserContext } from "./contexts/userContext";
import { Splash, Welcome, Login, CreateAccount, Home, Email, Center, CTA, Deletion } from "./screens";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RevenueCat } from './functions/revenueCat/revenueCat';

const Stack = createStackNavigator();
const globalScreenOptions = {
  headerStyle: { backgroundColor: "#FFFFFF"},
  headerTitleStyle: {color: "black"},
  headerTintColor: "black",
}

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [initialRoute, setInitialRoute] = useState("Splash");
 
  const findSubscription = async() => {
    try {
        const revenueCat = new RevenueCat();
        const customerInfo = await revenueCat.fetchCustomerInfo();
        if (customerInfo.entitlements.active.premium) {
            if (customerInfo.entitlements.active.premium.isActive === true) {
                // setSubscription("premium")
                return "premium"
            } else {
                // setSubscription("none")
                return "none"
            }
        } else {
            // setSubscription("none")
            return "none"
        }
    } catch (error) {
        console.log("Error while getting customer info:", error);
        return "none"
    }
  }
  
  useEffect(() => {
    async function determineAppRoute() {
        const userToken = await AsyncStorage.getItem('userToken');
        // Logic to conditionally set initialRoute (conditional upon persistent auth presence, subscription)
        if (userToken && userToken !== "") {
          // If there exists a non-empty user token in AysncStorage,
          const revenueCat = new RevenueCat();
          revenueCat.loginForRevenueCat(userToken);
          const subscriptionInStringForm = await findSubscription()
          if (subscriptionInStringForm == "premium") {
            setInitialRoute("Home");
          } else if (subscriptionInStringForm == "none") {
            setInitialRoute("Home");
          }

        } else {
          setInitialRoute("Welcome");
        }
        setTimeout(() => {
          setIsLoaded(true);
        }, 3000);
    };
    
    const revenueCat = new RevenueCat();
    revenueCat.configureRevenueCat();
    determineAppRoute();
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
          <Stack.Screen name='Deletion' component={Deletion} options={{ headerShown: true }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({});