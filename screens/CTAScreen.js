import { Modal, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import InAppWebBrowser from '../components/WebBrowser';
import { useUserContext } from '../contexts/userContext';
import { useScreenWidth, useScreenHeight } from "../contexts/useOrientation";
import { Ionicons } from '@expo/vector-icons';
import Purchases from 'react-native-purchases';

const CTAScreen = ({navigation}) => {
  const screenWidth = useScreenWidth();
  const screenHeight = useScreenHeight();

  const {subscription} = useUserContext()
  const [currWebview, setCurrWebview] = useState("")
  const benefits = [
    "Unlimited Ratings & Analytics", "Constant Realtime Market Data", "Access to Future Developments"
  ]

  const getAccess = () => {
    // Vibration.vibrate(0, 250)
    setCurrWebview("pricing")
  };

  useEffect(() => {
    if (subscription != "none") navigation.replace("Home")
  }, [subscription])
  
  const handleCenterButtonClick = () => {
    navigation.navigate("Center")
  }

  async function subscribe() {
    try {
      const offerings = await Purchases.getOfferings();
      if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
        console.log(offerings.current);
      }
    } catch (e) {
      console.log(e);
     
    }
  }
  
  return (
    <View style={styles(screenWidth, screenHeight).container}>
      <Modal transparent={true} animationType="fade" visible={currWebview === "pricing"}>
        <InAppWebBrowser url={'https://www.claros.ai/pricing'} currWebview={currWebview} setCurrWebview={setCurrWebview}></InAppWebBrowser>
      </Modal>
      <View style={{height: screenHeight * 0.9, justifyContent: 'space-between'}}>
        <View style={styles(screenWidth, screenHeight).popupContainer}>
        <TouchableOpacity style={styles(screenWidth, screenHeight).icon} onPress={handleCenterButtonClick}>
          <Ionicons name="person-circle" size={28} color="#0060FF" />
        </TouchableOpacity>
          <Image source={require('../assets/claros__iOS__card__light.png')} style={styles(screenWidth, screenHeight).image}/>
          <Text style={styles(screenWidth, screenHeight).popupHeader}>Claros AI</Text>
          <Text style={styles(screenWidth, screenHeight).popupSubheader}>We're sorry, but Claros AI is presently only available to our subscribers. We know this is not ideal.</Text>
          <View style={styles(screenWidth, screenHeight).dummyView}></View>
          <Image source={require('../assets/hero__feature-graphic.png')} style={styles(screenWidth, screenHeight).heroImage}/>
          {/* {benefits.map((benefit, i) => {
            return (
              <View key={benefit + i} style={styles(screenWidth, screenHeight).listItem}>
                <AntDesign style={{paddingRight: 8}} name="checkcircle" size={25} color="#000000" />
                <Text style={styles(screenWidth, screenHeight).listItemText}>{benefit}</Text>
              </View>
            )
          })} */}
        </View>
        <View>
          <TouchableOpacity style={styles(screenWidth, screenHeight).button} onPress={subscribe}>
            <Text style={styles(screenWidth, screenHeight).buttonText}>View Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default CTAScreen

const styles = (screenWidth, screenHeight) => StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: screenHeight,
    backgroundColor: 'white',
  },
  image: {
    height: 50,
    width: 50,
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
