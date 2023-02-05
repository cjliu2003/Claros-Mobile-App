import { StyleSheet, Text, TouchableOpacity, View, Modal, Linking, Alert, Image } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Feather';
import { useUserContext } from '../contexts/userContext';
import { useScreenWidth, useScreenHeight } from "../contexts/useOrientation";
import InAppWebBrowser from '../components/WebBrowser';
import { RevenueCat } from '../functions/revenueCat/revenueCat';
import Spinner from 'react-native-loading-spinner-overlay';
import Purchases from 'react-native-purchases';
import SubscriptionCTA from '../components/SubscriptionCTA';

const CenterScreen = ({navigation}) => {
  const screenWidth = useScreenWidth();
  const screenHeight = useScreenHeight();
  const {user, logoutUser, deleteAccount} = useUserContext()
  const [currWebview, setCurrWebview] = useState("")
  const [isMidRenewal, setIsMidRenewal] = useState(false);
  const [showCTAModal, setShowCTAModal] = useState(false);
  const [isSubscriber, setIsSubscriber] = useState(null);

  useEffect(() => {
    const checkSub = async() => {
      const revenueCat = new RevenueCat()
      let infoSnap = await revenueCat.fetchCustomerInfo()
      if (infoSnap.entitlements.all.premium) {
        if (infoSnap.entitlements.all.premium.isActive) {
          setIsSubscriber(true)
        } else {
          setIsSubscriber(false)
        }
      } else {
        setIsSubscriber(false)
      }
    }
    checkSub()
  }, [])
  
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
        // headerRight: () => (
        //   <TouchableOpacity style={styles(screenWidth, screenHeight).headerRight} onPress={restorePurchases}>
        //     <Text style={styles(screenWidth, screenHeight).subscribeButtonText}>Subscribe</Text>
        //   </TouchableOpacity>
        // ),
    });
  }, [])

  useEffect(() => {
    if (!user) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    }
  }, [user])
  

  const signOut = () => {
    // Vibration.vibrate(0, 250)
    logoutUser()
  }

  const manageSubscription = async() => {
    let revenueCat = new RevenueCat();
    let infoSnap = await revenueCat.fetchCustomerInfo()
    if (infoSnap.managementURL) {
      Linking.openURL(infoSnap.managementURL)
    } else {
      Alert.alert("There was an error managing your subscription. Please ensure you have purchased a subscription.")
    }
  }

  const handleDelete = async() => {
    Alert.alert(
      'Delete Account',
      'Apple will continue to bill you for your subscription until you cancel it. Please make sure you cancel your subscription before you proceed.',
      [
        {
          text: 'Manage Subscription',
          onPress: async () => {
            const revenueCat = new RevenueCat()
            let infoSnap = await revenueCat.fetchCustomerInfo()
            if (isSubscriber) {
              Linking.openURL(infoSnap.managementURL)
            }
          }
        },
        {
          text: 'Proceed',
          onPress: () => {
            navigation.navigate('Deletion')
          }
        }
      ],
      { cancelable: true }
    )    
  }

  const handleTermsClick = () => {
    // Vibration.vibrate(0, 250)
    setCurrWebview("terms")
  }

  const handlePrivClick = () => {
    // Vibration.vibrate(0, 250)
    setCurrWebview("terms")
  }

  const upgrade = async() => {
    setShowCTAModal(true);
    if (isSubscriber) {
      setShowCTAModal(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  }

  const handleCTAModalClose = () => {
    setShowCTAModal(false);
  }

  const restorePurchases = async() => {
    setIsMidRenewal(true);
    const revenueCat = new RevenueCat()
    const res = await revenueCat.restoreSubscription()
    console.log("Restore Response Object: ", res)
    if (res) {
      if (res.entitlements.all.premium.isActive) {
        setIsMidRenewal(false);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        if (user.uid) {
          // We show the SubscriptionCTA modal
          setIsMidRenewal(false);
          Alert.alert("No active subscription found. Please subscribe to continue.")
          setShowCTAModal(true);
          if (isSubscriber) {
            setShowCTAModal(false);
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
          }
        } else {
          Alert.alert("There was an unknown error in fetching your credentials. Please refresh the app and try again.")
        }
      }
    }
  }

  const handleAppleTermsClick = () => {
    setCurrWebview("apple_terms")
  }

  return (
    <View style={styles(screenWidth,  screenHeight).container}>
      <Spinner
          visible={isMidRenewal}
          color="#FFFFFF"
          overlayColor="#0060FF"
          animation="none"
        />
      <Image source={require('../assets/claros__iOS__card__dark.png')} style={styles(screenWidth, screenHeight).card}/>
      <TouchableOpacity onPress={signOut} style={styles(screenWidth, screenHeight).manageSubscriptionButton}><Text style={styles(screenWidth, screenHeight).manageSubscriptionButtonText}>Sign Out: {user && user.email}</Text></TouchableOpacity>
      {!isSubscriber && <TouchableOpacity onPress={upgrade} style={styles(screenWidth, screenHeight).purchaseButton}><Text style={styles(screenWidth, screenHeight).purchaseButtonText}>Upgrade to Premium</Text></TouchableOpacity>}
      <View style={styles(screenWidth, screenHeight).legalRow}>
          <View style={styles(screenWidth, screenHeight).legalTermsContainer}>
            <Text onPress={handleAppleTermsClick} style={styles(screenWidth, screenHeight).legalLinkText}>Apple {'\n'} Terms</Text>
          </View>
          <View style={styles(screenWidth, screenHeight).legalTermsContainer}>
            <Text onPress={handleTermsClick} style={styles(screenWidth, screenHeight).legalLinkText}>Claros {'\n'} Terms</Text>
          </View>
          <View style={styles(screenWidth, screenHeight).legalManageRestoreContainer}>
            {!isSubscriber && <Text onPress={restorePurchases} style={styles(screenWidth, screenHeight).legalLinkText}>Restore {'\n'} Purchases</Text>}
            {isSubscriber && <Text onPress={manageSubscription} style={styles(screenWidth, screenHeight).legalLinkText}>Manage {'\n'} Subscription</Text>}
          </View>
          <View style={styles(screenWidth, screenHeight).legalDeleteContainer}>
            <Text onPress={handleDelete} style={styles(screenWidth, screenHeight).legalLinkText}>Delete {'\n'} Account</Text>
          </View>
      </View>
      <Modal transparent={true} animationType="fade" visible={currWebview === "terms"}>
        <InAppWebBrowser url={'https://www.claros.ai/termsandconditions'} currWebview={currWebview} setCurrWebview={setCurrWebview}></InAppWebBrowser>
      </Modal>
      <Modal transparent={true} animationType="fade" visible={currWebview === "priv"}>
        <InAppWebBrowser url={'https://www.claros.ai/privacypolicy'} currWebview={currWebview} setCurrWebview={setCurrWebview}></InAppWebBrowser>
      </Modal>
      <Modal transparent={true} animationType="fade" visible={currWebview === "apple_terms"}>
        <InAppWebBrowser url={'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/'} currWebview={currWebview} setCurrWebview={setCurrWebview}></InAppWebBrowser>
      </Modal>
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
  )
}

export default CenterScreen

const styles = (screenWidth, screenHeight) => StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        padding: 16,
        justifyContent: 'center',
        backgroundColor: "#0060FF"
    },
    card: {
        width: 200,
        height: 200,
    },
    legalRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 50,
    },
    legalTermsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    legalPrivacyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    legalManageRestoreContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    legalDeleteContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    legalLinkText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#FFFFFF'
    },
    headerLeft: {
        marginLeft: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 50,
    },
    purchaseButton: {
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
      marginVertical: 25,
    },
    purchaseButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#000000',
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
})