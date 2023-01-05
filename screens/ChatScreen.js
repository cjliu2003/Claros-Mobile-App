import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { generateResponse } from '../functions/NLP/generateResponse';
import { Button } from '@rneui/base';
import { useUserContext } from '../contexts/userContext';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ChatScreen = ({ navigation }) => {
    const [input, setInput] = useState('')
    const [messages, setMessages]= useState([])
    const [responses, setResponses] = useState([])
    const {logoutUser, setRecentSignIn, setSignInError} = useUserContext()
    const addMessage = async () => {
      setMessages([...messages, input]);
      let response;
      try {
        response = await generateResponse(input);
      } catch (error) {
        console.error(error);
      }
      setResponses([...responses, response]);
      setInput('');
    };

    const handleQueryClick = (query) => {
        setInput(query)
    }

    return (
        <View style={styles.container}>
            {messages.length > 0 ?
            <>
              <ScrollView style={styles.scrollContainer}>
                {messages.map((msg, i) => {
                    return (
                        <>
                        <TouchableOpacity key={"Msg" + msg + i}style={styles.messageBox}>
                            <Text style={styles.messageText}>{msg}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity key={"Res" + msg + i}style={styles.responseBox}>
                            <Text style={styles.responseText}>{responses[i]}</Text>
                        </TouchableOpacity>
                        </>
                    )
                })}
              </ScrollView>
            </>
            :
              <ScrollView contentContainerStyle={styles.scrollContainer}>
                  <View style={styles.infoContainer}>
                      <Text style={styles.headerText}>Example Questions</Text>
                      <Text style={styles.text}>What should I bet on?</Text>
                      <Text style={styles.text}>Show me the best line on the market right now.</Text>
                      <Text style={styles.text}>Are there any good presently available bets?</Text>
                  </View>
                  <View style={styles.infoContainer}>
                      <Text style={styles.headerText}>Capabilities</Text>
                      <Text style={styles.text}>Finds value bets across over 35 sportsbooks.</Text>
                      <Text style={styles.text}>Accurately prices lines according to event outcome probabilities.</Text>
                      <Text style={styles.text}>Engages with users about betting related market information.</Text>
                  </View>
                  <View style={styles.infoContainer}>
                      <Text style={styles.headerText}>Limitations</Text>
                      <Text style={styles.text}>May sometimes provide inaccurate information</Text>
                      <Text style={styles.text}>May misinterpret or not recognize vague language</Text>
                      <Text style={styles.text}>Handles only sports betting related queries</Text>
                  </View>
              </ScrollView>
            }
            <KeyboardAvoidingView behavior='padding' style={styles.bottomContainer} keyboardVerticalOffset={100}>
              <View style={styles.inputContainer}>
                  <TextInput value={input} onChangeText={(text) => setInput(text)} style={styles.input} placeholder='Ask a question...' />
                  <TouchableOpacity style={styles.sendButton} onPress={() => addMessage()}>
                    <Text style={styles.whiteText} disabled={!input}>Send</Text>
                  </TouchableOpacity>
              </View>
              <Text style={styles.footerText}>Claros AI Betting Assistant. We aim to improve the strategies and mentalities of sports bettors and sharpen their behavior.</Text>
            </KeyboardAvoidingView>
        </View>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    scrollContainer: {
        height: '100%',
        width: screenWidth,
        marginTop: screenHeight * 0
    },
    line: {
        borderBottomColor: '#ccc',
        width: screenWidth,
        borderBottomWidth: 1,
        marginVertical: 8,
        marginTop: 48,
    },
    infoContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        paddingHorizontal: 16,
        marginTop: screenHeight * 0.05,
        marginLeft: screenWidth * 0.02
    },
    input: {
        alignSelf: 'flex-end',
    },
    headerText: {
        fontSize: 18,
        fontWeight: '500',
        marginVertical: 10,
    },
    text: {
        fontSize: 16,
        fontWeight: '300',
        marginVertical: 4,
        backgroundColor: '#f2f2f2',
        padding: 8,
    },
    bottomContainer: {
        flex: 1,
        width: screenWidth,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginBottom: screenHeight * 0.1,
        // position: 'absolute',
        backgroundColor: '#fff'
    },
    inputContainer: {
        flexDirection: 'row',
        width: screenWidth * 0.95,
        alignSelf: 'center',
        marginTop: 16,
    },
    input: {
        width: '80%',
        height: screenHeight * 0.05,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        paddingHorizontal: 10,
        fontWeight: '200',
        fontSize: 16,
        backgroundColor: 'white',
    },
    footerText: {
        fontSize: 12,
        width: screenWidth * 0.9,
        alignSelf: 'center',
        fontWeight: '300',
        color: 'black',
    },
    signOutText: {
        color: 'black',
        fontWeight: '400',
        fontSize: 16,
    },
    messageText: {
        fontSize: 16,
        fontWeight: '300',
        color: 'black'
    },
    messageBox: {
        padding: 15,
        backgroundColor: '#f2f2f2',
        borderRadius: 41,
        margin: 16,
        alignSelf: 'flex-end',
    },
    responseText: {
        fontSize: 16,
        fontWeight: '300',
        color: 'white'
    },
    responseBox: {
        padding: 15,
        backgroundColor: '#0060ff',
        borderRadius: 41,
        marginVertical: screenHeight * 0.01,
        margin: 32,
        alignSelf: 'flex-start',
    },
    sendButton: {
        width: '20%',
        marginLeft: 10,
        height: screenHeight * 0.05,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#0060ff',
    },
    signOutButton: {
        height: 50,
        widdth: 100,
    },
    whiteText: {
        color: 'white',
    },
  });
