import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { generateResponse } from '../functions/NLP/generateResponse';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ChatScreen = ({ navigation }) => {
    const [input, setInput] = useState('')
    const [messages, setMessages]= useState([])
    const [responses, setResponses] = useState([])
    
    const signOut = () => {
        logoutUser()
        setRecentSignIn(false);
        setSignInError(null);
        navigation.replace("Login")
    }
    
    useLayoutEffect(() => {
        navigation.setOptions({
        title: 'Claros AI',
        headerTitleStyle: { color: 'black' },
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: 'black',
        headerLeft: null,
        });
    }, []);

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


    return (
        <View style={styles.container}>
            {messages.length > 0 ?
            <>
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
            </>
            :
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.headerText}>Example Queries</Text>
                        <Text style={styles.text}>What should I bet on?</Text>
                        <Text style={styles.text}>Show me the best line on the market right now.</Text>
                        <Text style={styles.text}>Are there any good presently available bets?</Text>
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
                <View style={styles.line} />
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

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
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
      marginTop: 8,
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
      backgroundColor: '#eeeeee75',
      padding: 8,
      borderRadius: 5,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 15,
        backgroundColor: 'white'
    },
    inputContainer: {
      flexDirection: 'row',
      width: screenWidth * 0.95,
      alignSelf: 'center',
      marginTop: 16,
    },
    input: {
      width: '80%',
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 10,
      backgroundColor: 'white',
    },
    footerText: {
        fontSize: 12,
        width: screenWidth * 0.9,
        alignSelf: 'center',
        marginVertical: screenHeight * 0.01,
        fontWeight: '300',
        color: 'black',
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
        marginVertical: screenHeight * 0.01,
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
      height: 40,
      backgroundColor: '#0060ff',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    whiteText: {
        color: 'white'
    },
  });
