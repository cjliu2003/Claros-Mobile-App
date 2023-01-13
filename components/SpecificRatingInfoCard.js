import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { SimpleLineIcons } from '@expo/vector-icons';

// Get the current screen width and height
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SpecificRatingInfoCard = (props) => {
  
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
          <View style={styles.cardRow1}>
            <Text style={[styles.ratingTitle, {color: props.textColor}]}>{props.line.max_ev > 1 ? "A" : props.line.max_ev > -1 && props.line.max_ev < 1 ? "B" : "C"} Rating</Text>
          </View>
          <View style={styles.cardRow2}>
           {props.line.max_ev > 1 ? 
            <>
              <Text style={styles.ratingExplanation}>
                Our ratings indicate the long term profitability of betting assets. A-rated assets are the highest rated lines. 
                {"\n"}
                {"\n"}
                Learn more about ratings below.
              </Text>
            </> : 
            props.line.max_ev > -1 && props.line.max_ev < 1 ? 
            <>
              <Text style={styles.ratingExplanation}>
                Our ratings indicate the long term profitability of betting assets. B-rated assets are the mid-tier rated lines. 
                {"\n"}
                {"\n"}
                Learn more about ratings below.
              </Text>
            </> : 
            <>
              <Text style={styles.ratingExplanation}>
                Our ratings indicate the long term profitability of betting assets. C-rated assets are the lowest rated lines. 
                {"\n"}
                {"\n"}
                Learn more about ratings below.
              </Text>
            </> }
          </View>
          <View style={styles.cardRow3}></View>
          <View style={styles.cardRow4}></View>
          <View style={styles.cardRow5}>
              <TouchableOpacity style={[styles.infoButton, {backgroundColor: props.backgroundColor}]}>
                <SimpleLineIcons name="info" size={16} color={props.textColor} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.closeButton} onPress={handleCloseButtonClick}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
      
            {/* <View style={styles.edgeIndicator}>
                <View style={[styles.edgeBar, { width: '50%' }]} >
                
                </View>
                <LinearGradient colors={['#0060ff', '#39AAF3']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.edgeBar, { width: '50%' }]}></LinearGradient>
            </View> */}
          </View>
      </View>
    )
}

export default SpecificRatingInfoCard;

const styles = StyleSheet.create({
    cardContainer: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      borderRadius: 11,
      shadowColor: '#00000060',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.50,
      shadowRadius: 3,
      padding: 15,
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
      flex: 1,
    },
    cardRow4: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    cardRow5: {
      flex: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 0, 
      borderRadius: 5,
    },
    ratingTitle: {
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
      borderRadius: 5,
      height: 33,
      width: 33,
      alignItems: 'center',
      justifyContent: 'center',
    },
    closeButton: {
      backgroundColor: "#F3F3F3",
      borderRadius: 5,
      height: 33,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5,
      marginLeft: 7.5,
    },
    closeButtonText: {
      color: "#7B7D86",
      fontSize: 14,
      fontWeight: '400',
      textAlign: 'center',
    },
    edgeIndicator: {
      height: 9,
      width: '50%',
      backgroundColor: '#eeeeee',
      borderRadius: 15,
      overflow: 'hidden',
    },
    edgeBar: {
      height: '100%',
      backgroundColor: '#0060ff',
    },
  });