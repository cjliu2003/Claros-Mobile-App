// Welcome screen provides user with option to login in or create an account. It is the top of the navigation stack.

import { StyleSheet, Text, View, Animated, Easing, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import { useScreenWidth, useScreenHeight } from "../contexts/useOrientation";
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomeScreen = ({ navigation }) => {
  const screenWidth = useScreenWidth();
  const screenHeight = useScreenHeight();

  const handleEmailButtonClick = () => {
    navigation.navigate('Email')
  }
  
  const [animation, setAnimation] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, []);

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Animated.View style={[styles(screenWidth, screenHeight).container, {opacity}]}>
      <Animated.View style={styles(screenWidth, screenHeight).container}>
        {/* <Image 
          style={[styles(screenWidth, screenHeight).fullTextLogo, {marginTop: screenHeight * 0.1}]} 
          source={require('../assets/claros__full__text__logo__dark.png')}
        /> */}
        <Text style={[styles(screenWidth, screenHeight).brandText, {marginTop: screenHeight * 0.1}]}>Claros</Text>
        <Text style={styles(screenWidth, screenHeight).callToActionText}>Your personal sports betting assistant.</Text>
        <View style={styles(screenWidth, screenHeight).buttonContainer}>
          <TouchableOpacity style={styles(screenWidth, screenHeight).button} onPress={() => handleEmailButtonClick()}>
            <Text style={styles(screenWidth, screenHeight).buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style='light' />
      </Animated.View>
    </Animated.View>
    
  );
};

export default WelcomeScreen

const styles = (screenWidth, screenHeight) => StyleSheet.create({
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
  },
  brandText: {
    fontSize: 84,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0,
  },
  fullTextLogo: {
    height: screenHeight * 0.05,
    width: screenWidth * 0.65,

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
    // width: screenWidth * 0.9,
    // height: screenHeight * 0.25,
    // marginVertical: screenHeight * 0.01,
  },
  genericText: {
    // width: screenWidth * 0.75,
    fontSize: 30,
    fontWeight: "600",
    // marginVertical: screenHeight * 0.05,
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