import { Alert, Dimensions, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, Vibration, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {Ionicons} from '@expo/vector-icons'
import { Button } from '@rneui/base';
import { useUserContext } from '../contexts/userContext';
import { validateCredentials } from '../functions/signup/validateCredentials';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const CreateAccountScreen = ({navigation}) => {
  const {user, authEmail, registerUser} = useUserContext()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  useLayoutEffect(() => {
    navigation.setOptions({
        title: "",
        headerStyle: {
            borderBottomWidth: 0,
            borderColor: 'transparent',
            shadowOpacity: 0,
        },
        headerLeft: () => (
            <TouchableOpacity style={styles.headerLeft} onPress={() => navigation.goBack()}>
                <Ionicons name="ios-arrow-back" size={35} />
            </TouchableOpacity>
        ),
      });
    }, [])

  useEffect(() => {
    if (user) navigation.navigate("Home")
  }, [user])
  


const signUpUser = () => {
  console.log(authEmail)
  const validation = validateCredentials(authEmail, password, confirmPassword)
  if (!validation) {
    registerUser(authEmail, password)
  } else {
    Alert.alert("Sign In Error", validation, [{Text: 'Ok'}])
  }
}


useEffect(() => {
  if (user) navigation.navigate("Home")
}, [user])
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
          <Text style={styles.largeBoldText}>Set your password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={ 'black' }
            paddingHorizontal = { screenWidth * 0.05 }
            type="password"
            fontSize= { 16 }
            value={password}
            secureTextEntry='true'
            onChangeText={(text) => setPassword(text)} 
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor={ 'black' }
            paddingHorizontal = { screenWidth * 0.05 }
            type="password"
            fontSize= { 16 }
            value={confirmPassword}
            secureTextEntry='true'
            onChangeText={(text) => setConfirmPassword(text)} 
          />
      </View>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={125}>
          <Button style={[styles.filledButton ]} type="transparent" onPress={() => signUpUser()}>
              <Text style={styles.filledButtonText}>Sign In</Text>
          </Button>
      </KeyboardAvoidingView>
    </View>
  )
}

export default CreateAccountScreen

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.75,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "flex-start",
    backgroundColor: '#ffffff',
    paddingHorizontal: 8
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
      marginVertical: screenHeight * 0.01,
      padding: 10,
      fontSize: 16,
  },
  headerLeft: {
      paddingLeft: 8,
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