import { Dimensions, StyleSheet, View, ScrollView, Text, TouchableOpacity, TextInput, Keyboard, Animated, TouchableWithoutFeedback, Vibration } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useUserContext } from '../contexts/userContext';
import Icon from 'react-native-vector-icons/Feather';
import { getSearchLambdaResponse } from '../functions/search/fetchVulcan';
import { searchIndex } from '../functions/search/processQueries';
import SearchResultContainer from '../components/SearchResult';
import CTAPopup from '../components/CTAPopup';
import { Ionicons } from '@expo/vector-icons';

// Get the current screen width and height
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const HomeScreen = ({navigation}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [scaleSize, setScaleSize] = useState( new Animated.Value(1));
  const [recentSignOut, setRecentSignOut] = useState(false);
  const [brandTextYTransform, setBrandTextYTransform] = useState( new Animated.Value(0));
  const {user, logoutUser, subscription} = useUserContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // useEffect to detect non users and send them to welcome
  useEffect(() => {
    if (!user) navigation.navigate("Welcome")
  }, [user])

  // useEffect to show subscription prompt pop up iof the user is not a subscriber
  useEffect(() => {
    if (subscription === "none" && !recentSignOut) {
      setIsPopupVisible(true);
    }
  }, [subscription])
  
  const signOut = () => {
    setRecentSignOut(true)
    setIsPopupVisible(false)
    logoutUser()
    navigation.navigate("Welcome")
  }

  // useEffect to detect future keyboard presence. Used for TouchableWithoutFeedback Animation. Distinct from past keyboard presence.
  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardWillShow', (event) => {
      setKeyboardHeight(event.endCoordinates.height);
      setKeyboardVisible(true);
    });
    const keyboardHideListener = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardHeight(0);
      setKeyboardVisible(false);
    });
    
    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);
  
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const translateY = useRef(new Animated.Value(0)).current;

  if (!showSearchResults) {
    Animated.spring(translateY, {
      toValue: -1/2 * keyboardHeight,
      duration: 10,
      bounciness: 10,
      useNativeDriver: true,
    }).start();
  }

  const handleSearch = async () => {
    Vibration.vibrate(0, 500);

    // Perform search from index
    const data = await searchIndex(searchQuery);
    setData(data);
    setShowSearchResults(true);
  }

  const handleCenterButtonClick = () => {
    navigation.navigate("Center")
  }
  
  return (
    <>
    <CTAPopup setIsPopupVisible={setIsPopupVisible} isPopupVisible={isPopupVisible}/>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView contentContainerStyle={[styles.container, {overflow: 'scroll', backgroundColor: 'white'}]}>
          <Animated.View style={[styles.container, showSearchResults ? {justifyContent: 'flex-start'} : {justifyContent: 'center'}, { transform: [{ translateY }] }]}>
            <Animated.Text style={[styles.brandText, showSearchResults ? {fontSize: 48} : {fontSize: 84},{transform: [{translateY: brandTextYTransform}]}]}>Claros</Animated.Text>
            <TouchableOpacity style={styles.centerButton} onPress={handleCenterButtonClick}>
              <Ionicons name="person-circle" size={30} color="#0060FF" />
            </TouchableOpacity>
            {!showSearchResults ? <>
              <Text style={styles.callToActionText}>Find your next bet with Claros!</Text>
              <View style={styles.rowContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search betting markets . . ."
                  placeholderTextColor="#00000060"
                  enablesReturnKeyAutomatically="true"
                  onChangeText={(text) => setSearchQuery(text)}
                  // onSubmitEditing={() => handleSearch()}
                  // returnKeyType="search"
                  // returnKeyLabel='\u23CE'
                />
                <TouchableOpacity style={[styles.searchButton, { marginLeft: 10 }]} onPress={() => handleSearch()}>
                  <Icon
                    name="corner-right-up"
                    size={28}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              </View>
              </>
            : <>
            <View style={[styles.rowContainer, {marginBottom: 20}]}>
                <View style={styles.newSearchViewContainer}>
                  <Ionicons name="search" size={16} color="#000000" />
                  <TextInput
                    style={styles.newSearchInput}
                    placeholder="Search betting markets . . ."
                    placeholderTextColor="#000000"
                    enablesReturnKeyAutomatically="true"
                    onChangeText={(text) => setSearchQuery(text)}
                    onSubmitEditing={() => handleSearch()}
                    returnKeyType="search"
                  />
                </View>
              </View>
              {/* <View style={keyboardVisible? styles.searchResultsMasterContainerBlurred : styles.searchResultsMasterContainerDefault}> */}
              {data && data.map(line => {
                return (
                  <SearchResultContainer key={line.id} line={line}/>
                )
              })}
              {/* </View> */}
              
            </> }
          </Animated.View>
          {/* <Text onPress={() => signOut()}>click me to sign out (this helps with testing if the popup will occur on different accounts)</Text> */}
        </ScrollView>
      </TouchableWithoutFeedback>
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  backLayerView: {
    backgroundColor: "#FFFFFF",
  },
  container: {
    paddingVertical: screenHeight * 0.025,
    alignItems: 'center',
    backgroundColor: "#FFFFFF",
    minHeight: screenHeight,
    width: screenWidth
  },
  centerButton: {
    position: 'absolute',
    top: 25,
    right: 25,
  },
  filterButtonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#00000025',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    marginLeft: 8,
  },
  numReturnedText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#00000075',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '85%',
    marginVertical: 8
  },
  brandText: {
    fontWeight: "900",
    color: "#0060FF",
    letterSpacing: 0,
    marginBottom: screenHeight * 0.02,
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
    paddingHorizontal: 20,
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
  newSearchViewContainer: {
    height: 40,
    width: screenWidth * 0.9,
    borderRadius: 41,
    paddingLeft: 15,
    fontSize: 14,
    fontWeight: "200",
    color: "black",
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 0.25,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  newSearchInput: {
    height: 40,
    width: screenWidth * 0.8,
    fontSize: 14,
    fontWeight: "200",
    color: "#000000",
    marginLeft: 10,
  },
  searchResultsMasterContainerDefault: {
    
  },
  searchResultsMasterContainerBlurred: {
    filter: 10
  }
});
