import { Dimensions, StyleSheet, View, ScrollView, Text, TouchableOpacity, TextInput, Keyboard, Animated, TouchableWithoutFeedback, Vibration, Image } from 'react-native'
import React, { useEffect, useState, useRef, createRef } from 'react'
import { useUserContext } from '../contexts/userContext';
import { useScreenWidth, useScreenHeight } from "../contexts/useOrientation";
import Icon from 'react-native-vector-icons/Feather';
import { searchIndex } from '../functions/search/processQueries';
import SearchResultContainer from '../components/SearchResult';
import { Ionicons } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import { StatusBar } from 'expo-status-bar';
import { invokeAddUserSearchQuery } from '../functions/search/searchQueryStorage';
import nullSearchImage from '../assets/null__search.png';

const HomeScreen = ({navigation}) => {
  const screenWidth = useScreenWidth();
  const screenHeight = useScreenHeight();

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [scaleSize, setScaleSize] = useState( new Animated.Value(1));
  const [recentSignOut, setRecentSignOut] = useState(false);
  const [brandTextYTransform, setBrandTextYTransform] = useState( new Animated.Value(0));
  const {trackSearchQuery, user, logoutUser, subscription} = useUserContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isAwaitingFetch, setIsAwaitingFetch] = useState(false);
  const [uid, setUid] = useState("");

  // useEffect to detect non users and send them to welcome
  useEffect(() => {
    if (!user) {
      navigation.navigate("Welcome");
    } else {
      setUid(user.uid);
    }
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

  // options for haptics
  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false
  };

  const [responseDataLength, setResonseDataLength] = useState(0);
  const handleSearch = async () => {
    setIsAwaitingFetch(true); // Update the state to loading

    // Perform search from index
    const responseData = await searchIndex(searchQuery);
    setData(responseData);
    trackSearchQuery(searchQuery, responseData)
    setResonseDataLength(responseData.length);
    setKeyboardHeight(0);
    setKeyboardVisible(false);

    // Write the userSearchQuery, and the responseData to Vulcan
    // const response = await invokeAddUserSearchQuery(uid, searchQuery, responseData);

    setIsAwaitingFetch(false);
    setShowSearchResults(true);
  }

  const handleCenterButtonClick = () => {
    navigation.navigate("Center")
  }
  
  const handleBackToBrandedSearch = () => {
    setShowSearchResults(false);
  }

  const searchBarRef = createRef();
  const handleNullSearchCallToAction = () => {
    searchBarRef.current.focus()
  }

  return (
      <View style={styles(screenWidth, screenHeight).backgroundView}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView contentContainerStyle={[styles(screenWidth, screenHeight).container, {overflow: 'scroll', backgroundColor: 'white'}]}>
            <Spinner
              visible={isAwaitingFetch}
              color="#0060FF"
              overlayColor="#FFFFFF"
              animation="none"
            />

            <Animated.View style={[styles(screenWidth, screenHeight).container, showSearchResults ? {justifyContent: 'flex-start'} : {justifyContent: 'center'}, { transform: [{ translateY }] }]}>
              <Animated.Text style={[styles(screenWidth, screenHeight).brandText, showSearchResults ? {fontSize: 48} : {fontSize: 84},{transform: [{translateY: brandTextYTransform}]}]}>Claros</Animated.Text>
              
              { showSearchResults ?
                <>
                  <TouchableOpacity style={styles(screenWidth, screenHeight).centerButton} onPress={handleCenterButtonClick}>
                    <Ionicons name="person-circle" size={28} color="#0060FF" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles(screenWidth, screenHeight).backButton} onPress={handleBackToBrandedSearch}>
                    <Icon name="chevrons-left" size={28} color={"#0060FF"} />
                  </TouchableOpacity>
                </>
              : null
              }            
              {!showSearchResults ? <>
                <Text style={styles(screenWidth, screenHeight).callToActionText}>Find your next bet with Claros!</Text>
                <View style={styles(screenWidth, screenHeight).rowContainer}>
                  <TextInput
                    
                    style={styles(screenWidth, screenHeight).searchInput}
                    placeholder="Sportsbook, League, Team" 
                    placeholderTextColor="#00000060"
                    enablesReturnKeyAutomatically="true"
                    onChangeText={(text) => setSearchQuery(text)}
                    onSubmitEditing={() => handleSearch()}
                    returnKeyType="search"
                    returnKeyLabel='\u23CE'
                  />
                  <TouchableOpacity style={[styles(screenWidth, screenHeight).searchButton, { marginLeft: 10 }]} onPress={() => handleSearch()}>
                    <Icon
                      name="corner-right-up"
                      size={28}
                      color="#FFFFFF"
                    />
                  </TouchableOpacity>
                </View>
                </>
              : <>
              <View style={[styles(screenWidth, screenHeight).rowContainer, {marginBottom: 20}]}>
                  <View style={styles(screenWidth, screenHeight).newSearchViewContainer}>
                    <Ionicons name="search" size={16} color="#000000" />
                    <TextInput
                      ref={searchBarRef}
                      style={styles(screenWidth, screenHeight).newSearchInput}
                      placeholder="Search by sportsbook, league, team . . ."
                      placeholderTextColor="#000000"
                      enablesReturnKeyAutomatically="true"
                      onChangeText={(text) => setSearchQuery(text)}
                      onSubmitEditing={() => handleSearch()}
                      returnKeyType="search"
                    />
                  </View>
                </View>
                {
                  responseDataLength === 0 ? (
                    <View style={styles(screenWidth, screenHeight).nullSearchResultContainer}>
                      <Image source={nullSearchImage} style={styles(screenWidth, screenHeight).nullSearchImage}></Image>
                      {/* <View style={{ height: screenHeight * 0.05 }}></View> */}
                      {/* <Text style={styles(screenWidth, screenHeight).nullSearchText}>No results found.</Text> */}
                      {/* <View style={{ height: screenHeight * 0.05 }}></View> */}
                      <Text style={styles(screenWidth, screenHeight).nullSearchText}>We couldn't find the line you're looking for.</Text>
                      <View style={styles(screenWidth, screenHeight).sentenceContainer}>
                        <Text style={styles(screenWidth, screenHeight).nullSearchText}>Please try another </Text>
                        <TouchableOpacity onPress={handleNullSearchCallToAction}>
                            <Text style={styles(screenWidth, screenHeight).nullSearchTextCallToActionText}>search.</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    data && data.map(line => {
                      return (
                        <SearchResultContainer key={line.id} line={line}/>
                      )
                    })
                  )
                }
              </> }
            </Animated.View>
            {/* <Text onPress={() => signOut()}>click me to sign out (this helps with testing if the popup will occur on different accounts)</Text> */}
          </ScrollView>
        </TouchableWithoutFeedback>
        <StatusBar style='light' />
      </View>
  )
}

export default HomeScreen;

const styles = (screenWidth, screenHeight) => StyleSheet.create({
  backgroundView: {
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
    top: 35,
    right: screenWidth * 0.05,
  },
  backButton: {
    position: 'absolute',
    top: 35,
    left: screenWidth * 0.05,
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
  noResultsFoundContainer: {
    marginTop: screenHeight * 0.2
  },
  noResultsFoundText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '400'
  },
  newSearchInput: {
    height: 40,
    width: screenWidth * 0.8,
    fontSize: 14,
    fontWeight: "200",
    color: "#000000",
    marginLeft: 10,
  },
  nullSearchResultContainer: {
    flexDirection: 'column',
    paddingVertical: screenHeight * 0.10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FFFFFF",
    width: screenWidth
  },
  nullSearchText: {
    fontSize: 14,
    fontWeight: '200',
    textAlign: 'center',
    maxWidth: screenWidth * 0.65,
  },
  sentenceContainer: {
    flexDirection: 'row',
  },
  nullSearchTextCallToActionText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#0060FF',
    backgroundColor:'transparent',
    padding:0,
    margin:0
  },
  nullSearchImage: {
    width: 400,
    height: 400,
  },
});
