import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Touchable, TextInput, Keyboard, Animated, Easing, TouchableWithoutFeedback, Image, Modal  } from 'react-native';
import React, { useEffect, useState, useRef, createRef } from 'react';
import { useUserContext } from '../contexts/userContext';
import { useScreenWidth, useScreenHeight } from "../contexts/useOrientation";
import Icon from 'react-native-vector-icons/Feather';
import { searchIndex } from '../functions/search/processQueries';
import SearchResultContainer from '../components/SearchResult';
import { Ionicons } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import { StatusBar } from 'expo-status-bar';
import nullSearchImage from '../assets/null__search.png';
import { RevenueCat } from '../functions/revenueCat/revenueCat';
import SubscriptionCTA from '../components/SubscriptionCTA';
import TextTicker from 'react-native-text-ticker';

const HomeScreen = ({navigation}) => {
  const screenWidth = useScreenWidth();
  const screenHeight = useScreenHeight();
  const [brandTextYTransform, setBrandTextYTransform] = useState( new Animated.Value(0));
  const {setCustomerData, user, trackSearchQuery, customer} = useUserContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [displaySearchInput, setDisplaySearchInput] = useState(false);
  const [data, setData] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isAwaitingFetch, setIsAwaitingFetch] = useState(false);
  const [isSubscriber, setIsSubscriber] = useState(false);
  const [showCTAModal, setShowCTAModal] = useState(false);
  
  
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
  
  // This is a useEffect we are using to check if the user has a subscription on screen load.
  useEffect(() => {
    const checkSub = async() => {
      const revenueCat = new RevenueCat();
      let infoSnap = await revenueCat.fetchCustomerInfo();
      if (infoSnap.entitlements.all.premium) {
        if (infoSnap.entitlements.all.hasOwnProperty("premium") && infoSnap.entitlements.all.premium.isActive) {
          setIsSubscriber(true);
        } else {
          setIsSubscriber(false);
        }
      } else {
        setIsSubscriber(false);
      }
    }
    checkSub();
  }, []);

  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const translateY = useRef(new Animated.Value(0)).current;

  // This useEffect is used to animate the brand text up when the keyboard is visible.
  if (!showSearchResults) {
    Animated.spring(translateY, {
      toValue: -1/2 * keyboardHeight,
      duration: 10,
      bounciness: 10,
      useNativeDriver: true,
    }).start();
  }

  const handleGenericDismiss = () => {
    Keyboard.dismiss();
    setKeyboardHeight(0);
    setKeyboardVisible(false);
    if (!searchQuery.length > 0) {
      setDisplaySearchInput(false);
    }
  }

  const checkSub = async() => {
    const revenueCat = new RevenueCat();
    let infoSnap = await revenueCat.fetchCustomerInfo();
    if (infoSnap.entitlements.all.hasOwnProperty("premium") && infoSnap.entitlements.all.premium.isActive) {
      setIsSubscriber(true);
    } else {
      setIsSubscriber(false);
    }
  }

  const [responseDataLength, setResonseDataLength] = useState(0);
  const handleSearch = async () => {
    setCustomerData();
    await checkSub();
    // Function now considers whether press comes from subscriber or not subscriber and handles accordingly.
    if (customer["search_queries"].length > 5 && !isSubscriber) {
      setShowCTAModal(true);
    } else {
      setIsAwaitingFetch(true); // Update the state to loading
        // Perform search from index
        setTimeout(async () => {
          const responseData = await searchIndex(searchQuery);
          setData(responseData);
          trackSearchQuery(searchQuery, responseData)
          setResonseDataLength(responseData.length);
          setKeyboardHeight(0);
          setKeyboardVisible(false);
          setSearchQuery("");
  
          setIsAwaitingFetch(false);
          setShowSearchResults(true);
        }, 1000); //  1 second delay
    }
  }

  const searchInputTransition = () => {
    setDisplaySearchInput(true);
  }

  const handleSwipeUpSearch = async (e) => {
    const { nativeEvent } = e;
    const verticalVelocity = nativeEvent.velocity.y;
    if (verticalVelocity > 0 && !showSearchResults) {
      // Trigger your logic here as the user scrolled up
      setCustomerData();
      await checkSub();
      // Function now considers whether press comes from subscriber or not subscriber and handles accordingly.
      if (customer["search_queries"].length > 5 && !isSubscriber) {
        setShowCTAModal(true);
      } else {
        setIsAwaitingFetch(true); // Update the state to loading
        // Perform search from index
        let searchQuery = "";

        setTimeout(async () => {
          const responseData = await searchIndex(searchQuery);
          setData(responseData);
          trackSearchQuery(searchQuery, responseData)
          setResonseDataLength(responseData.length);
          setKeyboardHeight(0);
          setKeyboardVisible(false);
          setSearchQuery("");
  
          setIsAwaitingFetch(false);
          setShowSearchResults(true);
        }, 1000); // 1 second delay
      }
    }
  };

  const handleCTAModalClose = () => {
    setShowCTAModal(false);
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

  // useEffect for animation to fade in home screen
  const [animation, setAnimation] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, []);

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
      <Animated.View style={[styles(screenWidth, screenHeight).backgroundView, {opacity}]}>
        <TouchableWithoutFeedback onPress={handleGenericDismiss}>
          <ScrollView
            contentContainerStyle={[styles(screenWidth, screenHeight).container, {overflow: 'scroll', backgroundColor: 'white'}]}
            showsVerticalScrollIndicator={false}
            onScrollEndDrag={handleSwipeUpSearch}
            >
            <Spinner
              visible={isAwaitingFetch}
              color="#0060FF"
              overlayColor="#FFFFFF"
              animation="none"
            />
            <Animated.View style={[styles(screenWidth, screenHeight).container, showSearchResults ? {justifyContent: 'flex-start'} : {justifyContent: 'center'}, { transform: [{ translateY }] }]}>
              <Animated.Text style={[styles(screenWidth, screenHeight).brandText, showSearchResults ? {fontSize: 48} : {fontSize: 84},{transform: [{translateY: brandTextYTransform}]}]}>Claros</Animated.Text>
                  <TouchableOpacity style={styles(screenWidth, screenHeight).centerButton} onPress={handleCenterButtonClick}>
                    <Ionicons name="ios-person-circle-outline" size={28} color="#0060FF" />
                  </TouchableOpacity>
                  {showSearchResults ?
                    <TouchableOpacity style={styles(screenWidth, screenHeight).backButton} onPress={handleBackToBrandedSearch}>
                      <Icon name="chevrons-left" size={28} color={"#0060FF"} />
                    </TouchableOpacity>
                    :
                    <></>
                  }
              {!showSearchResults ? <>
                <Text style={styles(screenWidth, screenHeight).callToActionText}>Find your next bet with Claros!</Text>
                <View style={styles(screenWidth, screenHeight).rowContainer}>
                  
                    {displaySearchInput ? (
                        <TextInput
                          style={styles(screenWidth, screenHeight).searchInput}
                          onChangeText={(text) => setSearchQuery(text)}
                          onSubmitEditing={() => handleSearch()}
                          returnKeyType="search"
                          returnKeyLabel='\u23CE'
                          autoFocus={true}
                          />
                        )
                      :
                        (
                        <TouchableWithoutFeedback onPress={searchInputTransition}>
                          <View style={styles(screenWidth, screenHeight).scrollingSearchInput}>
                            <TextTicker 
                              style={styles(screenWidth, screenHeight).searchInputPlaceholder}
                              duration={7500}
                              loop={true}
                              repeatSpacer={100}
                              >
                                <Text style={styles(screenWidth, screenWidth).scrollingSearchInputPlaceholderText}>Search by sportsbook, league, team, market. Or swipe up to see top plays.</Text>
                            </TextTicker>
                          </View>
                        </TouchableWithoutFeedback>
                    )}
                  <TouchableOpacity style={[styles(screenWidth, screenHeight).searchButton, { marginLeft: 10 }]} onPress={() => handleSearch()}>
                    <Icon
                      name="corner-right-up"
                      size={28}
                      color="#FFFFFF"
                    />
                  </TouchableOpacity>
                  <Modal
                    visible={showCTAModal}
                    animationType='slide'
                    onRequestClose={() => handleCTAModalClose()}
                    swipeThreshold={1000}
                    presentationStyle='pageSheet'
                  >
                    <SubscriptionCTA
                      setShowCTAModal={setShowCTAModal}
                      setIsSubscriber={setIsSubscriber}
                    />
                  </Modal>
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
              <Modal
                visible={showCTAModal}
                animationType='slide'
                onRequestClose={() => handleCTAModalClose()}
                swipeThreshold={1000}
                presentationStyle='pageSheet'
                >
                  <SubscriptionCTA
                    setShowCTAModal={setShowCTAModal}
                    setIsSubscriber={setIsSubscriber}
                    />
              </Modal>
              </> }
            </Animated.View>
          </ScrollView>
        </TouchableWithoutFeedback>
        <StatusBar style='light' />
      </Animated.View>
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
    width: screenWidth,
    // borderColor: '#0060FF',
    // borderWidth: 1,
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
  brandLogo: {
    height: screenHeight * 0.08,
    width: screenWidth * 0.75,
    position: 'absolute',

  },
  callToActionText: {
    fontSize: 22,
    fontWeight: '200',
    marginTop: 10,
    marginBottom: 60,
  },
  scrollingSearchInput: {
    height: 60,
    width: screenWidth * 0.65,
    justifyContent: 'center',
    borderRadius: 11,
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: "200",
    color: "black",
    shadowColor: '#00000075',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    shadowOpacity: 0.25,
    backgroundColor: '#FFFFFF',
  },
  scrollingSearchInputPlaceholderText: {
    fontSize: 18,
    fontWeight: "200",
    color: "#00000075",
    textAlign: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    height: 60,
    width: screenWidth * 0.65,
    justifyContent: 'center',
    borderRadius: 11,
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: "200",
    color: "black",
    shadowColor: '#00000075',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    shadowOpacity: 0.25,
    backgroundColor: '#FFFFFF',

  },
  searchInputPlaceholder: {
    fontSize: 18,
    fontWeight: "200",
    color: "#00000075",
    textAlign: 'center',
    justifyContent: 'center',
  },
  searchButton: {
    width: 70,
    height: 60,
    borderRadius: 11,
    backgroundColor: '#0060FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandedSearchButtonUpArrow: {
    height: 50,
    width: 50,
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
