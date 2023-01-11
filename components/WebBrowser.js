import { Dimensions, StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList, PanResponder } from 'react-native'
import React from 'react'
import { parseName } from '../functions/parsing/parseName';
import { findSide } from '../functions/parsing/findSide';
import { parseOdds } from '../functions/parsing/parseOdds';
import { parseDate } from '../functions/parsing/parseDate';
import {calculateIP} from '../functions/calculations/calculateIP'
import { LinearGradient } from 'expo-linear-gradient';
import {useUserContext} from '../contexts/userContext'
import { Entypo } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

// Get the current screen width and height
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const InAppWebBrowser = ({setFeaturedLine, line}) => {
    const {subscription} = useUserContext()
    const handleCloseButtonClick = () => {
        setFeaturedLine(null)
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleCloseButtonClick}>
                    <Text style={styles.headerCloseText}>Close</Text>
                </TouchableOpacity>
                
            </View>
            <WebView source={{ uri: 'https://claros.ai' }} startInLoadingState={true} scalesPageToFit={true}>
            </WebView>
            <View style={styles.footerContainer}></View>
        </View>
        
    )
}

export default InAppWebBrowser

const styles = StyleSheet.create({
    container: {
      height: screenHeight,
      backgroundColor: 'white',
    },
    headerContainer: {
        backgroundColor: '#FFFFFF',
        height: screenHeight * 0.1,
        padding: 30,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        borderBottomColor: "#0060FF",
        
    },
    headerCloseText: {
        color: "#0060FF",
        fontSize: 18,
        fontWeight: '400',
        alignItems: 'flex-start'
    },
    footerContainer: {
        backgroundColor: "#FFFFFF",
        height: screenHeight * 0.1
    },
  })