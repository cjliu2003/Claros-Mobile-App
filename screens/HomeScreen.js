import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useUserContext } from '../contexts/userContext';
import { Button } from '@rneui/base';

// Get the current screen width and height
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const HomeScreen = ({navigation}) => {
  const {user, logoutUser} = useUserContext()
  useEffect(() => {
    if (!user) navigation.navigate("Welcome")
  }, [user])

  const signOut = () => {
    logoutUser()
    navigation.navigate("Welcome")
  }


  
  return (
    <View>
      <Text style={styles.brandText}>Claros</Text>
      <TouchableOpacity onPress={() => signOut()}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    brandText: {
        fontSize: 50,
        fontWeight: "800",
        marginTop: screenHeight * 0.1,
        marginBottom: screenHeight * 0.01,
        color: "#0060ff",
        letterSpacing: -1.5,
        alignSelf: 'center',
        textAlign: 'center',
    },
})