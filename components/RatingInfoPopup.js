import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {useUserContext} from '../contexts/userContext'
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

// Get the current screen width and height
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const RatingInfoPopUp = (props) => {
    const handleCloseButtonClick = () => {
        props.setIsRatingInfoPressed(false);
    }

    // To ensure our info pop up is positioned on top of the cardContainer deployed in SearchResult,
    // we take the cardContainer positions(x, y) which are neccessarily passed in as props when
    // <RatingInfoPopUp is called />
    const { top, left } = props.position;

    return (
        <View style={[styles.cardContainer, { top, left }]}>
            <View style={styles.cardRow1}></View>
                <Text style={styles.lineLocation}>
                    We the people of the United States, 
                    in order to form a more perfect union, 
                    establish justice, ensure domestic tranquility, 
                    provide for the common defense, promote the general welfare,
                    and secure the blessings of liberty - to ourselves and
                    our posterity - do ordain and establish this Constitution
                    of the United States of America.
                
                </Text>
            <View style={styles.cardRow2}></View>
            <View style={styles.cardRow3}></View>
            <View style={styles.cardRow4}></View>
            <View style={styles.cardRow5}>
                <TouchableOpacity onPress={handleCloseButtonClick}>
                    <Text>Close</Text>
                </TouchableOpacity>
            </View>
            
      </View>

    )
}

export default RatingInfoPopUp;

const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: 11,
      shadowColor: '#00000060',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.50,
      shadowRadius: 3,
      marginVertical: screenHeight * 0.015,
      paddingHorizontal: 15,
      paddingVertical: 15,
      width: screenWidth * 0.9,
      position: 'absolute',
    },
    cardBookLogo: {
      height: 20,
      width: 80,
      resizeMode: 'contain',
    },
    cardBookLabel: {
      fontSize: 12,
      color: '#333'
    },
    cardRow1: {
    //   flexDirection: 'row',
    //   alignItems: 'center',
    //   justifyContent: 'space-between',
    //   marginBottom: 10,
    },
    cardRow2: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    cardRow3: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    cardRow4: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardRow5: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10, 
      marginTop: screenHeight * 0.02, 
      borderRadius: 5
    },
    bookmakerTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: "#000000",
      textAlign: 'left',
    },
    lineTitle: {
      fontSize: 14,
      fontWeight: '700',
      color: '#000000',
      textAlign: 'right',
      ellipsizeMode: 'true',
    },
    lineTitleBackground: {
      flex: 0,
      backgroundColor: "#00E0FF12",
      padding: 5,
      borderRadius: 5,
      maxWidth: '60%'
    },
    lineTeamName: {
      fontSize: 14,
      fontWeight: '600',
      color: "#000000",
      maxWidth: screenWidth * 0.25,
      textAlign: 'center',
    },
    lineLocation: {
      fontSize: 14,
      fontWeight: '200',
      color: "#7B7D86",
    //   maxWidth: screenWidth * 0.40,
      textAlign: 'left',
    },
    lineDate: {
      fontSize: 11,
      fontWeight: '400',
      color: '#7B7D86',
      alignSelf: 'center',
    },
    ratingsCategoryText: {
      fontSize: 14,
      fontWeight: '400',
      alignSelf: 'flex-start'
    },
    ratingsMetricText: {
      fontSize: 14,
      fontWeight: '400',
      alignSelf: 'flex-end'
    },
    infoIconView: {
      flex: 0,
    },
    ratingsCategoryView: {
      flex: 1,
      marginLeft: 10
    },
    ratingsMetricView: {
      flex: 1,
    },
  });
  