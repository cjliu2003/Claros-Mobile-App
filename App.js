import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContextProvider, useUserContext } from "./contexts/userContext";
import { Splash, Welcome, Login, CreateAccount, Home, Email, Center, CTA } from "./screens";
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
        console.log("APPJS__FIND-SUBSCRIPTION: ", customerInfo)
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
        console.log(userToken)
        // Logic to conditionally set initialRoute (conditional upon persistent auth presence, subscription)
        if (userToken && userToken !== "") {
          // If there exists a non-empty user token in AysncStorage,
          const revenueCat = new RevenueCat();
          revenueCat.loginForRevenueCat(userToken);
          const subscriptionInStringForm = await findSubscription()
          console.log(subscriptionInStringForm)
          if (subscriptionInStringForm == "premium") {
            console.log("Subscriber is premium!");
            setInitialRoute("Home");
          } else if (subscriptionInStringForm == "none") {
            console.log("No subscription!");
            setInitialRoute("CTA");
          }

        } else {
          setInitialRoute("Welcome");
        }
        // setInitialRoute(userToken && userToken !== "" ? "Home" : "Welcome");
        setTimeout(() => {
          setIsLoaded(true);
        }, 3000);
    };
    
    const revenueCat = new RevenueCat();
    revenueCat.configureRevenueCat();
    determineAppRoute();
    // setInitialRoute("Welcome");
    // setIsLoaded(true)
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