import { Image } from '@rneui/base';
import React, { useState } from 'react';
import { Text, StyleSheet, View, Dimensions, TouchableOpacity, Modal } from 'react-native';
import Sportsbooks from '../assets/Sportsbooks';
import { findSide } from '../functions/parsing/findSide';
import { parseName } from '../functions/parsing/parseName';
import {parseOdds} from '../functions/parsing/parseOdds'
import {parseDate} from '../functions/parsing/parseDate';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import LinePage from './LinePage';

// Get the current screen width and height
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const colorMap = {
  A: {
    BG: "#4BC15712",
    TXT: "#4BC157",
  },
  B: {
    BG: "#E1C52E12",
    TXT: "#E1C52E"
    
  },
  C: {
    BG: "#E0565612",
    TXT: "#E05656",
  }
}

const SearchResultContainer = ({line}) => {
  const [featuredLine, setFeaturedLine] = useState(null)
  const handleCardClick = () => {
    setFeaturedLine(line.id)
  }
  
  let textColor;
  if (line.max_ev > 1) {
    textColor = colorMap.A.TXT;
  } else if (line.max_ev > -1 && line.max_ev < 1) {
    textColor = colorMap.B.TXT;
  } else {
    textColor = colorMap.C.TXT;
  }

  let backgroundColor;
  if (line.max_ev > 1) {
    backgroundColor = colorMap.A.BG;
  } else if (line.max_ev > -1 && line.max_ev < 1) {
    backgroundColor = colorMap.B.BG;
  } else {
    backgroundColor = colorMap.C.BG;
  }

  let team;
  if (line.market == 'h2h' || line.market == 'spreads') {
    if (line.max_ev == line.home_ev) {
      team = line.home_team_name;
    } else if (line.max_ev == line.away_ev) {
      team = line.away_team_name;
    } else {
      team = "Draw";
    }
  } else if (line.market == 'totals') {
    if (line.max_ev == line.home_ev) {
      team = 'Over';
    } else if (line.max_ev == line.away_ev) {
      team = 'Under';
    }
  }
  
  // We find the tag for the line header, communicating what it is to bet on
  let marketTag;
  if (line.market == 'h2h') {
    marketTag = 'Moneyline';
  } else if (line.market == 'spreads') {
    // If a spread, check the side to get the correct point
    let point;
    if (team == line.home_team_name) {
      point = line.home_point;
    } else if (team == line.away_team_name) {
      point = line.away_point;
    }
    marketTag = `@ ${point}`;
  } else if (line.market == 'totals') {
    // If a total, get the point
    let point;
    if (team == 'Over') {
      point = line.home_point;
    } else if (team == 'Under') {
      point = line.away_point;
    }
    marketTag = `${point} Total Points`;
  }

  return (
    <>
    {line &&
      <TouchableOpacity onPress={() => handleCardClick()}style={styles.cardContainer}>
        {/* <Text style={styles.lineTitle}>{parseName(line.league_name, line[findSide(line.home_ev, line.away_ev) + "_team_name"], line.market, line[findSide(line.home_ev, line.away_ev) + "_point"])}</Text> */}
        {/* <Text style={styles.lineDate}>{parseDate(line.commence_time)}</Text> */}
        <View style={styles.cardRow1}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {/* <Image style={styles.cardBookLogo} source={line.bookmaker in Sportsbooks && Sportsbooks[line.bookmaker].logo}/>  */}
            {/* <Text style={styles.cardBookLabel}>{line.bookmaker in Sportsbooks && Sportsbooks[line.bookmaker].name}</Text> */}
          </View>
          <View style={styles.lineTitleBackground}>
            <Text style={styles.lineTitle}>{parseOdds(line[findSide(line.home_ev, line.away_ev) + "_odds"])} on {team} {marketTag}</Text>
          </View>
          
        </View>
        <View style={styles.cardRow2}>
          <Text style={[styles.lineTeamName, {flex: 1, textAlign: 'left'}]}>{line.away_team_name}</Text>
          <AntDesign name="Trophy" size={16} color="black" style={{flex: 0}} />
          <Text style={[styles.lineTeamName, {flex: 1, textAlign: 'right'}]}>{line.home_team_name}</Text>
        </View>

        <View style={styles.cardRow3}>
          <Text style={styles.lineLocation}>Away</Text>
          <Text style={styles.lineLocation}>Home</Text>
        </View>
        <View style={styles.cardRow4}>
          <Text style={styles.lineDate}>{parseDate(line.commence_time)}</Text>
        </View>
        <View style={[{backgroundColor: backgroundColor, flex: 1}, styles.cardRow5]}>
          <View style={styles.infoIconView}>
            <SimpleLineIcons name="info" size={16} color={textColor}></SimpleLineIcons>
          </View>
          <View style={styles.ratingsCategoryView}>
            <Text style={[styles.ratingsCategoryText, {color: textColor}]}>{line.max_ev > 1 ? "A" : line.max_ev > -1 && line.max_ev < 1 ? "B" : "C"} Rating </Text>
          </View>
          <View style={styles.ratingsMetricView}>
            <Text style={[styles.ratingsMetricText, {color: textColor}]}>{line.max_ev > 0 && "+" }{(line.max_ev).toFixed(2)}% Fair Value</Text>
          </View>
          
        </View>
    </TouchableOpacity>
    }
    <Modal transparent={true} animationType="slide" animationIn="bottom" visible={featuredLine === line.id}>
      <LinePage setFeaturedLine={setFeaturedLine} line={line}></LinePage>
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
    height: 15,
  },
  cardBookLabel: {
    fontSize: 12,
    color: '#333'
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
  },
  lineTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'right',
  },
  lineTitleBackground: {
    backgroundColor: "#00E0FF12",
    padding: 5,
    borderRadius: 5
  },
  lineTeamName: {
    fontSize: 13,
    fontWeight: '600',
    color: "#000000",
    maxWidth: screenWidth * 0.40,
    textAlign: 'center',
  },
  lineLocation: {
    fontSize: 13,
    fontWeight: '400',
    color: "#7B7D86",
    maxWidth: screenWidth * 0.40,
    textAlign: 'center',
  },
  lineDate: {
    fontSize: 10,
    fontWeight: '400',
    color: '#7B7D86',
    alignSelf: 'center',
  },
  ratingsCategoryText: {
    fontSize: 12,
    fontWeight: '400',
    alignSelf: 'flex-start'
  },
  ratingsMetricText: {
    fontSize: 12,
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
