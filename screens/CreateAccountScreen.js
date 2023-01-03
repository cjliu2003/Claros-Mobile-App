// Create account screen links a user to www.claros.ai/signup

import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, Linking, View, Dimensions, TextInput, Alert } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Image } from "@rneui/base"
import { useUserContext } from '../contexts/userContext'
import { validateAccountCredentials } from '../functions/signup/validateAccountCredentials'

// Get the current screen width and height
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const CreateAccountScreen = ( { navigation }) => {
  // State for user information
  const {user, registerUser} = useUserContext()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')

  const handleSignUp = () => {
    let error = validateAccountCredentials(nickname, email, password, confirmPassword)
    if (error === "None") {
      registerUser(email, password, nickname);
    } else {
      Alert.alert('Sign Up Error', error, [{text: 'Ok'}]);
    }
  }

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
  

  // Use layout effect hook to navigate to the home screen if the user is authenticated and has recently signed in
  useLayoutEffect(() => {
    // If the user is authenticated and has recently signed in
    if (user) {
      // Navigate to the home screen
      navigation.replace("Home")
    }
  }, [user])
  

  return (
    <KeyboardAvoidingView behavior='position' style={styles.container}>
      <Text style={styles.brandText}>Create an Account</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Nickname</Text>
        <TextInput
          style={styles.input} placeholder="Enter your nickname..." placeholderTextColor={ '#222222' } paddingHorizontal = { screenWidth * 0.05 }
           type="text" value={nickname} onChangeText={(text) => setNickname(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input} placeholder="Enter your email..." placeholderTextColor={ '#222222' } paddingHorizontal = { screenWidth * 0.05 }
           type="text" value={email} onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.input} placeholder="Enter your password..." placeholderTextColor={ '#222222' } paddingHorizontal = { screenWidth * 0.05 }
          secureTextEntry type="password" value={password} onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Confirm Password</Text>
        <TextInput
          style={styles.input} placeholder="Enter your password..." placeholderTextColor={ '#222222' } paddingHorizontal = { screenWidth * 0.05 }
          secureTextEntry type="password" value={confirmPassword} onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>
      <Button style={styles.filledButton} type="transparent" onPress={() => handleSignUp()} title="Login">
        <Text style={styles.filledButtonText}>Create Account</Text>
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text style={styles.linkText}>Sign In</Text>
        </Text>
      </TouchableOpacity>
      <StatusBar style="light" />
    </KeyboardAvoidingView>
  )
}

export default CreateAccountScreen

const styles = StyleSheet.create({
  brandText: {
    fontSize: 50,
    fontWeight: "800",
    marginTop: screenHeight * 0.1,
    marginBottom: screenHeight * 0.01,
    color: "#0060ff",
    letterSpacing: -1.5,
    alignSelf: 'center',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "flex-start",
    backgroundColor: '#ffffff',
  },
  inputContainer: {
    marginVertical: 4
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
  inputLabel: {
    marginVertical: 1.5,
    fontSize: 16,
    fontWeight: '500',
    color: 'black'
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
  linkText: {
      color: '#0060ff',
      fontWeight: '600',
      fontSize: 18,
  },
  
});
