import { StyleSheet, View } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { useScreenWidth, useScreenHeight } from "../contexts/useOrientation";
import Spinner from 'react-native-loading-spinner-overlay';

const LoadingSpinner = (props) => {
    const screenWidth = useScreenWidth();
    const screenHeight = useScreenHeight();
    
    return (
        <View style={styles(screenWidth, screenWidth).loadingContainer}>
            <Spinner
              visible={true}
              color="#0060FF"
              animation="none"
              overlayColor='#FFFFFF00'
            />
        </View>
    )
}

export default LoadingSpinner;

const styles = (screenWidth, screenHeight) => StyleSheet.create({
    loadingContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: "absolute",
        zIndex: 100,
        backgroundColor: "#FFFFFF",
    },
});