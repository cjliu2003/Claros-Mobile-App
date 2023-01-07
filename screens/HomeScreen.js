import { Dimensions, StyleSheet, View, ScrollView, Text, TouchableOpacity, TextInput, Keyboard, Animated, TouchableWithoutFeedback, Vibration } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { useUserContext } from '../contexts/userContext';
import Icon from 'react-native-vector-icons/Feather';
import { getSearchLambdaResponse } from '../functions/search/fetchVulcan';
import { searchIndex } from '../functions/search/processQueries';
import SearchResultContainer from '../components/SearchResult';
import CTAPopup from '../components/CTAPopup';
import { FontAwesome5 } from '@expo/vector-icons';

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

  const handleSearch = async () => {
    Vibration.vibrate(0, 500);

    // Perform search from index
    const data = await searchIndex(searchQuery);
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
            <View style={styles.rowContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search betting markets . . ."
                placeholderTextColor="#00000060"
                enablesReturnKeyAutomatically="true"
                onChangeText={(text) => setSearchQuery(text)}
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
              <TextInput
                style={styles.newSearchInput}
                placeholder="Search betting markets . . ."
                placeholderTextColor="#00000090"
                enablesReturnKeyAutomatically="true"
                onChangeText={(text) => setSearchQuery(text)}
              />
              <TouchableOpacity style={[styles.newSearchButton, { marginLeft: 10 }]} onPress={() => handleSearch()}>
                <Icon
                  name="corner-right-up"
                  size={28}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.rowSpaceBetween}>
              <TouchableOpacity style={styles.filterButtonContainer}>
                <FontAwesome5 name="filter" size={16} color="#0060ff" />
                <Text style={styles.filterButtonText}>Filters</Text>
              </TouchableOpacity>
              <Text style={styles.numReturnedText}>{data && data.length + " Lines Fetched"}</Text>
            </View>
            {data && data.map(line => {
              return (
                <SearchResultContainer key={line.id} line={line}/>
              )
            })}
            {/* <SearchResultContainer line={data[1]}/> */}
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
    width: screenWidth
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
    fontWeight: '300',
    color: 'black',
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
