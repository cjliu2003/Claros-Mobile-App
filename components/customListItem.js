import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ListItem, Image} from '@rneui/base'
import Sportsbooks from '../assets/Sportsbooks'
import { parseMarket } from '../functions/parseMarket'
import { parseOdds } from '../functions/parseOdds'
import { findTeam } from '../functions/findTeam'
import { parseLeague } from '../functions/parseLeague'
import { parseDate } from '../functions/parseDate'
const customListItem = ({line, idx}) => {
  return (
    <ListItem key={line.id}>
      <Text>{idx}</Text>
      <Image 
        source={Sportsbooks[line.bookmaker].logo} 
        style={{ width: 50, height: 40 }}
        />
      <ListItem.Content>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {parseDate(line.snapshot.substring(0, 10))} @ {line.snapshot.substring(11, 19)}
        </ListItem.Subtitle>
        <ListItem.Title style={{ fontWeight: "800"}}>
          {findTeam(line.side, line.home_team_name, line.away_team_name, line.market)} {line.point && line.point + " "}{parseMarket(line.market)} {parseOdds(line.odds)}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={2} ellipsizeMode="tail">
          {parseLeague(line.league_key)}: {line.home_team_name + " vs. " + line.away_team_name}
        </ListItem.Subtitle>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {"Edge: " + line.ev.toFixed(2) + "%"}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default customListItem

const styles = StyleSheet.create({
  lineName: {
    maxWidth: 150,
    textAlign: "left",
    fontSize: 14,
    fontWeight: "400",
    color: 'black',
  }
})