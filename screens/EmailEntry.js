import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, Animated, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useLayoutEffect, useState, useRef, useEffect } from 'react';
import { useScreenWidth, useScreenHeight } from "../contexts/useOrientation";
import Icon from 'react-native-vector-icons/Feather';
import { useUserContext } from '../contexts/userContext';

const EmailEntry = ( {navigation}) => {
    const screenWidth = useScreenWidth();
    const screenHeight = useScreenHeight();

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
                <TouchableOpacity style={styles(screenWidth, screenHeight).headerLeft} onPress={() => navigation.goBack()}>
                    <Icon name="chevrons-left" size={28} color={"#FFFFFF"} />
                </TouchableOpacity>
            ),
        });
    }, [])

    const handleContinueClick = async () => {
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
        <View style={styles(screenWidth, screenHeight).container}>
            <Animated.View style={[styles(screenWidth, screenHeight).container, { transform: [{ translateY }] }]}>
                <Text style={styles(screenWidth, screenHeight).brandText}>Email?</Text>
                <Text style={styles(screenWidth, screenHeight).callToActionText}>Enter your email to get started.</Text>
                <View style={styles(screenWidth, screenHeight).searchBarContainer}>
                    <TextInput
                        style={styles(screenWidth, screenHeight).searchInput}
                        placeholder="Email"
                        type="Email"
                        placeholderTextColor="#00000060"
                        enablesReturnKeyAutomatically="true"
                        value={email}
                        onChangeText={(text) => setEmail(text)} 
                        onSubmitEditing={() => handleContinueClick()}
                        returnKeyType="next"
                        autoCorrect={false}
                        autoCapitalize="none"
                        >
                    </TextInput>
                    <TouchableOpacity style={[styles(screenWidth, screenHeight).searchButton, { marginLeft: 10 }]} onPress={() => handleContinueClick()}>
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