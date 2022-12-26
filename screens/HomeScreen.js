import { SafeAreaView, ScrollView, StyleSheet, Text, View, Linking } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Button} from '@rneui/base'
import CustomListItem from "../components/customListItem"
import { useUserContext } from '../contexts/userContext'
import { parseDate } from '../functions/parseDate'
const HomeScreen = ({ navigation }) => {
    const {user, logoutUser, recentSignIn, setSignInError, setRecentSignIn, historicalBetslip} = useUserContext()

    const signOut = () => {
        logoutUser()
        setRecentSignIn(false);
        setSignInError(null);
        navigation.replace("Login")
    }

    const openCenterURL = () => {
        Linking.openURL('https://www.claros.ai/center')
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Home",
            headerTitleStyle: {color: "black"},
            headerStyle: {backgroundColor: "#fff"},
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ marginLeft: 20}}>
                    <Text onPress={() => openCenterURL()} style={styles.settingsButtonText}>Settings</Text>
                </View>
            ),
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
  return (
      <SafeAreaView>
      <ScrollView contentContainerStyle={styles.headerContainer}>
        <Text style={styles.dateHeader}>{new Date().toString().substring(0,15)}</Text>
        <Text style={styles.header}>Current Value Opportunities</Text>
        <Text style={styles.subHeader}>The following list represents current betting market value opportunities (lines that are mispriced). We recommend placing 1% of your bankroll on each bet.</Text>
        <Text style={styles.subHeader}>To edit which sportsbooks you have access to, account settings, or subscription management, please go to www.claros.ai/center</Text>
        {historicalBetslip && <>
            {historicalBetslip.map((line, i) => {
                return (
                    <CustomListItem line={line} idx={i + 1}/>
                )
            })}
        </>}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    webView: {
        width: 300,
        maxHeight: 200,
        flex: 1,
    },
    subHeader: {
        fontSize: 16,
        fontWeight: "400",
        margin: 12,
        color: '#222222',
    },
    dateHeader: {
        fontSize: 16,
        fontWeight: "500",
        marginLeft: 12,
        marginTop: 12,
        color: 'black',
    },
    header: {
        fontSize: 24,
        fontWeight: "800",
        marginLeft: 12,
        marginVertical: 6,
        color: 'black',
    },
    signOutButtonText: {
        color: '#b51c07',
        fontSize: 16,
        fontWeight: '500',
    },
    settingsButtonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '500',
    },
})