import { Dimensions, Share, StyleSheet, Text, TouchableOpacity, View, Image, Linking } from 'react-native'
import React, { useRef, useState } from 'react'
import { useUserContext } from '../contexts/userContext'
import { WebView } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icons from '../assets/Icons';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';
import Spinner from 'react-native-loading-spinner-overlay';

// Get the current screen width and height
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const InAppWebBrowser = (props) => {
    const [pageIsLoading, setPageIsLoading] = useState("false");

    const handleCloseButtonClick = () => {
        setPageIsLoading(false);
        props.setCurrWebview("");
    }
    const handleSafariButtonClick = () => {
        Linking.openURL(props.url);
    }
    const handleShareButtonClick = () => {
        Share.share({
            message: props.url,
        });
    }
    const webViewRef = useRef(null);
    const handleBackButtonClick = () => {
        webViewRef.current.goBack();
    }
    const handleForwardButtonClick = () => {
        webViewRef.current.goForward();
    }
    const handleReloadClick = () => {
        webViewRef.current.reload();
    }

    const handleOnLoadStart = () => {
        setPageIsLoading(true);
    }
    
    const handleOnLoadEnd = () => {
        setPageIsLoading(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                {/* <View style={styles.headerCloseContainer}> */}
                <TouchableOpacity onPress={handleCloseButtonClick}>
                    <Text style={styles.headerCloseText}>Close</Text>
                </TouchableOpacity>
                {/* </View> */}
                <View style={styles.headerCenterpiece}>
                    <Ionicons name="ios-lock-closed" color="#000000" size="16"></Ionicons>
                    <Text style={styles.urlText}>claros.ai</Text>
                </View>
                <TouchableOpacity onPress={handleReloadClick}>
                    <AntDesign name="reload1" color="#0060FF" size="18" />
                </TouchableOpacity>
                
            </View>
            <WebView 
                ref={webViewRef} 
                source={{ uri: props.url }} 
                startInLoadingState={true} 
                scalesPageToFit={true}
                onLoadStart={handleOnLoadStart}
                onLoadEnd={handleOnLoadEnd}
                >
            </WebView>
            <View style={styles.footerContainer}>
                <TouchableOpacity onPress={handleBackButtonClick}>
                    <Entypo name="chevron-thin-left" color="#0060FF" size="22" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleForwardButtonClick}>
                    <Entypo name="chevron-thin-right" color="#0060FF" size="22" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleShareButtonClick}>
                    <Feather name="share" color="#0060FF" size="22" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSafariButtonClick}>
                    <MaterialCommunityIcons name="apple-safari" color="#0060FF" size="24" />
                </TouchableOpacity>
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
        justifyContent: 'space-between',
        borderBottomColor: "#BDBDBD",
        borderBottomWidth: 0.5,
        paddingBottom: 12,
        paddingRight: 17,
        paddingLeft: 17,
    },
    headerCloseText: {
        color: "#0060FF",
        fontSize: 18,
        fontWeight: '400',
        alignItems: 'flex-start',
    },
    headerCloseContainer: {
        flex: 1,
        borderColor: "#000000",
        borderWidth: 1
    },
    headerCenterpiece: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',

    },
    headerReloadContainer: {
        flex: 1,
        borderColor: "#000000",
        borderWidth: 1
    },
    padlockProps: {
        flex: 0,
        width: 16,
        height: 16,
        resizeMode: 'contain'
    },
    urlText: {
        fontSize: 17,
        fontWeight: '700',
        marginLeft: 5,
    },
    footerContainer: {
        backgroundColor: "#F3F3F3",
        height: screenHeight * 0.09,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        borderTopColor: "#BDBDBD",
        borderTopWidth: 0.5,
        paddingTop: 12,
        paddingRight: 17,
        paddingLeft: 17,
    },
    loadingScreen: {
        top: screenHeight * 0.1,
        bottom: screenHeight * 0.09,
    },
  })