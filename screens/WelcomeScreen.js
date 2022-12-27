import { KeyboardAvoidingView, StyleSheet, Text, TextStroke, TextInput, View, Dimensions } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Image, Input } from "@rneui/base"
import { useUserContext } from '../contexts/userContext'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const WelcomeScreen = ({ navigation }) => {
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
  
  return (
    <View style={styles.container}>
      <Text style={styles.brandText}>claros</Text>
      <Text style={styles.genericText}>I’m claros, the world’s most powerful sports betting assistant</Text>
      <Image source={require('../assets/welcome.png')} style={styles.image} />
      <Button style={[styles.filledButton ]} type="transparent" title="Login" onPress={() => navigation.navigate('Login')}>
        <Text style={styles.filledButtonText}>Login</Text>
      </Button>
      <Button style={[styles.outlineButton, { marginBottom: screenHeight * 0.05 }]} type="transparent" title="Create Account" onPress={() => navigation.navigate('Create Account')}>
        <Text style={styles.outlineButtonText}>Create Account</Text>
      </Button>
      <StatusBar style='light' />
    </View>
  );
};


export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "flex-end",
        backgroundColor: '#ffffff',
    },
    image: {
      width: screenWidth,
      height: screenHeight * 0.245,
      marginTop: screenHeight * 0.05,
      marginBottom: screenHeight * 0.05,
    },
    inputContainerLabel: {
        marginBottom: 8,
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 16,
    },
    input: {
        width: 325,
        marginTop: 10,
        paddingVertical: 10,
        borderColor: 'transparent',
        backgroundColor: '#0060ff',
        borderRadius: 32,
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
        backgroundColor: '#0060ff',
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
      marginBottom: screenHeight * 0.05,
    }
})
