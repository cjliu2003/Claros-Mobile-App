import { StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native'
import React, { useState } from 'react'
import { SimpleLineIcons } from '@expo/vector-icons';
import { useScreenWidth, useScreenHeight } from "../contexts/useOrientation";
import InAppWebBrowser from './WebBrowser';
import Sportsbooks from '../assets/Sportsbooks';


const SpecificRatingInfoCard = (props) => {
    const screenWidth = useScreenWidth();
    const screenHeight = useScreenHeight();

    const [isBetNowPressed, setIsBetNowPressed] = useState(false);
    const [currWebview, setCurrWebview] = useState("");
    
    // Function handleLineTitlePress is deplyed when end-user presses lineTitle
    // Function opens App-native WebBrowser to allow for in app bet placement.
    const handleBetNowPress = () => {
      setIsBetNowPressed(true);
      setCurrWebview("sportsbook");
    }

    // Get the semi-deep bookmaker link
    const getBookmakerLink = (line) => {
      let link;
      if (Sportsbooks[line.bookmaker].hasOwnProperty(line.league_name)) {
        link = Sportsbooks[line.bookmaker][line.league_name];
      } else {
        link = Sportsbooks[line.bookmaker].link;
      }
      return link;
    }

    const handleCloseButtonClick = () => {
        props.setIsRatingInfoPressed(false);
    }

    // To ensure our info pop up is positioned on top of the cardContainer deployed in SearchResult,
    // we take the cardContainer positions(x, y) which are neccessarily passed in as props when
    // <RatingInfoPopUp is called />
    const { top, left } = props.position;
    const { width, height } = props.aspect;
    const line = props.line;
    const backgroundColor = props.backgroundColor;
    const textColor = props.textColor;

    return (
      <View style={[styles(screenWidth, screenHeight).cardContainer, { top , left }, { width, height }]}>
          <View style={styles(screenWidth, screenHeight).cardRow1}>
            <Text style={[styles(screenWidth, screenHeight).ratingTitle, {color: props.textColor}]}>{props.line.max_ev >= 1 ? "A" : props.line.max_ev > -1 && props.line.max_ev < 1 ? "B" : "C"} Rating</Text>
            {/* <TouchableOpacity style={styles(screenWidth, screenHeight).betNowButton} onPress={handleBetNowPress}>
              <Text style={styles(screenWidth, screenHeight).betNowText}>Place Bet</Text>
              <Icon name="chevrons-right" size={18} color={"#0060FF"} />
            </TouchableOpacity> */}
          </View>
          <View style={styles(screenWidth, screenHeight).cardRow2}>
           {props.line.max_ev > 1 ? 
            <>
              <Text style={styles(screenWidth, screenHeight).ratingExplanation}>
                Our ratings indicate the long term profitability of betting assets. A-rated assets are the highest rated lines. 
                See specifics about this line below.
              </Text>
            </> : 
            props.line.max_ev > -1 && props.line.max_ev < 1 ? 
            <>
              <Text style={styles(screenWidth, screenHeight).ratingExplanation}>
                Our ratings indicate the long term profitability of betting assets. B-rated assets are the mid-tier rated lines. 
                See specifics about this line below.
              </Text>
            </> : 
            <>
              <Text style={styles(screenWidth, screenHeight).ratingExplanation}>
                Our ratings indicate the long term profitability of betting assets. C-rated assets are the lowest rated lines. 
                See specifics about this line below.
              </Text>
            </> }
          </View>
          <View style={styles(screenWidth, screenHeight).cardRow3}></View>
          <View style={styles(screenWidth, screenHeight).cardRow4}></View>
          <View style={styles(screenWidth, screenHeight).cardRow5}>
              <View style={[{backgroundColor: backgroundColor}, styles(screenWidth, screenHeight).ratingsCategoryView]}>
                <SimpleLineIcons name="info" size={16} color={textColor}></SimpleLineIcons>
                <Text style={[styles(screenWidth, screenHeight).ratingsCategoryText, {color: textColor}]}>{line.max_ev >= 1 ? "A" : line.max_ev > -1 && line.max_ev < 1 ? "B" : "C"} Rating </Text>
                <Text style={[styles(screenWidth, screenHeight).ratingsMetricText, {color: textColor}]}>{line.max_ev > 0 && "+" }{(line.max_ev).toFixed(2)}% Edge</Text>
              </View>
              
              <TouchableOpacity style={styles(screenWidth, screenHeight).closeButton} onPress={handleCloseButtonClick}>
                <Text style={styles(screenWidth, screenHeight).closeButtonText}>Close</Text>
              </TouchableOpacity>
      
            {/* <View style={styles.edgeIndicator}>
                <View style={[styles.edgeBar, { width: '50%' }]} >
                
                </View>
                <LinearGradient colors={['#0060ff', '#39AAF3']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.edgeBar, { width: '50%' }]}></LinearGradient>
            </View> */}
          </View>

          <Modal
          transparent={false}
          animationType="fade"
          visible={currWebview != ""}
          >
            <InAppWebBrowser
              url={getBookmakerLink(props.line)}
              currWebview={currWebview} 
              setCurrWebview={setCurrWebview}
              >
          </InAppWebBrowser>
        </Modal>
      </View>
    )
}

export default SpecificRatingInfoCard;

const styles = (screenWidth, screenHeight) => StyleSheet.create({
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
      justifyContent: 'space-between',
      padding: 0, 
      borderRadius: 5,
    },
    ratingTitle: {
      fontSize: 18,
      fontWeight: '400',
      color: "#E05656",
      textAlign: 'left',
    },
    betNowButton: {
      flex: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: "center",
      borderRadius: 41,
      borderColor: "#0060FF",
      borderWidth: 0.125,
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 15,
      paddingLeft:15,
      shadowColor: '#0060FF',
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 5,
      shadowOpacity: 0,
      backgroundColor: '#FFFFFF',
    },
    betNowText: { 
      color: "#0060FF",
      fontSize: 14,
      fontWeight: '300',
      marginRight: 5,
      textAlign: 'right',
      shadowColor: '#FFFFFF',
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 1,
      shadowOpacity: 1,
    },
    ratingsCategoryText: {
      fontSize: 14,
      fontWeight: '300',
      alignSelf: 'flex-start',
      marginLeft: 10,
    },
    ratingsMetricText: {
      fontSize: 14,
      fontWeight: '300',
      alignSelf: 'flex-end',
      marginLeft: 10,
    },
    ratingsCategoryView: {
      flex: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: "center",
      padding: 10,
      borderRadius: 41,
    },
    ratingExplanation: {
      fontSize: 14,
      fontWeight: '300',
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
      flex: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: "center",
      borderRadius: 41,
      borderColor: "#0060FF",
      borderWidth: 0.125,
      paddingTop: 7.5,
      paddingBottom: 7.5,
      paddingRight: 37.5,
      paddingLeft: 37.5,
      shadowColor: '#0060FF',
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 5,
      shadowOpacity: 0.33,
      backgroundColor: '#FFFFFF',
    },
    closeButtonText: {
      color: "#0060FF",
      fontSize: 14,
      fontWeight: '300',
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