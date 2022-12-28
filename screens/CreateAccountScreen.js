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
      navigation.replace("Home")
    }
  }, [user, recentSignIn])
  

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      {/* If there is a sign-in error, display an error message */}
      {signInError && <Text style={styles.errorMessage}>We were unable to recognize an account with that email and password. Please check your spelling and try again.</Text>}
      {/* Display the page title */}
      <Text style={styles.brandText}>create account</Text>
      {/* Display a message about the benefits of creating an account */}
      <Text style={styles.genericText}>You could be get access to my algorithmic analysis in less than 2 minutes. Just create an account!</Text>
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
        justifyContent: "flex-end",
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
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 16,
    },
    input: {
        width: 325,
        height: 56,
        marginTop: 10,
        paddingVertical: 10,
        borderColor: 'transparent',
        backgroundColor: '#f2f2f2',
        borderRadius: 11,
        color: 'black',
        fontWeight: '200',
    },
    errorMessage: {
        padding: 15,
        width: 300,
        color: '#b51c07',
        backgroundColor: '#b51c0720',
        fontWeight: '500',
    },
    inputContainer: {
        width: 325,
        marginTop: 10,
        paddingVertical: 10,
        borderColor: 'transparent',
        borderRadius: 32,
    },
    inputContainerText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
    },
    outlineButton: {
        width: 325,
        marginTop: 10,
        paddingVertical: 10,
        borderColor: '#000',
        backgroundColor: 'transparent',
        borderRadius: 32,
        borderWidth: 1.5,
    },
    filledButton: {
        width: 325,
        marginTop: 10,
        paddingVertical: 10,
        borderColor: 'transparent',
        backgroundColor: '#0060ff',
        borderRadius: 32,
    },
    outlineButtonText: {
        color: 'black',
        fontWeight: '600',
        fontSize: 18,
    },
    filledButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
    },
    genericText: {
      width: screenWidth * 0.70,
      marginTop: screenHeight * 0.05,
      color: 'black',
      fontWeight: '200',
      fontSize: 20,
      textAlign: 'center',
    },
    brandText: {
      color: '#0060ff',
      fontWeight: '900',
      fontSize: 70,
      textAlign: 'center',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-end",
        backgroundColor: '#ffffff',
    },
    footerText: {
        width: screenWidth * 0.70,
        marginTop: screenHeight * 0.025,
        marginBottom: screenHeight * 0.055,
        color: 'black',
        fontWeight: '200',
        fontSize: 18,
        textAlign: 'center',
    },
    linkText: {
        width: screenWidth * 0.70,
        marginTop: screenHeight * 0.025,
        marginBottom: screenHeight * 0.055,
        color: '#0060ff',
        fontWeight: '500',
        fontSize: 18,
        textAlign: 'center',
    },
    footerButton: {
        backgroundColor: 'white'
    },
})
