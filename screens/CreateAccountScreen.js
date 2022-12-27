import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, Dimensions } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Image, Input } from "@rneui/base"
import { useUserContext } from '../contexts/userContext'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const CreateAccountScreen = ( { navigation }) => {
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
    if (user && recentSignIn) navigation.replace("Home")
  }, [user, recentSignIn])


  return (
    <KeyboardAvoidingView behavior = 'padding' style={styles.container}>
      {signInError && <Text style={styles.errorMessage}>We were unable to recognize an account with that email and password. Please check your spelling and try again.</Text>}
      <Text style={styles.brandText}>create account</Text>
      <Text style={styles.genericText}>You could be chatting with me in less than 2 minutes. Just create an account and we’ll soon be acquainted!</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor={ 'black' }
        paddingHorizontal = { screenWidth * 0.05 }
        type="Text"
        fontSize= { 16 }
        value={email}
        onChangeText={(text) => setEmail(text)} />
      <View></View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={ 'black' }
        paddingHorizontal = { screenWidth * 0.05 }
        type="Email"
        fontSize= { 16 }
        value={email}
        onChangeText={(text) => setEmail(text)} />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor={ 'black' }
        paddingHorizontal = { screenWidth * 0.05 }
        type="Text"
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
    
      <Button style={styles.filledButton} type="transparent" onPress={signIn} title="CreateAccount">
        <Text style={styles.filledButtonText}>Sign Up</Text>
      </Button>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Have an account? Login</Text>
      </View>
      
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
      marginBottom: screenHeight * 0.05,
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
})
