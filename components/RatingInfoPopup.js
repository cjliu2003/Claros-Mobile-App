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
    const { width, height } = props.aspect;

    return (
        <View style={[styles.cardContainer, { top , left }, { width, height }]}>
            <View style={styles.cardRow1}></View>
              <Text style={styles.ratingTitle}>CCC Rating</Text>
            <View style={styles.cardRow2}>
              <Text style={styles.ratingExplanation}>
                We the people of the United States, in order to form a more perfect Union,
                establish justice, ensure domestic tranquility, provide for the common defense,
                promote the general welfare.
              </Text>
            </View>
            <View style={styles.cardRow5}>
              <TouchableOpacity style={styles.infoButton}>
                <SimpleLineIcons name="info" size={20} color="#E05656" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={handleCloseButtonClick}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>

            </View>
            <TouchableOpacity style={[{backgroundColor: "#0060FF12", flex: 1}, styles.cardRow5]}>
              <SimpleLineIcons name="info" size={16} color="#0060FF"></SimpleLineIcons>
              <View style={styles.ratingsCategoryView}>
                <Text style={[styles.ratingsCategoryText, {color: "#0060FF"}]}>Rating</Text>
              </View>
              <View style={styles.ratingsMetricView}>
                <Text style={[styles.ratingsMetricText, {color: "#0060FF"}]}>% Fair Value</Text>
              </View>
            </TouchableOpacity>
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
      paddingHorizontal: 15,
      paddingVertical: 15,
      width: screenWidth * 0.9,
      position: 'absolute',
    },
    cardRow1: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
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
    },    ratingTitle: {
      fontSize: 18,
      fontWeight: '400',
      color: "#E05656",
      textAlign: 'left',
    },
    ratingExplanation: {
      fontSize: 14,
      fontWeight: '200',
      color: "#7B7D86",
      textAlign: 'left',
    },
    infoButton: {
      backgroundColor: "#E0565612",
      borderRadius: 5,
      height: 33,
      width: 33,
      alignItems: 'center',
      justifyContent: 'center'
    },
    closeButton: {
      backgroundColor: "#F3F3F3",
      borderRadius: 5,
      height: 33,
      width: 39,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5,
    },
    closeButtonText: {
      color: "#7B7D86",
      fontSize: 10,
      fontWeight: '400',
    },
  });