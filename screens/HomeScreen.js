import { Dimensions, StyleSheet, View, ScrollView, Text, TouchableOpacity, TextInput, Keyboard, Animated, TouchableWithoutFeedback, Vibration } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useUserContext } from '../contexts/userContext';
import Icon from 'react-native-vector-icons/Feather';
import { getSearchLambdaResponse } from '../functions/search/fetchVulcan';
import SearchResultContainer from '../components/SearchResult';
import CTAPopup from '../components/CTAPopup';

// Get the current screen width and height
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const HomeScreen = ({navigation}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [scaleSize, setScaleSize] = useState( new Animated.Value(1))
  const [recentSignOut, setRecentSignOut] = useState(false)
  const [brandTextYTransform, setBrandTextYTransform] = useState( new Animated.Value(0))
  const {user, logoutUser, subscription} = useUserContext()
  const [data, setData] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    if (!user) navigation.navigate("Welcome")
  }, [user])

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

  // const enlargeText = () => {
  //   Animated.timing(scaleSize, {
  //     toValue: 1,  // animate to just below the top of the screen
  //     duration: 400,
  //     useNativeDriver: true,
  //   }).start();
  // }
  
  // const shrinkText = () => {
  //   Animated.timing(scaleSize, {
  //     toValue: 0.6,  // animate to just below the top of the screen
  //     duration: 400,
  //     useNativeDriver: true,
  //   }).start();
  // }
  
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
  
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const translateY = useRef(new Animated.Value(0)).current;

  if (!showSearchResults) {
    Animated.spring(translateY, {
      toValue: -1/2 * keyboardHeight,
      duration: 10,
      bounciness: 10,
      useNativeDriver: true,
    }).start();
  }
  
  const inputRef = React.createRef();
  
  // Function handle search - only executable on non empty input - makes PGSQL fetch
  // & performs animation to display search query results.
  const handleSearch = async () => {
    if (inputRef.current === '') {
      // TextInput is empty, do nothing
      return;
    }
    Vibration.vibrate(0, 500);
    // Perform search
    const data = await getSearchLambdaResponse();
    console.log(data);
    setData(data);
    setShowSearchResults(true);
  }
  
  return (
    <>
    <CTAPopup setIsPopupVisible={setIsPopupVisible} isPopupVisible={isPopupVisible}/>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView contentContainerStyle={[styles.container, {overflow: 'scroll'}]}>
        <Animated.View style={[styles.container, showSearchResults ? {justifyContent: 'flex-start'} : {justifyContent: 'center'}, { transform: [{ translateY }] }]}>
          <Animated.Text style={[styles.brandText, showSearchResults ? {fontSize: 48} : {fontSize: 84},{transform: [{translateY: brandTextYTransform}]}]}>Claros</Animated.Text>
          {!showSearchResults ? <>
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
            </>
          : <>
            <View style={styles.searchBarContainer}>
              <TextInput
                style={styles.newSearchInput}
                placeholder="Search betting markets . . ."
                placeholderTextColor="#00000060"
              />
              <TouchableOpacity style={[styles.newSearchButton, { marginLeft: 10 }]} onPress={() => handleSearch()}>
                <Icon
                  name="corner-right-up"
                  size={28}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>

            {/* REPLACE WITH THE ACTUAL DATA DONE */}
            {/* <SearchResultContainer line={data}/> */}
          </> }
        </Animated.View>
        
    <Text onPress={() => signOut()}>click me to sign out (this helps with testing if the popup will occur on different accounts)</Text>
      </ScrollView>
    </TouchableWithoutFeedback>
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    paddingVertical: screenHeight * 0.025,
    alignItems: 'center',
    backgroundColor: "#FFFFFF",
    minHeight: screenHeight,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  newSearchInput: {
    height: 40,
    width: screenWidth * 0.65,
    borderRadius: 5,
    paddingLeft: 15,
    fontSize: 14,
    fontWeight: "200",
    color: "black",
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 0.25,
    backgroundColor: '#FFFFFF',
  },
  newSearchButton: {
    width: 70,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#0060FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
