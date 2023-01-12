import { Dimensions, StyleSheet, Text, TouchableOpacity, Vibration, View, Linking, Modal } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Feather';
import { useUserContext } from '../contexts/userContext';
import InAppWebBrowser from '../components/WebBrowser'


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const CenterScreen = ( {navigation} ) => {
  const {user, logoutUser} = useUserContext()
  const [isManageSubPressed, setIsManagedSubPressed] = useState(false);

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
          <TouchableOpacity style={styles.headerLeft} onPress={() => navigation.goBack()}>
            <Icon name="chevrons-left" size={28} color={"#FFFFFF"} />
          </TouchableOpacity>
        ),
    });
  }, [])

  const signOut = () => {
    Vibration.vibrate(0, 250)
    logoutUser()
  }

  const handleManageSubscription = () => {
    Vibration.vibrate(0, 250)
    setIsManagedSubPressed(true);

    // Linking.openURL('https://billing.stripe.com/p/login/00gbLJ0Zgd7U7IYcMM')
  }

  return (
      <View style={styles.container}>
        <TouchableOpacity onPress={handleManageSubscription} style={styles.manageSubscriptionButton}><Text style={styles.manageSubscriptionButtonText}>Manage Subscription</Text></TouchableOpacity>
        <TouchableOpacity onPress={signOut} style={styles.signOutButton}><Text style={styles.signOutButtonText}>Sign Out: {user && user.email}</Text></TouchableOpacity>
        <View style={styles.legalRow}>
            <Text style={styles.legalLinkText}>Terms and Conditions</Text>
            <Text style={styles.legalLinkText}>Privacy Policy</Text>
        </View>
        <Modal transparent={true} animationType="fade" visible={isManageSubPressed}>
          <InAppWebBrowser url={'https://billing.stripe.com/p/login/00gbLJ0Zgd7U7IYcMM'} setIsManagedSubPressed={setIsManagedSubPressed}></InAppWebBrowser>
        </Modal>
      </View>
  )
}


export default CenterScreen

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center',
      padding: 16,
      justifyContent: 'center',
      backgroundColor: "#0060FF"
    },
    legalRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 50
    },
    legalLinkText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#eeeeee'
    },
    headerLeft: {
        marginLeft: 20,
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
        marginVertical: screenHeight * 0.0125,
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