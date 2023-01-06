import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

// Get the current screen width and height
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const LinePage = ({setFeaturedLine, line}) => {
    const handleCloseButtonClick = () => {
        setFeaturedLine(null)
    }
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={handleCloseButtonClick}><Text style={styles.closeButtonText}>Close</Text></TouchableOpacity>
            <Text style={styles.headerTitle}>Line Details</Text>
            <Text style={{opacity: 0}}>Close</Text>
        </View>
        <View style={styles.title}>
            
        </View>
    </View>
  )
}

export default LinePage

const styles = StyleSheet.create({
    container: {
        height: screenHeight,
        top: 75,
        backgroundColor: 'white',
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        alignSelf: 'center'
    },
    header: {
        backgroundColor: "#0060ff",
        height: 60,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})