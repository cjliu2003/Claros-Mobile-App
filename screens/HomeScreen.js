import { Dimensions, Linking, Modal, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUserContext } from '../contexts/userContext';
import { Image } from '@rneui/base';
import {AntDesign} from '@expo/vector-icons'

// Get the current screen width and height
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const HomeScreen = ({navigation}) => {
  const {user, logoutUser, subscription} = useUserContext()
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  const [isPaying, setIsPaying] = useState(false)

  useEffect(() => {
    if (!user && !isPaying) navigation.navigate("Welcome")
  }, [user])

  const benefits = ["Unlimited search queries", "35+ Onshore and Offshore Sportsbooks", "NCAA, NBA, NFL, MLB, and NHL", "Access to future developments"]

  useEffect(() => {
    if (!subscription) setIsPopupVisible(true)
  }, [subscription])
  
  const signOut = async() => {
    await logoutUser()
    navigation.navigate("Welcome")
  }

  const getAccess = () => {
    setIsPaying(true)
    Vibration.vibrate(0, 250)
    Linking.openURL('https://www.claros.ai/pricing')
  };

  const handleCloseButton = () => {
    setIsPaying(false)
    setIsPopupVisible(false)
  }

  
  return (
    <View>
      <Modal visible={isPopupVisible}>
        <View style={{height: screenHeight * 0.9, justifyContent: 'space-between'}}>
          <View style={modalStyles.popupContainer}>
            <TouchableOpacity style={modalStyles.popupCloseBtn} onPress={handleCloseButton}>
              <Text style={modalStyles.popupCloseBtnText}>Not Now</Text>
            </TouchableOpacity>
            <Image source={require('../assets/claros__bot__logo.png')} style={modalStyles.image}/>
            <Text style={modalStyles.popupHeader}>Activiate Claros AI</Text>
            <Text style={modalStyles.popupSubheader}>Upgrade your betting game with Claros!</Text>
            {benefits.map((benefit, i) => {
              return (
                <View key={benefit + i} style={modalStyles.listItem}>
                  <AntDesign style={{paddingRight: 8}} name="checkcircle" size={25} />
                  <Text style={modalStyles.listItemText}>{benefit}</Text>
                </View>
              )
            })}
          </View>
          <View>
          </View>
          <View>
            <TouchableOpacity style={modalStyles.filledButton} onPress={getAccess}>
              <Text style={modalStyles.filledButtonText}>Get Access</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </Modal>

      <View style={styles.container}>
        
      </View>
    </View>
  )
}

export default HomeScreen
const modalStyles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
  },
  popupCloseBtn: {
    alignSelf: 'flex-end',
  },
  popupCloseBtnText: {
    fontSize: 16,
    fontWeight: '500',
  },
  popupContainer: {
    flexDirection: 'column',
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
    fontWeight: '300',
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
    color: 'black',
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'flex-start',
  }
})