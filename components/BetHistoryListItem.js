import { StyleSheet, Text, Dimensions } from 'react-native'
import { React, useState, useEffect  } from 'react'
import { ListItem, Image} from '@rneui/base'
import Sportsbooks from '../assets/Sportsbooks'
import { parseMarket } from '../functions/parseMarket'
import { parseOdds } from '../functions/parseOdds'
import { findTeam } from '../functions/findTeam'
import { parseLeague } from '../functions/parseLeague'
import { parseDate } from '../functions/parseDate'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const BetHistoryListItem = ({line, idx}) => {
  const [orientation, setOrientation] = useState(null);

  useEffect(() => {
    const updateOrientation = () => {
      setOrientation(Dimensions.get('screen').width > Dimensions.get('screen').height ? 'landscape' : 'portrait');
    };
    updateOrientation();

    const changeEventListener = Dimensions.addEventListener('change', updateOrientation);

    // Return a function that removes the event listener
    return () => {
      changeEventListener.remove();
    };
  }, []);
  
  
  return (
    <ListItem key={line.id}>
      <Text>{idx}</Text>
      <Image
        source={Sportsbooks[line.bookmaker].logo}
        style={{ width: 50, height: 40 }}
        />
      <ListItem.Content>
        <ListItem.Subtitle style= {styles.genericText} numberOfLines={1} ellipsizeMode="tail">
          {parseDate(line.snapshot.substring(0, 10))} @ {line.commence_time.substring(11, 19) + " UTC"}
        </ListItem.Subtitle>
        <ListItem.Title style={line.outcome === "W" ? styles.lineTextWin : styles.lineTextLoss}>
          {findTeam(line.side, line.home_team_name, line.away_team_name, line.market)} {line.point && line.point + " "}{parseMarket(line.market)} {parseOdds(line.odds)}
        </ListItem.Title>
        <ListItem.Subtitle style={styles.genericText} numberOfLines={2} ellipsizeMode="tail">
          {parseLeague(line.league_key)}: {line.home_team_name + " vs. " + line.away_team_name}
        </ListItem.Subtitle>
        <ListItem.Subtitle style={styles.lineName} numberOfLines={1} ellipsizeMode="tail">
          {line.outcome === "W" ? "Win" : "Loss"}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default BetHistoryListItem

const styles = StyleSheet.create({
  lineName: {
    maxWidth: 150,
    textAlign: "left",
    fontSize: 12,
    fontWeight: "400",
    color: 'black',
  },
  lineTextWin: {
    color: 'green',
    fontWeight: '600',
    fontSize: 15,
  },
  genericText: {
    color: 'black',
    fontWeight: '200',
    fontSize: 12,
  },
  lineTextLoss: {
    color: 'red',
    fontWeight: '600',
    fontSize: 15,
  },
})
