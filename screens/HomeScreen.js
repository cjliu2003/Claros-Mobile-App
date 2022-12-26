import { SafeAreaView, ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, Dimensions, Header, TextInput } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import {Avatar, Button} from '@rneui/base'
import CustomListItem from "../components/customListItem"
import Logo from '../assets/claros__bot__logo.png'
import { StatusBar } from 'expo-status-bar'
import { useUserContext } from '../contexts/userContext'
import { formatDate } from 'react-native-localization';
import Moment from 'moment';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const HomeScreen = ({ navigation }) => {
  const {user, logoutUser, recentSignIn, setSignInError, setRecentSignIn, customer} = useUserContext()
  const [numLinesTexted, setNumLinesTexted] = useState(null)
  useLayoutEffect(() => {
    if (customer) setNumLinesTexted(customer.daily_lines_texted.length)
  }, [customer])

  const signOut = () => {
      logoutUser()
      setRecentSignIn(false);
      setSignInError(null);
      navigation.replace("Login")
  }
  useLayoutEffect(() => {
      navigation.setOptions({
          title: "Home",
          headerTitleStyle: {color: "black"},
          headerStyle: {backgroundColor: "#fffff"},
          headerTintColor: "black",
          
          headerRight: () => (
              <View>
                  <Button onPress={() => signOut()}type="clear" style={styles.signOutButton}>
                      <Text style={styles.signOutButtonText}>Sign Out</Text>
                  </Button>
              </View>
          )
      });
      if (!user && !recentSignIn) navigation.replace("Login")
  }, [])
  
  const date = new Date();
  var dt = date;
  
  const [userQuestion, setUserQuestion] = useState('');
  
  const handleSendPress = () => {
    // TODO
    setUserQuestion('');
  };

  return (
    <KeyboardAvoidingView behavior = 'padding' style={styles.container}>
      <Text style={styles.genericText}> {Moment(dt).format('YYYY-MM-DD')} </Text>
      <Button style={styles.sendButton} onPress={handleSendPress}></Button>
      <TextInput
        style={styles.input}
        value={userQuestion}
        onChangeText={text => setUserQuestion(text)}
      />
      <StatusBar style='light' />
    </KeyboardAvoidingView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        height: 46,
        marginTop: screenHeight * 0.05,
        marginBottom: screenHeight * 0.05,
        paddingVertical: 10,
        borderColor: 'transparent',
        backgroundColor: '#f2f2f2',
        borderRadius: 32,
        color: 'black',
        fontWeight: '200',
    },
    inputText: {
        marginLeft: screenWidth * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        fontSize: 18,
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
    sendButton: {
      width: 62,
      height: 62,
      borderRadius: 31,
      backgroundColor: '#0060ff',
        
    },
    genericText: {
        width: screenWidth * 0.70,
        color: 'black',
        fontWeight: '200',
        fontSize: 18,
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
