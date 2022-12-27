import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, Linking, Dimensions } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Button} from '@rneui/base'
import CustomListItem from "../components/customListItem"
import { useUserContext } from '../contexts/userContext'
import { parseDate } from '../functions/parseDate'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const HomeScreen = ({ navigation }) => {
    const {user, logoutUser, recentSignIn, setSignInError, setRecentSignIn, historicalBetslip} = useUserContext()

    const signOut = () => {
        logoutUser()
        setRecentSignIn(false);
        setSignInError(null);
        navigation.replace("Login")
    }

    const openCenterURL = () => {
      Linking.openURL('https://claros.ai/center').catch((error) => console.error(error));
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerTitleStyle: {color: "black"},
            headerStyle: {backgroundColor: "#fff"},
            headerTintColor: "black",
            headerLeft: () => (
              <View>
                  <Button onPress={() => signOut()}type="clear" style={styles.signOutButton}>
                      <Text style={styles.headerText}>Sign Out</Text>
                  </Button>
              </View>
            ),
        });
        if (!user && !recentSignIn) navigation.replace("Login")
    }, [])
  return (
      <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.dateText}>{new Date().toString().substring(0,15)}</Text>
        {historicalBetslip && <>
            {historicalBetslip.map((line, i) => {
                return (
                    <CustomListItem line={line} idx={i + 1}/>
                )
            })}
        </>}
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: screenHeight * 0.05 }}>
          <Button style={styles.outlineButton} type="transparent" onPress={() => openCenterURL()} title="Settings">
            <Text style={styles.outlineButtonText}>Account Settings</Text>
          </Button>
        </View>
        <View style={styles.footer}></View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({

    scrollContainer: {
        width: screenWidth,
        height: screenHeight,
    },
    image: {
      width: screenWidth * 0.75,
      height: screenHeight * 0.35,
      justifyContent: 'center'
    },
    inputContainerLabel: {
        marginBottom: 8,
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 16,
    },
    input: {
        width: 325,
        height: 56,
        marginTop: 10,
        paddingVertical: 10,
        borderColor: 'transparent',
        backgroundColor: '#f2f2f2',
        borderRadius: 11,
        color: 'black',
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
    genericText: {
        color: 'black',
        fontWeight: '200',
        fontSize: 20,
        textAlign: 'center',
    },
    dateText: {
        color: 'black',
        fontWeight: '200',
        fontSize: 20,
        textAlign: 'center',
        marginTop: screenHeight * 0.05,
        marginBottom: screenHeight * 0.05,
    },
    homeHeaderText: {
        color: 'black',
        fontWeight: '600',
        fontSize: 20,
        textAlign: 'center',
        marginTop: screenHeight * 0.05,
    },
    
    brandText: {
        color: '#0060ff',
        fontWeight: '900',
        fontSize: 70,
        textAlign: 'center',
    },
    headerText: {
        color: 'black',
        fontWeight: '200',
        fontSize: 16,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-end",
        backgroundColor: '#ffffff',
    },
    footerText: {
        width: screenWidth * 0.70,
        marginTop: screenHeight * 0.025,
        marginBottom: screenHeight * 0.055,
        color: 'black',
        fontWeight: '200',
        fontSize: 18,
        textAlign: 'center',
    },
})
