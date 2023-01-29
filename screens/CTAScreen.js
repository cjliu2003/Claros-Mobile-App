import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUserContext } from '../contexts/userContext';
import { useScreenWidth, useScreenHeight } from "../contexts/useOrientation";
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Purchases from 'react-native-purchases';
import Spinner from 'react-native-loading-spinner-overlay';

const CTAScreen = ({navigation}) => {
  const screenWidth = useScreenWidth();
  const screenHeight = useScreenHeight();

  const { findSubscription, subscription, user} = useUserContext();
  const [currWebview, setCurrWebview] = useState("");
  const [isAwaitingOfferings, setIsAwaitingOfferings] = useState(false);

  const benefits = [
    "Unlimited Ratings & Analytics", "Constant Realtime Market Data", "Access to Future Developments"
  ]

  // useEffect(() => {
  //   if (subscription != "none") navigation.replace("Home")
  // }, [subscription])
  
  const handleCenterButtonClick = () => {
    navigation.navigate("Center")
  }

  async function subscribe() {
    if (user.uid) {
      setIsAwaitingOfferings(true);

      // We first fetch the available offerings from ReveneueCat, which derives the list from App Store Connect
      // From the offerings we extract the productID we want the user to purchase
      let productID;

      try {
        const offerings = await Purchases.getOfferings();
        if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
          productID = offerings.current.availablePackages[0].product.identifier;
          }
        } catch (e) {
          console.log(e);
        }

        // We next employ the package fetched from about to allow the end user to purchase subscription!
        // Suffice it to say: This is the exciting part!
        try {
          const res = await Purchases.purchaseProduct(productID);
          // console.log("Subscribe RES: ", res)
          if (res) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
          }
          setIsAwaitingOfferings(false);
        } catch (e) {

          if (!e.userCancelled) {
            setIsAwaitingOfferings(false);
            showError(e);
          }
        }
        setIsAwaitingOfferings(false);
    } else {
      Alert.alert("There was an unknown error in fetching your credentials. Please refresh the app and try again.")
    }
  }

  return (
    <View style={styles(screenWidth, screenHeight).container}>
      <ScrollView contentContainerStyle={styles(screenWidth, screenHeight).container}>
        <Spinner
            visible={isAwaitingOfferings}
            color="#0060FF"
            overlayColor="#FFFFFF"
            animation="none"
          />  
        <View style={{height: screenHeight * 0.9, justifyContent: 'space-between'}}>
          <View style={styles(screenWidth, screenHeight).popupContainer}>
          <TouchableOpacity style={styles(screenWidth, screenHeight).icon} onPress={handleCenterButtonClick}>
            <Ionicons name="ios-person-circle-outline" size={28} color="#0060FF" />
          </TouchableOpacity>
            <Image source={require('../assets/claros__iOS__card__light.png')} style={styles(screenWidth, screenHeight).card}/>
            {/* <Image source={require('../assets/full__text__logo.png')} style={styles(screenWidth, screenHeight).logo}/> */}
            <Text style={styles(screenWidth, screenHeight).popupHeader}>Claros AI</Text>
            <Text style={styles(screenWidth, screenHeight).popupSubheader}>Claros subscribers get unrestricted access to Claros. Main features include: unlimited betting market search, advanced analytics, realtime market updats, access to future developments.</Text>
            <View style={styles(screenWidth, screenHeight).dummyView}></View>
            <Image source={require('../assets/hero__feature-graphic.png')} style={styles(screenWidth, screenHeight).heroImage}/>
            {benefits.map((benefit, i) => {
              return (
                <View key={benefit + i} style={styles(screenWidth, screenHeight).listItem}>
                  <AntDesign style={{paddingRight: 8}} name="checkcircle" size={25} color="#000000" />
                  <Text style={styles(screenWidth, screenHeight).listItemText}>{benefit}</Text>
                </View>
              )
            })}
          </View>
          <View>
            <TouchableOpacity style={styles(screenWidth, screenHeight).button} onPress={subscribe}>
              <Text style={styles(screenWidth, screenHeight).buttonText}>Subscribe</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

    </View>
    
  )
}

export default CTAScreen;

const styles = (screenWidth, screenHeight) => StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: screenHeight,
    backgroundColor: 'white',
  },
  card: {
    height: 50,
    width: 50,
  },
  logo:{
    height: screenHeight * 0.075,
    width: screenWidth * 0.75,
  },
  heroImage: {
    height: 240,
    width: 325,
  },
  icon: {
    alignSelf: 'flex-end',
  },
  popupCloseBtn: {
    alignSelf: 'flex-end',
  },
  popupCloseBtnText: {
    fontSize: 16,
    fontWeight: '500',
  },
  popupContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    paddingHorizontal: screenWidth * 0.05,
    paddingVertical: screenHeight * .06
  },
  filledButton: {
    width: screenWidth * 0.75,
    marginTop: 10,
    paddingVertical: 24,
    backgroundColor: 'black',
    borderRadius: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filledButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  button: {
    height: 60,
    width: screenWidth * 0.75,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 41,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 0,
    shadowColor: '#0060FF',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.75,
    backgroundColor: '#FFFFFF',
    borderColor: "#0060FF",
    borderWidth: 0,
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#0060FF"
  },
  popupHeader: {
    fontSize: 40,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -1.5,
    color: '#0060ff',
    marginTop: screenHeight * 0.02,
    marginBottom: screenHeight * 0.02,
  },
  popupSubheader: {
    fontSize: 20,
    fontWeight: '200',
    textAlign: 'center',
    letterSpacing: -.5,
    color: 'black',
    marginTop: screenHeight * 0.005,
    marginBottom: screenHeight * 0.05,
  },
  listItem: {
    flexDirection: 'row', 
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: screenHeight * 0.01,
  },
  listItemText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#000000',
  }
})
