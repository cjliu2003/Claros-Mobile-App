import { Dimensions, StyleSheet, View, Text, TouchableOpacity, TextInput, Keyboard, Animated, TouchableWithoutFeedback, Vibration } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useUserContext } from '../contexts/userContext';
import Icon from 'react-native-vector-icons/Feather';
import { getClass1LambdaResponse } from '../functions/NLP/fetchVulcan';
import { searchResultContainer } from '../components/SearchResult';

// Get the current screen width and height
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const HomeScreen = ({navigation}) => {
  // const {user, logoutUser} = useUserContext()
  // useEffect(() => {
  //   if (!user) navigation.navigate("Welcome")
  // }, [user])

  // const signOut = () => {
  //   logoutUser()
  //   navigation.navigate("Welcome")
  // }

  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardWillShow', (event) => {
      setKeyboardHeight(event.endCoordinates.height);
    });
    const keyboardHideListener = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  Animated.spring(translateY, {
    toValue: -1/2 * keyboardHeight,
    duration: 10,
    bounciness: 10,
    useNativeDriver: true,
  }).start();

  const inputRef = React.createRef();

  const [data, setData] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(null);
  // Function handle search - only executable on non empty input - makes PGSQL fetch 
  // & performs animation to display search query results.
  const handleSearch = async () => {
    if (inputRef.current === '') {
      // TextInput is empty, do nothing
      return;
    }
  
    Vibration.vibrate(0, 500);
    // Perform search
    const data = await getClass1LambdaResponse();
    setData(data);
    setShowSearchResults(true);
  }
  
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
          <Text style={styles.brandText}>Claros</Text>
          <Text style={styles.callToActionText}>Find your next bet with Claros!</Text>
          <View style={styles.searchBarContainer}>
            <TextInput
              ref={inputRef}
              style={styles.searchInput}
              placeholder="Search betting markets . . ."
              placeholderTextColor="#00000060"
              enablesReturnKeyAutomatically="true"
            />
            <TouchableOpacity style={[styles.searchButton, { marginLeft: 10 }]} onPress={() => handleSearch()}>
              <Icon
                name="corner-right-up"
                size={28}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
          { showSearchResults && <searchResultContainer line={data} /> }
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: "#FFFFFF"
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandText: {
    fontSize: 84,
    fontWeight: "800",
    color: "#0060FF",
    letterSpacing: 0,
  },
  callToActionText: {
    fontSize: 22,
    fontWeight: '200',
    marginTop: 10,
    marginBottom: 60,
  },
  searchInput: {
    height: 60,
    width: screenWidth * 0.65,
    borderRadius: 11,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 0,
    fontSize: 18,
    fontWeight: "200",
    color: "black",
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 0.25,
    backgroundColor: '#FFFFFF',
  },  
  searchButton: {
    width: 70,
    height: 60,
    borderRadius: 11,
    backgroundColor: '#0060FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});