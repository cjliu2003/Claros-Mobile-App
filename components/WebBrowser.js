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
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

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
                <View style={styles.headerCenterpiece}>
                    <Ionicons name="ios-lock-closed" color="#000000" size="16" />
                    <Text style={styles.urlText}>betonline.ag</Text>
                    
                </View>
                <AntDesign name="reload1" color="#0060FF" size="16" />
            </View>
            <WebView source={{ uri: 'https://decrypt.co/118545/developers-burn-5-trillion-bonk-as-solana-based-meme-coin-slides' }} startInLoadingState={true} scalesPageToFit={true}>
            </WebView>


            <View style={styles.footerContainer}>
                <Ionicons name="ios-chevron-back" color="#0060FF" size="30" />
                <Ionicons name="ios-chevron-forward" color="#0060FF" size="30" />
                <Ionicons name="ios-share-outline" color="#0060FF" size="30" />
                <FontAwesome name="safari" color="#0060FF" size="30" />
            </View>
            {/* <StatusBar style='light' /> */}
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
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        borderBottomColor: "#BDBDBD",
        borderBottomWidth: 0.5,
        padding: 12,
    },
    headerCloseText: {
        color: "#0060FF",
        fontSize: 18,
        fontWeight: '400',
        alignItems: 'flex-start',
    },
    headerCenterpiece: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    urlText: {
        fontSize: 17,
        fontWeight: '700',
        marginLeft: 5,
    },
    footerContainer: {
        backgroundColor: "#F3F3F3",
        height: screenHeight * 0.1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderTopColor: "#BDBDBD",
        borderTopWidth: 0.5,
        padding: 12,
    },
  })