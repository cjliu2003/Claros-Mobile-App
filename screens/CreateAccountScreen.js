import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, Animated, TouchableWithoutFeedback, Keyboard, Modal } from 'react-native';
import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useUserContext } from '../contexts/userContext';
import { useScreenWidth, useScreenHeight } from '../contexts/useOrientation';
import { validateCredentials } from '../functions/signup/validateCredentials';
import InAppWebBrowser from '../components/WebBrowser';

const CreateAccountScreen = ( {navigation} ) => {
  const [signUpTrigger, setSignUpTrigger] = useState(false)
  useEffect(() => {
    if (user) {
      navigation.replace("CTA")
    }
  }, [user, signUpTrigger])

  const screenWidth = useScreenWidth();
  const screenHeight = useScreenHeight();

  const {user, authEmail, registerUser} = useUserContext()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [currWebview, setCurrWebview] = useState("")

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
  
  const signUpUser = async() => {
    if (!acceptTerms) {
      Alert.alert("Please accept the terms and conditions")
    } else {
      const validation = validateCredentials(authEmail, password, confirmPassword)
      if (!validation) {
        await registerUser(password)
        setTimeout(() => {
          setSignUpTrigger(!signUpTrigger)
        }, 1500);
      } else {
        Alert.alert("Sign Up Error", validation, [{Text: 'Ok'}])
      }
    }
  }

  const handleTermsClick = () => {
    // Vibration.vibrate(0,250)
    setCurrWebview("terms")
  }

  return (
    <>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles(screenWidth, screenHeight).container}>
        <Animated.View style={[styles(screenWidth, screenHeight).container, { transform: [{ translateY }] }]}>
        <Text style={styles(screenWidth, screenHeight).brandText}>P-word?</Text>
          <Text style={styles(screenWidth, screenHeight).callToActionText}>Create account password to finish.</Text>
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
              returnKeyType="next"
            />
            <TextInput
              style={styles(screenWidth, screenHeight).searchInput}
              placeholder="Confirm Password"
              placeholderTextColor="#00000060"
              enablesReturnKeyAutomatically="true"
              type="password"
              value={confirmPassword}
              secureTextEntry='true'
              onChangeText={(text) => setConfirmPassword(text)} 
              onSubmitEditing={() => signUpUser()}
              returnKeyType="done"
            />
            <TouchableOpacity style={[styles(screenWidth, screenHeight).searchButton, { marginLeft: 10 }]} onPress={() => signUpUser()}>
              <Icon
                name="chevrons-right"
                size={28}
                color="#0060FF"
              />
            </TouchableOpacity>
          </View>
          <View style={styles(screenWidth, screenHeight).termsContainer}>
            <TouchableOpacity style={styles(screenWidth, screenHeight).checkbox} onPress={() => setAcceptTerms(!acceptTerms)}>
                <Icon name={acceptTerms ? "check-square" : "square"} size={24} color={"#ffffff85"} />
            </TouchableOpacity>
            <Text onPress={handleTermsClick} style={styles(screenWidth, screenHeight).legalText}>I accept the terms and conditions</Text>
          </View>

        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
      <Modal transparent={true} animationType="fade" visible={currWebview === "terms"}>
        <InAppWebBrowser url={'https://www.claros.ai/termsandconditions'} currWebview={currWebview} setCurrWebview={setCurrWebview}></InAppWebBrowser>
      </Modal>
      </>
  )
}

export default CreateAccountScreen

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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: screenHeight * 0.02,
  },
  checkbox: {
    marginRight: 10,
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
  legalText: {
    fontSize: 18,
    fontWeight: '200',
    color: "#FFFFFF",
  },
  searchInput: {
    height: 60,
    width: screenWidth * 0.325,
    borderRadius: 11,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 0,
    fontSize: 18,
    fontWeight: "200",
    marginLeft: 10,
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