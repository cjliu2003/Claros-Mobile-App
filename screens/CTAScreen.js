import { Modal, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import {AntDesign} from '@expo/vector-icons'
import InAppWebBrowser from '../components/WebBrowser';
import { useUserContext } from '../contexts/userContext';
import { useScreenWidth, useScreenHeight } from "../contexts/useOrientation";
import { Ionicons } from '@expo/vector-icons';
import { StripeProvider, usePaymentSheet } from '@stripe/stripe-react-native';

const CTAScreen = ({navigation}) => {
  const screenWidth = useScreenWidth();
  const screenHeight = useScreenHeight();

  const {subscription} = useUserContext()
  const [currWebview, setCurrWebview] = useState("")
  const benefits = [
    "Unlimited Ratings & Analytics", "Constant Realtime Market Data", "Access to Future Developments"
]
  useEffect(() => {
    if (subscription != "none") navigation.replace("Home")
  }, [subscription])
  
  const handleCenterButtonClick = () => {
    navigation.navigate("Center")
  }

  // Stripe stuff!
  const [ready, setReady] = useState(false);
  const {initPaymentSheet, presentPaymentSheet, loading} = usePaymentSheet();

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const initializePaymentSheet = async () => {
     
    // const {paymentIntent, ephemeralKey, customer} = await fetchPaymentSheetParams();

    const {error} = await initPaymentSheet({
      // customerId: customer,
      // customerEphemeralKeySecret: ephemeralKey, // ephemeralKey is fetched from backend
      paymentIntentClientSecret: 'pi_3MUNesLm94FZCBUM0zgPWUGN_secret_OhzgfxqK9akK3dBgN8vRupH5f', // paymentIntent is created on and fetched from backend
      merchantDisplayName: 'Claros AI, LLC',
      allowsDelayedPaymentMethods: true,
      returnURL: 'stripe-example://stripe-redirect',
    });
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      setReady(true);
    }
  };

  // // Now we set up API fetch call from backend server defined in './backend/server.js'
  // const fetchPaymentSheetParams = async () => {
  //   const response = await fetch('https://053d-128-12-123-61.ngrok.io', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   const {paymentIntent, ephemeralKey, customer} = await response.json;

  //   return {
  //     paymentIntent,
  //     ephemeralKey,
  //     customer,
  //   };
  // };

  // Async function subscribe makes hook call to payment sheet initializer hook, supra
  async function subscribe() {
    const {error} = await presentPaymentSheet();

    if (error) {
      Alert.Alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.Alert('Success! The payment was confirmed successfully!');
      setReady(false);
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
          <Text style={styles(screenWidth, screenHeight).popupHeader}>Activate Claros AI</Text>
          <Text style={styles(screenWidth, screenHeight).popupSubheader}>Upgrade your betting game with Claros! Once you purchase a subscription, you will gain access to all Claros features.</Text>
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
          <StripeProvider
            publishableKey="pk_test_51L9D0DLm94FZCBUMlzrr3KMkkus8cwe0aovIfCGCrW9H4XlS6eD9YF1nBSK5IBS9bXXlgAXQlyY0LDzw1uGMumjH00U1dlZ7mf"
            // merchantIdentifier={MERCHANT_ID}
            >
              <TouchableOpacity style={styles(screenWidth, screenHeight).button} onPress={subscribe}>
                <Text style={styles(screenWidth, screenHeight).buttonText}>Get Access</Text>
              </TouchableOpacity>
            
          </StripeProvider>
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
    color: '#000000',
  }
})
