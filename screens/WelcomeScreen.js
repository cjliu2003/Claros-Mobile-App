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
      <Text style={styles.brandText}>claros</Text>
      <Image source={require('../assets/claros__hero-performance.png')} style={styles.image} />
      <Text style={styles.genericText}>The most powerful sports betting assistant</Text>
      <Button style={[styles.filledButton ]} type="transparent" title="Login" onPress={() => navigation.navigate('Create Account')}>
        <Text style={styles.filledButtonText}>Get Started</Text>
      </Button>
      <View style={styles.justifyCenter}>
        <Text style={styles.bottomLoginText}>Have an account? </Text><TouchableOpacity onPress={() => navigation.navigate("Login")}style={styles.justifyCenter}><Text style={styles.blueLink}>Login</Text></TouchableOpacity>
      </View>
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
  justifyCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandText: {
    fontSize: 64,
    fontWeight: "800",
    marginTop: screenHeight * 0.05,
    marginBottom: screenHeight * 0.05,
    color: "#0060ff"
  },
  image: {
    width: screenWidth,
    height: screenHeight * 0.30,
    marginVertical: screenHeight * 0.03,
  },
  genericText: {
    width: screenWidth * 0.75,
    fontSize: 30,
    fontWeight: "600",
    marginVertical: screenHeight * 0.02,
    textAlign: "center",
    color: "black"
  },
  bottomLoginText: {
    color: 'black',
    fontWeight: '300',
    fontSize: 16,
  },
  blueLink: {
    color: '#0060ff',
    fontWeight: '400',
    fontSize: 16,
    marginVertical: screenHeight * 0.01,
    textDecorationLine: 'underline'
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
