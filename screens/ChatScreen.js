import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const ChatScreen = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
        title: 'Claros AI',
        headerTitleStyle: { color: 'black' },
        headerStyle: { backgroundColor: '#fff' },
        headerTintColor: 'black',
        headerLeft: null,
        });
    }, []);

return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.infoContainer}>
            <Text style={styles.headerText}>Example Queries</Text>
            <Text style={styles.text}>What's the best line on BetUS right now?</Text>
            <Text style={styles.text}>Show me a profitable line based on my sportsbooks.</Text>
            <Text style={styles.text}>Are there any good NBA bets tonight?</Text>
        </View>
        <View style={styles.infoContainer}>
            <Text style={styles.headerText}>Limitations</Text>
            <Text style={styles.text}>May sometimes provide inaccurate information</Text>
            <Text style={styles.text}>May misinterpret or not recognize vague language</Text>
            <Text style={styles.text}>Handles only sports betting related queries</Text>
        </View>
    </ScrollView>
    <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder='Hi' />
        <TouchableOpacity style={styles.sendButton}>
            <Text>Send</Text>
        </TouchableOpacity>
    </View>
    </View>
);
};

export default ChatScreen

const styles = StyleSheet.create({
    container: {
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
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
    inputContainer: {
      flexDirection: 'row',
      width: screenWidth,
      alignSelf: 'flex-end',
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
    sendButton: {
      width: '20%',
      height: 40,
      backgroundColor: '#0060ff',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
