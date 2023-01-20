import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SimpleLineIcons } from '@expo/vector-icons';
import { useScreenWidth, useScreenHeight } from "../contexts/useOrientation";

const RatingTag = (props) => {
    const screenWidth = useScreenWidth();
    const screenHeight = useScreenHeight();
    
    // To ensure our info pop up is positioned on top of the cardContainer deployed in SearchResult,
    // we take the cardContainer positions(x, y) which are neccessarily passed in as props when
    // <RatingInfoPopUp is called />
    // const { top, left } = props.position;
    // const { width, height } = props.aspect;
    const line = props.line;

    return (
        <TouchableOpacity style={[{backgroundColor: props.backgroundColor}, styles(screenWidth, screenHeight).ratingsCategoryView]} onPress={props.handleRatingTagClick}>
            <SimpleLineIcons name="info" size={16} color={props.textColor}></SimpleLineIcons>
            <Text style={[styles(screenWidth, screenHeight).ratingsCategoryText, {color: props.textColor}]}>{line.max_ev >= 1 ? "A" : line.max_ev > -1 && line.max_ev < 1 ? "B" : "C"} Rating </Text>
            <Text style={[styles(screenWidth, screenHeight).ratingsMetricText, {color: props.textColor}]}>{line.max_ev > 0 && "+" }{(line.max_ev).toFixed(2)}% Edge</Text>
        </TouchableOpacity>
    )
}

export default RatingTag;

const styles = (screenWidth, screenHeight) => StyleSheet.create({
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
});