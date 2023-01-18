import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Entypo } from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons'
import InAppWebBrowser from '../components/WebBrowser';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const PricingScreen = ({navigation}) => {
    const [currWebview, setCurrWebview] = useState("")
    const features = [
        "Unlimited Search Queries", "Constantly Updating Odds", "Simply Displayed Edge Calculation and Bet Rating"
    ]
    const handleCenterButtonClick = () => {
        navigation.navigate("Center")
    }
    
    const handleGetAccessClick = () => {
        setCurrWebview("pricing")
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.centerButton} onPress={handleCenterButtonClick}>
                <Ionicons name="person-circle" size={45} color="#0060FF" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Get unlimited search queries today!</Text>
            <View>
                <Text style={styles.featuresHeader}>Gain Access To</Text>
                {features.map((feature, i) => {
                    return (
                        <View key={i} style={styles.featureRowContainer}>
                            <Entypo name="check" size={24} color="black" />
                            <Text style={styles.featureText}>{feature}</Text>
                        </View>
                    )
                })}
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText} onPress={handleGetAccessClick}>Get Access </Text>
            </TouchableOpacity>
            <Modal transparent={true} animationType="fade" visible={currWebview === "pricing"}>
                <InAppWebBrowser url={'https://www.claros.ai/#pricing'} currWebview={currWebview} setCurrWebview={setCurrWebview}></InAppWebBrowser>
            </Modal>
        </View>
    )
}

export default PricingScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: screenHeight * 0.05,
        paddingHorizontal: screenWidth * 0.025,
        backgroundColor: '#f5f5f5',
    },
    centerButton: {
        alignSelf: 'flex-end'
    },
    headerText: {
        fontSize: 28,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 20,
    },
    featuresHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    featureRowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#0060ff',
        padding: 15,
        borderRadius: 5,
        margin: 15,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '800',
        color: '#fff',
        textAlign: 'center',
    },
    featureText: {
        fontSize: 18,
        fontWeight: '400',
        color: '#000',
        marginLeft: 4,
    }
});
