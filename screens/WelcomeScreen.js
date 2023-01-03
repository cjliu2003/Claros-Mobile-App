// Welcome screen provides user with option to login in or create an account. It's the top of the navigation stack.

import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Image } from "@rneui/base"

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
      <Text style={[styles.brandText, {marginTop: screenHeight * 0.1}]}>Claros</Text>

      <Image source={require('../assets/claros__hero-performance.png')} style={styles.image} />
      <Text style={styles.genericText}>The world's most powerful sports betting assistant</Text>
      <Button style={[styles.filledButton ]} type="transparent" title="Login" onPress={() => navigation.navigate('Create Account')}>
        <Text style={styles.filledButtonText}>Get Started</Text>
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text style={styles.linkText}>Sign In</Text>
        </Text>
      </TouchableOpacity>
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
    justifyContent: "flex-start",
    backgroundColor: '#ffffff',
  },
  brandText: {
    fontSize: 64,
    fontWeight: "800",
    marginTop: screenHeight * 0.05,
    marginBottom: screenHeight * 0.05,
    color: "#0060ff",
    letterSpacing: -1,
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
    marginVertical: screenHeight * 0.02,
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
  filledButton: {
    width: 300,
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
  });
