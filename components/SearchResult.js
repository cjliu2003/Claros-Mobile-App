import React from 'react';
import { Text, StyleSheet } from 'react-native';

const searchResultContainer = ({line}) => {
  return (
    <Text>Away team: {line.away_team_name}</Text>
  )
}

export default searchResultContainer;

const styles = StyleSheet.create({
  
});
