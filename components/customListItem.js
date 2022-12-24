import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, ListItem, Image} from '@rneui/base'
import Sportsbooks from '../assets/Sportsbooks'
const customListItem = () => {
  return (
    <ListItem>
      <Image 
        source={Sportsbooks.bovada.logo} 
        style={{ width: 50, height: 50 }}
        />
      {/* <Text style={styles.lineName}>Seattle Kraken vs. Colorado Avalanche</Text>
      <Button containerStyle={styles.button} type="outline" title="Checkmark" /> */}
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800"}}>
          Bet On This Line
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          Oh yesasidfjdsalkfjdsalkfjdsaklfhjadslkfjdlksajfdslak
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
  }
})