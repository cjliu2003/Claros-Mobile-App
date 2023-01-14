import { Image } from '@rneui/base';
import React, { useState } from 'react';
import { Text, StyleSheet, View, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { useScreenWidth, useScreenHeight } from "../contexts/useOrientation";
import Sportsbooks from '../assets/Sportsbooks';
import { findSide } from '../functions/parsing/findSide';
import { parseName } from '../functions/parsing/parseName';
import {parseOdds} from '../functions/parsing/parseOdds'
import {parseDate} from '../functions/parsing/parseDate';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import LinePage from './LinePage';
import InAppWebBrowser from './WebBrowser'
import SpecificRatingInfoCard from './SpecificRatingInfoCard';
import { handleGradeBackgroundColor, handleGradeTextColor } from '../functions/styling/handleGradeColor';

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
  const screenWidth = useScreenWidth();
  const screenHeight = useScreenHeight();

  const [featuredLine, setFeaturedLine] = useState(null)
  const [isRatingInfoPressed, setIsRatingInfoPressed] = useState(false);
  const [isLineTitlePressed, setIsLineTitlePressed] = useState(false);
  const [currWebview, setCurrWebview] = useState("");

  const handleCardClick = () => {
    setFeaturedLine(line.id);
  }

  // Store a ref to the cardContainer to get its position. Initialize card's position as well
  const cardContainerRef = React.createRef();
  const [cardContainerPosition, setCardContainerPosition] = useState({ x: 0, y: 0 });
  const [cardContainerAspect, setCardContainerAspect] = useState({ width: 0, height: 0 });

  // Get relative positioning of cardContainer based on screenWidth, screenHeight.
  // This is neccessary for SpecificRatingInfoContainer to update positioning on orientation change.
  const onLayout = event => {
    const { width, height } = event.nativeEvent.layout;
    const x = (width - cardContainerAspect.width) / 2;
    const y = (height - cardContainerAspect.height) / 2;
    setCardContainerPosition({ x, y });
  }

  const handleInfoClick = () => {
    setIsRatingInfoPressed(true);
    // const { width, height } = event.nativeEvent.layout;
    const x = (screenWidth - cardContainerAspect.width) / 2;
    const y = (screenHeight - cardContainerAspect.height) / 2;

    cardContainerRef.current.measure((x, y, width, height, pageX, pageY, pageWidth, pageHeight) => {
      setCardContainerPosition({ x: pageX, y: pageY });
      setCardContainerAspect({ width: width, height: height });
    });
  }

  // Function handleLineTitlePress is deplyed when end-user presses lineTitle
  // Function opens App-native WebBrowser to allow for in app bet placement.
  const handleLineTitlePress = () => {
    setIsLineTitlePressed(true);
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

  let textColor = handleGradeTextColor(line.max_ev)
  let backgroundColor = handleGradeBackgroundColor(line.max_ev)

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
    marketTag = 'ML';
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
    marketTag = `${point} Total pts`;
  }

  return (
    <>
    {line &&
      <View ref={cardContainerRef} style={styles(screenWidth, screenHeight).cardContainer}>
        <View style={styles(screenWidth, screenHeight).cardRow1}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image style={styles(screenWidth, screenHeight).cardBookLogo} source={line.bookmaker in Sportsbooks && Sportsbooks[line.bookmaker].logo}/> 
          </View>
          <TouchableOpacity style={styles(screenWidth, screenHeight).lineTitleBackground} onPress={handleLineTitlePress}>
            <Text style={styles(screenWidth, screenHeight).lineTitle}>{parseOdds(line[findSide(line.home_ev, line.away_ev) + "_odds"])} on {team} {marketTag}</Text>
          </TouchableOpacity>
          
        </View>
        <View style={styles(screenWidth, screenHeight).cardRow2}>
          <Text style={[styles(screenWidth, screenHeight).lineTeamName, {flex: 1, textAlign: 'left'}]}>{line.away_team_name}</Text>
          <AntDesign name="Trophy" size={16} color="black" style={{flex: 0}} />
          <Text style={[styles(screenWidth, screenHeight).lineTeamName, {flex: 1, textAlign: 'right'}]}>{line.home_team_name}</Text>
        </View>

        <View style={styles(screenWidth, screenHeight).cardRow3}>
          <Text style={styles(screenWidth, screenHeight).lineLocation}>Away</Text>
          <Text style={styles(screenWidth, screenHeight).lineLocation}>Home</Text>
        </View>
        <View style={styles(screenWidth, screenHeight).cardRow4}>
          <Text style={styles(screenWidth, screenHeight).lineDate}>{parseDate(line.commence_time)}</Text>
        </View>
        <TouchableOpacity style={[{backgroundColor: backgroundColor, flex: 1}, styles(screenWidth, screenHeight).cardRow5]} onPress={handleInfoClick}>
          <SimpleLineIcons name="info" size={16} color={textColor}></SimpleLineIcons>
          <View style={styles(screenWidth, screenHeight).ratingsCategoryView}>
            <Text style={[styles(screenWidth, screenHeight).ratingsCategoryText, {color: textColor}]}>{line.max_ev >= 1 ? "A" : line.max_ev > -1 && line.max_ev < 1 ? "B" : "C"} Rating </Text>
          </View>
          <View style={styles(screenWidth, screenHeight).ratingsMetricView}>
            <Text style={[styles(screenWidth, screenHeight).ratingsMetricText, {color: textColor}]}>{line.max_ev > 0 && "+" }{(line.max_ev).toFixed(2)}% Fair Value</Text>
          </View>
        </TouchableOpacity>
        <Modal 
          transparent={true} 
          animationType="fade" 
          visible={isRatingInfoPressed}
          >
          <SpecificRatingInfoCard 
            setIsRatingInfoPressed={setIsRatingInfoPressed} 
            position={{ top: cardContainerPosition.y, left: cardContainerPosition.x }}
            aspect={{ width: cardContainerAspect.width, height: cardContainerAspect.height }}
            line={line}
            textColor={textColor}
            backgroundColor={backgroundColor}
            />
        </Modal>
        <Modal
          transparent={false}
          animationType="fade"
          visible={currWebview != ""}
          >
          <InAppWebBrowser
            url={getBookmakerLink(line)}
            currWebview={currWebview} 
            setCurrWebview={setCurrWebview}
            >

          </InAppWebBrowser>
        </Modal>
      </View>
    }
    
    {/* <Modal transparent={false} animationType="fade" visible={featuredLine === line.id}>
      <InAppWebBrowser setFeaturedLine={setFeaturedLine} line={line}></InAppWebBrowser>
    </Modal> */}
    </>
  )
}

export default SearchResultContainer;

const styles = (screenWidth, screenHeight) => StyleSheet.create({
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
    fontWeight: '400',
    color: "#7B7D86",
    maxWidth: screenWidth * 0.40,
    textAlign: 'center',
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
