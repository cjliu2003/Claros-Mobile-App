import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard, Animated } from 'react-native'
import React, { useEffect, useLayoutEffect, useState, useRef } from 'react'
import Icon from 'react-native-vector-icons/Feather';
import { useScreenWidth, useScreenHeight } from "../contexts/useOrientation";
import { useUserContext } from '../contexts/userContext';
import { invokeAddUserToVulcanLambda } from '../functions/search/searchQueryStorage';

const LoginScreen = ({navigation}) => {
  const screenWidth = useScreenWidth();
  const screenHeight = useScreenHeight();

  const {user, authEmail, signInUserEmail} = useUserContext()
  const [password, setPassword] = useState("")
  const [signInTrigger, setSignInTrigger] = useState(false)

  useEffect(() => {
    if (user && signInTrigger) {
      navigation.replace("Home")
    }
  }, [user, signInTrigger])
  
  useLayoutEffect(() => {
    navigation.setOptions({
        title: "",
        headerStyle: {
            borderBottomWidth: 0,
            borderColor: 'transparent',
            shadowOpacity: 0,
            backgroundColor: "#0060FF"
        },
        headerLeft: () => (
          <TouchableOpacity style={styles(screenWidth, screenHeight).headerLeft} onPress={() => navigation.goBack()}>
            <Icon name="chevrons-left" size={28} color={"#FFFFFF"} />
          </TouchableOpacity>
        ),
    });
  }, [])
  
  // From Jax: Adding in fucntionality to check user relation in Vulcan, priming PGSQL for relations
  // needed to store user queries.
  const signIn = async () => {
    if (authEmail && password !== "") {
      // signInUserEmail and navigate to Home
      const uid = await signInUserEmail(authEmail, password); // signInUserEmail returns the UID string as the response object

      // Now to ensure user is in Vulcan, we make a call to function which makes post request to addUserToVulcan AWS lambda function
      // await invokeAddUserToVulcanLambda(uid);
      setSignInTrigger(true)

    } else {
      Alert.alert("Please make sure both fields are filled.")
    }
  }

  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardWillShow', (event) => {
      setKeyboardHeight(event.endCoordinates.height);
    });
    const keyboardHideListener = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  Animated.spring(translateY, {
    toValue: -1/2 * keyboardHeight,
    duration: 10,
    bounciness: 10,
    useNativeDriver: true,
  }).start();
    
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles(screenWidth, screenHeight).container}>
        <Animated.View style={[styles(screenWidth, screenHeight).container, { transform: [{ translateY }] }]}>
          <Text style={styles(screenWidth, screenHeight).brandText}>P-word?</Text>
          <Text style={styles(screenWidth, screenHeight).callToActionText}>Welcome Back! Enter your password.</Text>
          <View style={styles(screenWidth, screenHeight).searchBarContainer}>
            <TextInput
              style={styles(screenWidth, screenHeight).searchInput}
              placeholder="Password"
              placeholderTextColor="#00000060"
              enablesReturnKeyAutomatically="true"
              type="password"
              value={password}
              secureTextEntry='true'
              onChangeText={(text) => setPassword(text)}
              onSubmitEditing={() => signIn()}
              returnKeyType="done"
              />
            <TouchableOpacity style={[styles(screenWidth, screenHeight).searchButton, { marginLeft: 10 }]} onPress={() => signIn()}>
              <Icon
                name="chevrons-right"
                size={28}
                color="#0060FF"
              />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  )
}


export default LoginScreen

const styles = (screenWidth, screenHeight) => StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: "#0060FF"
    },
    searchBarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    brandText: {
      fontSize: 72,
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
    searchInput: {
      height: 60,
      width: screenWidth * 0.65,
      borderRadius: 11,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 0,
      fontSize: 18,
      fontWeight: "200",
      color: "black",
      shadowColor: '#FFFFFF',
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 5,
      shadowOpacity: 0.75,
      backgroundColor: '#FFFFFF',
    },
    searchButton: {
      width: 70,
      height: 60,
      borderRadius: 11,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    filledButton: {
        width: screenWidth * 0.75,
        marginTop: 10,
        paddingVertical: 10,
        borderColor: 'transparent',
        backgroundColor: 'black',
        borderRadius: 50,
        alignSelf: 'center',
    },
    filledButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
    },
    input: {
        height: screenHeight * 0.075,
        width: screenWidth * 0.8,
        borderColor: '#00000030',
        borderWidth: 0.5,
        borderRadius: 8,
        marginBottom: screenHeight * .1,
        padding: 10,
        fontSize: 16,
    },
    headerLeft: {
        marginLeft: 20,
    },
    largeBoldText: {
        fontSize: 40,
        fontWeight: '800',
        textAlign: 'center',
        letterSpacing: -1.5,
        color: "#0060ff",
        marginBottom: screenHeight * 0.1,
        marginTop: screenHeight * 0.02,
    },
})