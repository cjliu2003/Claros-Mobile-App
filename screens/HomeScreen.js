import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import {Avatar, Button} from '@rneui/base'
import CustomListItem from "../components/customListItem"
import Logo from '../assets/claros__bot__logo.png'
import { useUserContext } from '../contexts/userContext'
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
            headerStyle: {backgroundColor: "#fff"},
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ marginLeft: 20}}>
                    <Avatar source={Logo}/>
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
      <ScrollView>
        <Text style={styles.header}>Current Value Opportunities</Text>
        {numLinesTexted && <>{numLinesTexted > 0 ? 
        <>{customer[daily_lines_texted].map((line) => {
            return (
                <CustomListItem />
            )
        })}</>
        : <Text></Text>}</>}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: "800",
        margin: 12,
    },
    signOutButtonText: {
        color: '#b51c07',
        fontSize: 16,
        fontWeight: '500',
    }
})