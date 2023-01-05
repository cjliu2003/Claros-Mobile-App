import React from 'react';
import { Text, StyleSheet } from 'react-native';

const SearchResultContainer = ({line}) => {
  return (
    <Text>Away team: {line.away_team_name}</Text>
  )
}

export default SearchResultContainer;

const styles = StyleSheet.create({
  
});
