// Create account screen links a user to www.claros.ai/signup

import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, Linking, View, Dimensions } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Image } from "@rneui/base"
import { useUserContext } from '../contexts/userContext'

// Get the current screen width and height
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const CreateAccountScreen = ( { navigation }) => {
  // State for user information
  const {user, signInError, recentSignIn} = useUserContext()

  // State for storing the screen orientation
  const [orientation, setOrientation] = useState(null);

  // Use effect hook to update the orientation state when the screen dimensions change
  useEffect(() => {
    // Function for updating the orientation state
    const updateOrientation = () => {
      // If the screen width is greater than the screen height, set the orientation to landscape
      // Otherwise, set the orientation to portrait
      setOrientation(Dimensions.get('screen').width > Dimensions.get('screen').height ? 'landscape' : 'portrait');
    };

    // Call the update function initially
    updateOrientation();

    // Subscribe to the screen change event
    const changeEventListener = Dimensions.addEventListener('change', updateOrientation);

    // Return a function that removes the event listener when the component unmounts
    return () => {
      changeEventListener.remove();
    };
  }, []);
  
  // Function for opening the Claros AI pricing page in the device's default browser
  const openCenterURL = () => {
    // Attempt to open the URL and log any errors that occur
    Linking.openURL('https://claros.ai/pricing').catch((error) => console.error(error));
  };

  // Use layout effect hook to navigate to the home screen if the user is authenticated and has recently signed in
  useLayoutEffect(() => {
    // If the user is authenticated and has recently signed in
    if (user && recentSignIn) {
      // Navigate to the home screen
      navigation.replace("Chat")
    }
  }, [user, recentSignIn])
  

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      {/* If there is a sign-in error, display an error message */}
      {signInError && <Text style={styles.errorMessage}>We were unable to recognize an account with that email and password. Please check your spelling and try again.</Text>}
      {/* Display the page title */}
      <Text style={[styles.brandText, {marginTop: screenHeight * 0.1}]}>create account</Text>
      {/* Display a message about the benefits of creating an account */}
      <Text style={styles.genericText}>You could be get access to my algorithmic analysis in less than 2 minutes. Just create an account and buy a subscription!</Text>
      {/* Display an image */}
      <Image source={require('../assets/createAccount.png')} style={styles.image} />
      
      {/* Button for opening the Claros AI pricing page in the default browser */}
      <Button style={styles.filledButton} type="transparent" onPress={() => openCenterURL()} title="CreateAccount">
        <Text style={styles.filledButtonText}>Sign Up on Website</Text>
      </Button>
      {/* Link to the login page */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.footerText}>
          Have an account?{' '}
          <Text style={styles.linkText}>Login</Text>
        </Text>
      </TouchableOpacity>

      {/* Display the device's status bar */}
      <StatusBar style="light" />
    </KeyboardAvoidingView>
  )
}

export default CreateAccountScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "flex-start",
    backgroundColor: '#ffffff',
  },
  image: {
    width: screenWidth * 0.75,
    height: screenHeight * 0.35,
    marginTop: screenHeight * 0.025,
    marginBottom: screenHeight * 0.025,
  },
  inputContainerLabel: {
    marginBottom: 8,
    fontWeight: '400',
    fontSize: 14,
    color: '#000',
  },
  input: {
    height: 40,
    width: screenWidth * 0.75,
    borderColor: '#00000030',
    borderWidth: 0.5,
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
  },
  brandText: {
    fontSize: 64,
    fontWeight: "800",
    marginTop: screenHeight * 0.05,
    marginBottom: screenHeight * 0.05,
    color: "#0060ff",
    textAlign: 'center',
  },
  filledButton: {
    width: screenWidth * 0.75,
    marginTop: 10,
    paddingVertical: 10,
    borderColor: 'transparent',
    backgroundColor: '#0060ff',
    borderRadius: 10,
  },
  filledButtonText: {
      color: 'white',
      fontWeight: '600',
      fontSize: 18,
  },
  footerText: {
      fontSize: 18,
      marginTop: 10,
      color: '#000',
      textAlign: 'center',
  },
  genericText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#222222',
    marginBottom: 10,
    width: screenWidth * 0.90,
    textAlign: 'center',
  },
  linkText: {
      color: '#0060ff',
      fontWeight: '600',
      fontSize: 18,
  },
});
