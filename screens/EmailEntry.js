import { Alert, Dimensions, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, Vibration, View, Animated, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useLayoutEffect, useState, useRef, useEffect } from 'react'
import { Button } from '@rneui/base';
import Icon from 'react-native-vector-icons/Feather';
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
                backgroundColor: "#0060FF"
            },
            headerLeft: () => (
                <TouchableOpacity style={styles.headerLeft} onPress={() => navigation.goBack()}>
                    <Icon name="chevrons-left" size={28} color={"#FFFFFF"} />
                </TouchableOpacity>
            ),
        });
    }, [])

    const handleContinueClick = async () => {
        Vibration.vibrate(0, 500)
        if (!email || email === "" || !email.includes('@')) {
            Alert.alert('Error', 'Please enter in a valid email', [{text: 'Retry'}])
        } else {
            setAuthEmail(email)
            const isAuthenticated = await isAuthenticatedEmail(email);
            if (isAuthenticated) {
                navigation.navigate('Login');
            } else {
                navigation.navigate('Create Account');
            }
        }
    };

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
        <View style={styles.container}>
            <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
                <Text style={styles.brandText}>Email?</Text>
                <Text style={styles.callToActionText}>Enter your email to get started!</Text>
                <View style={styles.searchBarContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Email"
                        type="Email"
                        placeholderTextColor="#00000060"
                        enablesReturnKeyAutomatically="true"
                        value={email}
                        onChangeText={(text) => setEmail(text)} 
                        >
                    </TextInput>
                    <TouchableOpacity style={[styles.searchButton, { marginLeft: 10 }]} onPress={() => handleContinueClick()}>
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

export default EmailEntry

const styles = StyleSheet.create({
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