// Welcome screen provides user with option to login in or create an account. It's the top of the navigation stack.

import { StyleSheet, Text, View, Dimensions, Vibration, Animated, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'

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
  
  const handleEmailButtonClick = () => {
    Vibration.vibrate([0, 250])
    navigation.navigate('Email')
  }

  return (
    <View style={styles.container}>
      <Animated.View style={styles.container}>
        <Text style={[styles.brandText, {marginTop: screenHeight * 0.1}]}>Claros</Text>
        <Text style={styles.callToActionText}>Your personal sports betting assistant.</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleEmailButtonClick()}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style='light' />
      </Animated.View>
    </View>
    
  );
};

export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: "#0060FF",
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 100,
  },
  brandText: {
    fontSize: 84,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0,
  },
  callToActionText: {
    fontSize: 22,
    fontWeight: '200',
    color: "#FFFFFF",
    marginTop: 10,
    marginBottom: 60,
  },
  button: {
    height: 60,
    width: screenWidth * 0.75,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 0,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.75,
    backgroundColor: '#FFFFFF',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#0060FF"
  },
  image: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.25,
    marginVertical: screenHeight * 0.01,
  },
  genericText: {
    width: screenWidth * 0.75,
    fontSize: 30,
    fontWeight: "600",
    marginVertical: screenHeight * 0.05,
    textAlign: "center",
    color: "black"
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