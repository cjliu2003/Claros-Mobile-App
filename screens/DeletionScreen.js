import { StyleSheet, Text, TouchableOpacity, View, Modal, Linking, Alert, Image } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Feather';
import { useUserContext } from '../contexts/userContext';
import { useScreenWidth, useScreenHeight } from "../contexts/useOrientation";
import InAppWebBrowser from '../components/WebBrowser';
import { RevenueCat } from '../functions/revenueCat/revenueCat';
import Spinner from 'react-native-loading-spinner-overlay';
import Purchases from 'react-native-purchases';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeletionScreen = ({navigation}) => {
  const screenWidth = useScreenWidth();
  const screenHeight = useScreenHeight();
  const {logoutUser, deleteAccount} = useUserContext()
  const [currWebview, setCurrWebview] = useState("")

  useLayoutEffect(() => {
    navigation.setOptions({
        title: "",
        headerStyle: {
            borderBottomWidth: 0,
            borderColor: 'transparent',
            shadowOpacity: 0,
            backgroundColor: "#0060FF"
        },
        headerLeft: () => (
          <TouchableOpacity style={styles(screenWidth, screenHeight).headerLeft} onPress={() => navigation.goBack()}>
            <Icon name="chevrons-left" size={28} color={"#FFFFFF"} />
          </TouchableOpacity>
        ),
    });
  }, [])

  const handleDelete = async() => {
      const deleteRes = await deleteAccount();
      console.log("Delete res:", deleteRes);
      if (deleteRes.success) {
          await AsyncStorage.setItem('userToken', '');
          Alert.alert(
              'Deletion Successful',
              deleteRes.message,
              [
                {
                  text: 'Ok',
                  onPress: async () => {
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'Welcome' }],
                    });
                  },
                },
              ],
            );
      } else {
          Alert.alert(
              'Deletion Failed',
              deleteRes.message,
              [
                {
                  text: 'Ok',
                  onPress: () => {},
                },
              ],
            );
      }
  }

  const handleBackToSearch = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  }

  return (
    <View style={styles(screenWidth,  screenHeight).container}>
      {/* <Image source={require('../assets/claros__iOS__card__dark.png')} style={styles(screenWidth, screenHeight).card}/> */}
      <Text style={styles(screenWidth, screenHeight).warningText}>The button below will delete your account when pressed. Please ensure you have cancelled your subscription before deleting your account.</Text>
      <TouchableOpacity style={styles(screenWidth, screenHeight).manageSubscriptionButton} onPress={handleBackToSearch}>
        <Text style={styles(screenWidth, screenHeight).manageSubscriptionButtonText}>Back To Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles(screenWidth, screenHeight).purchaseButton} onPress={handleDelete}>
        <Text style={styles(screenWidth, screenHeight).purchaseButtonText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  )
}

export default DeletionScreen

const styles = (screenWidth, screenHeight) => StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    padding: 16,
    justifyContent: 'center',
    backgroundColor: "#0060FF"
  },
  headerLeft: {
        marginLeft: 20,
  },
  card: {
      width: 200,
      height: 200,
  },
  warningText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: 35,
  },
  purchaseButton: {
    height: 60,
    width: screenWidth * 0.65,
    borderRadius: 11,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.75,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25,
  },
  purchaseButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  manageSubscriptionButton: {
    height: 60,
    width: screenWidth * 0.65,
    borderRadius: 11,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.75,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  manageSubscriptionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  signOutButton: {
      height: 60,
      width: screenWidth * 0.65,
      borderRadius: 11,
      shadowColor: '#FFFFFF',
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 5,
      shadowOpacity: 0.75,
      backgroundColor: '#000000',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: screenHeight * 0.0125,
  },
  signOutButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#ffffff',
  },
});
  