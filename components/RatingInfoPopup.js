import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
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
              promot
            </Text>
          </View>
          {/* <View style={styles.cardRow5}>
            <TouchableOpacity style={styles.infoButton}>
              <SimpleLineIcons name="info" size={20} color="#E05656" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseButtonClick}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>

          </View> */}
          <View style={styles.cardRow3}></View>
          <View style={styles.cardRow4}></View>
          <View style={styles.cardRow5}>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <TouchableOpacity style={styles.infoButton}>
                <SimpleLineIcons name="info" size={16} color="#E05656" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.closeButton} onPress={handleCloseButtonClick}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
      
            <View style={styles.edgeIndicator}>
                <View style={[styles.edgeBar, { width: '50%' }]} >
                
                </View>
                <LinearGradient colors={['#0060ff', '#39AAF3']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.edgeBar, { width: '50%' }]}></LinearGradient>
            </View>
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
      flex: 1,
    },
    cardRow4: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardRow5: {
      flex: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 0, 
      marginTop: screenHeight * 0.02, 
      borderRadius: 5
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
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5,
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