import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'

// Get the current screen width and height
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const HomeScreen = () => {
  return (
    <View>
      <Text style={styles.brandText}>Claros</Text>
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