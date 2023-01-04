import { Alert, Dimensions, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, Vibration, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import {Ionicons} from '@expo/vector-icons'
import { Button } from '@rneui/base';
import { useUserContext } from '../contexts/userContext';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const EmailEntry = ( {navigation}) => {
    const {setAuthEmail, isAuthenticatedEmail} = useUserContext()
    const [email, setEmail] = useState("")

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

    const handleContinueClick = async () => {
        Vibration.vibrate(0, 500)
        if (!email || email === "" || !email.includes('@')) {
            Alert.alert('Error', 'Please enter in a valid email', [{text: 'Ok'}])
        } else {
            const isAuthenticated = await isAuthenticatedEmail(email);
            if (isAuthenticated) {
                setAuthEmail(email)
                navigation.navigate('Login');
            } else {
                navigation.navigate('Create Account');
            }
        }
    };
    
  return (
    <View style={{flex: 1}}>
        <View style={styles.container}>
            <Text style={styles.largeBoldText}>What's your email?</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={ 'black' }
                paddingHorizontal = { screenWidth * 0.05 }
                type="Email"
                fontSize= { 16 }
                value={email}
                onChangeText={(text) => setEmail(text)} 
                />
        </View>
    <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={125}>
        <Button style={[styles.filledButton ]} type="transparent" onPress={() => handleContinueClick()}>
            <Text style={styles.filledButtonText}>Continue</Text>
        </Button>
    </KeyboardAvoidingView>
    </View>
  )
}


export default EmailEntry

const styles = StyleSheet.create({
    container: {
        height: screenHeight * 0.75,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "flex-start",
        backgroundColor: '#ffffff',
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