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


// Get the current screen width and height
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const LinePage = ({setFeaturedLine, line}) => {
    const {subscription} = useUserContext()
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
            <View style={styles.lineDetails}>
                <Text style={styles.lineTitle}>{parseName(line.league_name, line[findSide(line.home_ev, line.away_ev) + "_team_name"], line.market, line[findSide(line.home_ev, line.away_ev) + "_point"])}</Text>
                <Text style={styles.lineDate}>{parseDate(line.commence_time)}</Text>
                <Text style={styles.lineOdds}>{parseOdds(line[findSide(line.home_ev, line.away_ev) + "_odds"])}</Text>
                <Text style={styles.IPLabel}>Breakeven Hit Percentage: {(calculateIP(line[findSide(line.home_ev, line.away_ev) + "_odds"])).toFixed(2) + "%"}</Text>
                <View style={styles.edgeIndicator}>
                    {/* <View style={[styles.edgeBar, { width: `${(calculateIP(line[findSide(line.home_ev, line.away_ev) + "_odds"])).toFixed(2) + "%"}` }]} >
                    </View> */}
                    <LinearGradient colors={['#0060ff', '#39AAF3']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.edgeBar, { width: `${(calculateIP(line[findSide(line.home_ev, line.away_ev) + "_odds"])).toFixed(2) + "%"}` }]}></LinearGradient>
                </View>
                <View style={styles.AIFeaturesContainer}>
                    <View style={styles.AIFeatureContainer}>
                        <Text style={styles.AIFeatureHeader}>EDGE</Text>
                        {subscription != "none" ?
                            <Text style={styles.lineDetailsText}>
                                {(line.max_ev).toFixed(2)}%
                            </Text>
                            : 
                            <View style={styles.emptyBar}>
                                <Entypo style={{transform: [{skewX: '9deg'}]}} name="lock" size={18} color="black" />
                            </View>
                        }
                    </View>
                    <View style={styles.verticalLine} />
                    <View style={styles.AIFeatureContainer}>
                        <Text style={styles.AIFeatureHeader}>HIT CHANCE</Text>
                        {subscription != "none" ?
                            <Text style={styles.lineDetailsText}>
                                {(calculateIP(line[findSide(line.home_ev, line.away_ev) + "_odds"]) + 1.36).toFixed(2) + "%"}
                            </Text>
                            : 
                            <View style={styles.emptyBar}>
                                <Entypo style={{transform: [{skewX: '9deg'}]}} name="lock" size={18} color="black" />
                            </View>
                        }
                    </View>
                    <View style={styles.verticalLine} />
                    <View style={styles.AIFeatureContainer}>
                        <Text style={styles.AIFeatureHeader}>RATING</Text>
                        {subscription != "none" ?
                            <Text style={styles.lineDetailsText}>
                                A
                            </Text>
                            : 
                            <View style={styles.emptyBar}>
                                <Entypo style={{transform: [{skewX: '9deg'}]}} name="lock" size={18} color="black" />
                            </View>
                        }
                    </View>
                </View>
            </View>
        </View>
        
    )
}

export default LinePage

const styles = StyleSheet.create({
    AIFeaturesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: screenHeight * 0.05,
    },
    AIFeatureHeader: {
        fontSize: 16,
        fontWeight: '300',
        color: '#000000',
        alignSelf: 'flex-start',
    },
    verticalLine: {
        width: 2.5,
        height: '80%',
        alignSelf: 'center',
        backgroundColor: '#00000025',
        borderRadius: 3,
    },
    emptyBar: {
        width: 35,
        height: 35,
        alignSelf: 'center',
        marginTop: screenHeight * 0.020,
        backgroundColor: '#f2d607',
        alignItems: 'center',
        justifyContent: 'center',
        transform: [{ skewX: '-9deg' }],
        borderRadius: 2.5,
    },
    container: {
      height: screenHeight,
      top: 75,
      backgroundColor: 'white',
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: "#FFFFFF",
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: "#FFFFFF",
        alignSelf: 'center',
    },
    header: {
        backgroundColor: '#0060FF',
        height: 60,
        borderTopLeftRadius: 11,
        borderTopRightRadius: 11,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    lineOdds: {
        fontSize: 48,
        fontWeight: '800',
        color: '#000000',
        alignSelf: 'center',
        marginBottom: screenHeight * 0.025,
    },
    content: {
      padding: 20,
    },
    lineDetails: {
      alignItems: 'center',
      padding: screenWidth * 0.05
    },
    lineTitle: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: screenHeight * 0.01,
      textAlign: 'center',
    },
    IPLabel: {
        alignSelf: 'flex-start',
        fontSize: 16,
        fontWeight: '500',
        marginBottom: screenHeight * 0.01,
        color: '#000000'
    },
    lineDate: {
        fontSize: 16,
        color: '#999',
        marginBottom: screenHeight * 0.03,
        alignSelf: 'center',
    },
    edgeIndicator: {
      height: 18,
      width: '100%',
      backgroundColor: '#eeeeee',
      borderRadius: 15,
      overflow: 'hidden',
    },
    edgeBar: {
      height: '100%',
      backgroundColor: '#0060ff',
    },
    lineDetailsText: {
      fontSize: 20,
      fontWeight: '800',
      color: '#0060ff',
      marginTop: 10,
      alignSelf: 'center'
    },
  })