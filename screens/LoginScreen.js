import { Linking, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Image, Input } from "@rneui/base"
import { useUserContext } from '../contexts/userContext'

const LoginScreen = ( { navigation }) => {
    const {user, signInUserEmail, signInError, recentSignIn, setRecentSignIn} = useUserContext()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const signIn = async() => {
        if (email && password) {
            signInUserEmail(email, password);
            setRecentSignIn(true);
        } else {
            alert("Both fields must be complete. Please try again.")
        }
    }

    const openCenterURL = () => {
        Linking.openURL('https://www.claros.ai/signup')
    }

    useLayoutEffect(() => {
      if (user && recentSignIn) navigation.replace("Home")
    }, [user, recentSignIn])


  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.title}>Welcome to Claros Beta!</Text>
        <Image 
            source={{
                uri:
                    "https://claros.ai/static/media/claros__iPhone.3b992702d25ea70ff18d.png",
            }} 
            style={{ width: 200, height: 200 }}
        />

        {signInError && <Text style={styles.errorMessage}>We were unable to recognize an account with that email and password. Please check your spelling and try again.</Text>}
        <View style={styles.inputContainer}>
            <Text style={styles.inputContainerLabel}>Email</Text>
            <TextInput style={styles.input} placeholder="Email" autoFocus type="Email" value={email} onChangeText={(text) => setEmail(text)} />
            <Text style={styles.inputContainerLabel}>Password</Text>
            <TextInput style={styles.input} placeholder="Password" secureTextEntry autoFocus type="password"  value={password} onChangeText={(text) => setPassword(text)}/>
        </View>
        <Button style={styles.loginButton} type="transparent" onPress={signIn} title="Login">
            <Text style={styles.loginButtonText}>Login</Text>
        </Button>
        <Button style={styles.createAccountButton} type="transparent" onPress={signIn} title="Login">
            <Text style={styles.createAccountButtonText} onPress={() => openCenterURL()}>Create An Account</Text>
        </Button>
        <View style={{height: 100}}/>
        <StatusBar style="light" />
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        background: "white",
    },
    title: {
        fontSize: 36,
        textAlign: 'center',
        fontWeight: '600',
        color: 'black',
        marginBottom: 32,
    },
    inputContainerLabel: {
        marginBottom: 8,
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 16,
    },
    input: {
        borderWidth: 1,
        borderRadius: 25,
        padding: 16,
        borderColor: '#aaaaaa',
        marginBottom: 24,
    },
    errorMessage: {
        padding: 15,
        marginVertical: 16,
        width: 300,
        color: '#b51c07',
        backgroundColor: '#b51c0720',
        fontWeight: '500',
    },
    inputContainer: {
        width: 300,
    },
    inputContainerText: {
        marginVertical: 10,
        
    },
    loginButton: {
        width: 300,
        marginTop: 10,
        paddingVertical: 10,
        borderColor: '#000',
        backgroundColor: 'transparent',
        borderRadius: 30,
        borderWidth: 1,
    },
    createAccountButton: {
        width: 300,
        marginTop: 10,
        paddingVertical: 10,
        borderColor: 'transparent',
        backgroundColor: '#0060ff',
        borderRadius: 30,
    },
    loginButtonText: {
        color: 'black',
        fontWeight: '600',
        fontSize: 16,
    },
    createAccountButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    }
})