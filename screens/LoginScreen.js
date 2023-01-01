// Login allows user to enter in email and password to sign into the app.

import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, TextInput, View, Dimensions } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Image, Input } from "@rneui/base"
import { useUserContext } from '../contexts/userContext'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const LoginScreen = ( { navigation }) => {
  const [orientation, setOrientation] = useState(null);

  useEffect(() => {
    const updateOrientation = () => {
      setOrientation(Dimensions.get('screen').width > Dimensions.get('screen').height ? 'landscape' : 'portrait');
    };

    updateOrientation();

    const changeEventListener = Dimensions.addEventListener('change', updateOrientation);

    // Return a function that removes the event listener
    return () => {
      changeEventListener.remove();
    };
  }, []);
  
  
  const {user, signInUserEmail, signInError, recentSignIn, setRecentSignIn} = useUserContext()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const signIn = async() => {
      if (email && password) {
          signInUserEmail(email, password);
          setRecentSignIn(true);
      } else {
          alert("Both fields must be complete. Please try again.")
      }
  }

  useLayoutEffect(() => {
    if (user && recentSignIn) navigation.replace("Chat")
  }, [user, recentSignIn])


  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      {signInError && <Text style={styles.errorMessage}>We were unable to recognize an account with that email and password. Please check your spelling and try again.</Text>}
      <Text style={[styles.brandText, {marginTop: screenHeight * 0.1}]}>login</Text>
      <Image source={require('../assets/login.png')} style={styles.image} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={ 'black' }
        paddingHorizontal = { screenWidth * 0.05 }
        type="Email"
        fontSize= { 16 }
        value={email}
        onChangeText={(text) => setEmail(text)} />
      <View></View>
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={ 'black' }
        paddingHorizontal = { screenWidth * 0.05 }
        secureTextEntry
        type="password"
        fontSize= { 16 }
        value={password}
        onChangeText={(text) => setPassword(text)}/>
    
      <Button style={styles.filledButton} type="transparent" onPress={signIn} title="Login">
        <Text style={styles.filledButtonText}>Login</Text>
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate('Create Account')}>
        <Text style={styles.footerText}>
          Don't have an account?{' '}
          <Text style={styles.linkText}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
      <StatusBar style="light" />
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

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
  errorMessage: {
      fontSize: 14,
      color: 'red',
      marginBottom: 10,
      width: screenWidth * 0.75,
      textAlign: 'center',
  },
  brandText: {
    fontSize: 64,
    fontWeight: "800",
    marginTop: screenHeight * 0.05,
    marginBottom: screenHeight * 0.05,
    color: "#0060ff"
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
