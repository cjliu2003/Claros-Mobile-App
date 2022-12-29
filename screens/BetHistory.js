import { ScrollView, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useUserContext } from '../contexts/userContext'
import BetHistoryListItem from '../components/BetHistoryListItem'
import { calculateROI } from '../functions/calculations/calculateROI'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const BetHistory = ({navigation}) => {
    const {betHistory} = useUserContext()
    const [ROI, setROI] = useState(0)
    const goBack = () => {
        navigation.replace("Home")
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerTitleStyle: {color: "black"},
            headerStyle: {backgroundColor: "#fff"},
            headerTintColor: "black",
            headerLeft: () => (
                <TouchableOpacity onPress={() => goBack()}>
                    <Text style={styles.goBackButton}>Back</Text>
                </TouchableOpacity>
            ),
        });

        setROI(calculateROI(1, betHistory))
    }, [])
  return (
    <ScrollView style={styles.scrollContainer}>
        <Text style={styles.brandText}>bet history</Text>
        <Text style={styles.dateText}>Updated: {new Date().toString().substring(0,15)}</Text>
        <Text style={styles.roiText}>Lifetime returns on 1% unit size: {ROI}%</Text>
        {betHistory.map((line, i) => {
            return (
                <BetHistoryListItem key={line.id} line={line} idx={i + 1}/>
            )
        })}
    </ScrollView>
  )
}

export default BetHistory

const styles = StyleSheet.create({
    goBackButton: {
        paddingLeft: 16,
        fontSize: 16,
        fontWeight: '300',
    },
    roiText: {
        alignSelf: 'center',
        fontSize: 16,
        color: 'black',
        fontWeight: '400',
        padding: 16,
        borderWidth: 1,
        marginBottom: 16,
        borderRadius: 5,
    },
    headerText: {
        fontWeight: '800',
        alignSelf: 'center',
        fontSize: 24,
        marginBottom: 16,
    },
    scrollContainer: {
        width: screenWidth,
        height: '100%',
        padding: 16,
    },
    centered: {
        height: screenHeight * 0.75,
        marginLeft: screenWidth * 0.05,
        marginRight: screenWidth * 0.05,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        alignSelf: 'center',
        width: screenWidth * .35,
        height: screenWidth * .35,
        margin: 16,
    },
    image: {
      alignSelf: 'center',
      width: screenWidth * .50,
      height: screenWidth * .50,
    },
    pricingHdr: {
        fontSize: 30,
        fontWeight: '800',
        letterSpacing: -0.5,
        alignSelf: 'center',
    },
    pricingSubhdr: {
        fontSize: 20,
        fontWeight: '300',
        color: '#222222',
        textAlign: 'center',
        marginVertical: 16,
        width: 300,
        alignSelf: 'center',
    },
    pricingBtn: {
        width: 200,
        height: 75,
        backgroundColor: '#0060ff',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        margin: 16,
        alignSelf: 'center',
    },
    pricingBtnTxt: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        color: 'white',
    },
    inputContainerLabel: {
        marginBottom: 8,
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 16,
    },
    input: {
        width: 325,
        height: 56,
        marginTop: 10,
        paddingVertical: 10,
        borderColor: 'transparent',
        backgroundColor: '#f2f2f2',
        borderRadius: 11,
        color: 'black',
        fontWeight: '200',
    },
    errorMessage: {
        padding: 15,
        width: 300,
        color: '#b51c07',
        backgroundColor: '#b51c0720',
        fontWeight: '500',
    },
    inputContainer: {
        width: 325,
        marginTop: 10,
        paddingVertical: 10,
        borderColor: 'transparent',
        borderRadius: 32,
    },
    inputContainerText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
    },
    outlineButton: {
        width: 325,
        marginTop: 10,
        paddingVertical: 10,
        borderColor: '#000',
        backgroundColor: 'transparent',
        borderRadius: 32,
        borderWidth: 1.5,
    },
    fillButton: {
        width: 325,
        marginTop: 10,
        paddingVertical: 10,
        borderColor: '#000',
        backgroundColor: 'black',
        borderRadius: 32,
        borderWidth: 1.5,
    },
    noLinesMsg: {
        padding: 50,
        color: 'black',
        fontWeight: '400',
        fontSize: 16
    },
    filledButton: {
        width: 325,
        marginTop: 10,
        paddingVertical: 10,
        borderColor: 'transparent',
        backgroundColor: '#0060ff',
        borderRadius: 32,
    },
    outlineButtonText: {
        color: 'black',
        fontWeight: '600',
        fontSize: 18,
    },
    filledButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
    },
    genericText: {
        color: 'black',
        fontWeight: '200',
        fontSize: 20,
        textAlign: 'center',
    },
    dateText: {
        color: 'black',
        fontWeight: '200',
        fontSize: 20,
        textAlign: 'center',
        marginTop: screenHeight * 0.0125,
        marginBottom: screenHeight * 0.05,
    },
    homeHeaderText: {
        color: 'black',
        fontWeight: '600',
        fontSize: 20,
        textAlign: 'center',
        marginTop: screenHeight * 0.05,
    },
    
    brandText: {
        color: '#0060ff',
        fontWeight: '900',
        fontSize: 70,
        textAlign: 'center',
        marginTop: screenHeight * 0.025
    },
    headerText: {
        color: 'black',
        fontWeight: '200',
        fontSize: 16,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-end",
        backgroundColor: '#ffffff',
    },
    footerText: {
        width: screenWidth * 0.70,
        marginTop: screenHeight * 0.025,
        marginBottom: screenHeight * 0.055,
        color: 'black',
        fontWeight: '200',
        fontSize: 18,
        textAlign: 'center',
    },
})
