import { Image } from '@rneui/base';
import React, { useState } from 'react';
import { Text, StyleSheet, View, Dimensions, TouchableOpacity, Modal } from 'react-native';
import Sportsbooks from '../assets/Sportsbooks';
import { findSide } from '../functions/parsing/findSide';
import { parseName } from '../functions/parsing/parseName';
import {parseOdds} from '../functions/parsing/parseOdds'
import {parseDate} from '../functions/parsing/parseDate';
import { AntDesign } from '@expo/vector-icons';
import LinePage from './LinePage';

// Get the current screen width and height
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const colorMap = {
  A: {
    BG: "#35a83225",
    TXT: "#35a832",
  },
  F: {
    BG: "#FF000025",
    TXT: "#FF0000",
  }
}

const SearchResultContainer = ({line}) => {
  const [featuredLine, setFeaturedLine] = useState(null)
  const handleCardClick = () => {
    setFeaturedLine(line.id)
  }
  
  return (
    <>
    {line &&
      <TouchableOpacity onPress={() => handleCardClick()}style={styles.cardContainer}>
        <Text style={styles.lineTitle}>{parseName(line.league_name, line[findSide(line.home_ev, line.away_ev) + "_team_name"], line.market, line[findSide(line.home_ev, line.away_ev) + "_point"])}</Text>
        <Text style={styles.lineDate}>{parseDate(line.commence_time)}</Text>
        <View style={styles.cardRow}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image style={styles.cardBookLogo} source={line.bookmaker in Sportsbooks && Sportsbooks[line.bookmaker].logo}/> 
            {/* <Text style={styles.cardBookLabel}>{line.bookmaker in Sportsbooks && Sportsbooks[line.bookmaker].name}</Text> */}
          </View>
          <Text style={styles.lineOdds}>{parseOdds(line[findSide(line.home_ev, line.away_ev) + "_odds"])}</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.lineTeamName}>{line.away_team_name}</Text>
          <AntDesign name="Trophy" size={20} color="black" />
          <Text style={styles.lineTeamName}>{line.home_team_name}</Text>
        </View>
        <View style={[{backgroundColor: line.max_ev > 0 ? colorMap.A.BG : colorMap.F.BG, padding: 10, marginTop: screenHeight * 0.02, borderRadius: 5}, styles.cardRow]}>
          <Text style={{color: line.max_ev > 0 ? colorMap.A.TXT : colorMap.F.TXT}}>{line.max_ev > 0 ? "A" : "F"} Rating </Text>
          <Text style={{color: line.max_ev > 0 ? colorMap.A.TXT : colorMap.F.TXT}}>{line.max_ev > 0 && "+" }{(line.max_ev).toFixed(2)}% Fair Value</Text>
        </View>
    </TouchableOpacity>
    }
    <Modal transparent={true} animationType="slide" animationIn="bottom" visible={featuredLine === line.id}>
      <LinePage setFeaturedLine={setFeaturedLine} line={line}/>
    </Modal>
    </>
    
  )
}

export default SearchResultContainer;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 11,
    shadowColor: '#00000060',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.50,
    shadowRadius: 3,
    marginVertical: screenHeight * 0.015,
    padding: 15,
    width: screenWidth * 0.9,
  },
  cardBookLogo: {
    width: 50,
    height: 50,
  },
  cardBookLabel: {
    fontSize: 12,
    color: '#333'
  },
  lineOdds: {
    fontSize: 24,
    fontWeight: '800',
    color: '#333333',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: screenHeight * 0.005,
  },
  lineTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    alignSelf: 'center',
    textAlign: 'center',
  },
  lineDate: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    alignSelf: 'center',
  },
  lineTeamName: {
    fontSize: 15,
    fontWeight: '600',
    color: "#000000",
    maxWidth: screenWidth * 0.40,
    textAlign: 'center',
  },
});
