// Home Screen displays a user's betslip.
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, Linking, Dimensions, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { Button} from '@rneui/base';
import CustomListItem from '../components/customListItem';
import { useUserContext } from '../contexts/userContext';
import { getDeviceToken } from '../functions/getDeviceToken';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const HomeScreen = ({ navigation }) => {
    const {user, logoutUser, recentSignIn, setSignInError, setRecentSignIn, historicalBetslip, subscription} = useUserContext()

    const signOut = () => {
        logoutUser()
        setRecentSignIn(false);
        setSignInError(null);
        navigation.replace("Login")
    }

    const openCenterURL = () => {
      Linking.openURL('https://claros.ai/center').catch((error) => console.error(error));
    };

    const openPricingURL = () => {
        Linking.openURL('https://claros.ai/pricing').catch((error) => console.error(error));
      };
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerTitleStyle: {color: "black"},
            headerStyle: {backgroundColor: "#fff"},
            headerTintColor: "black",
            headerLeft: () => (
              <View>
                  <Button onPress={() => signOut()}type="clear" style={styles.signOutButton}>
                      <Text style={styles.headerText}>Sign Out</Text>
                  </Button>
              </View>
            ),
        });
        if (!user && !recentSignIn) navigation.replace("Login")
        if (user) getDeviceToken()

    }, [])
  return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          {subscription ? <>
              <Text style={styles.brandText}>daily lines</Text>
              <Text style={styles.dateText}>{new Date().toString().substring(0,15)}</Text>

              {/* This is a conditional. If there betslip has lines, show the betslip. If not, show a message saying to check back soon. */}

              {historicalBetslip.length > 0 ? <>
                  {historicalBetslip.map((line, i) => {
                      return (
                          // Custom list item renders by taking in a line object from historical bet slip, and an index number
                          <CustomListItem line={line} idx={i + 1}/>
                      )
                  })}
              </> :
                  <>
                      <Image source={require('../assets/claros__algorithm.png')} style={styles.image}  />
                      <Text style={styles.noLinesMsg}>Claros is crunching numbers and scanning the market for value betting opportunities. Currently, there are no available opportunities. Please come back later!</Text>
                  </>
              }
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: screenHeight * 0.05 }}>
              <Button style={styles.outlineButton} type="transparent" onPress={() => openCenterURL()} title="Settings">
                  <Text style={styles.outlineButtonText}>Account Settings</Text>
              </Button>
              <Button style={styles.fillButton} type="transparent" onPress={() => navigation.navigate('Bet History')} title="Settings">
                  <Text style={styles.filledButtonText}>Bet History</Text>
              </Button>
              </View>
              <View style={styles.footer}></View>
              </>
          :
              <View style={styles.centered}>
                  <Text style={styles.pricingHdr}>Activate Claros AI</Text>
                  <Image style={styles.logo} source={require('../assets/claros__bot__logo.png')} />
                  <Text style={styles.genericText}>Get access to me, your personal betting assitant, with daily value betting notifications.</Text>
                  <View style={{ height: 20  }}></View>
                  <Text style={styles.genericText}>Includes access to future developments.</Text>
                  <View style={{ height: 20  }}></View>
                  <Button style={styles.filledButton} type="transparent" onPress={() => openPricingURL()} title="Login">
                    
                    <Text style={styles.filledButtonText}>Get Beta Access</Text>
                  </Button>
              </View>
          }
        </ScrollView>
      </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "flex-end",
        backgroundColor: '#ffffff',
    },

    scrollContainer: {
        width: screenWidth,
        height: '100%',
    },
    centered: {
        height: screenHeight * 0.75,
        marginLeft: screenWidth * 0.05,
        marginRight: screenWidth * 0.05,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        alignSelf: 'center',
        width: screenWidth * .35,
        height: screenWidth * .35,
        margin: 16,
    },
    image: {
      alignSelf: 'center',
      width: screenWidth * .50,
      height: screenWidth * .50,
    },
    pricingHdr: {
        fontSize: 30,
        fontWeight: '800',
        letterSpacing: -0.5,
        alignSelf: 'center',
    },
    pricingSubhdr: {
        fontSize: 20,
        fontWeight: '300',
        color: '#222222',
        textAlign: 'center',
        marginVertical: 16,
        width: 300,
        alignSelf: 'center',
    },
    pricingBtn: {
        width: 200,
        height: 75,
        backgroundColor: '#0060ff',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        margin: 16,
        alignSelf: 'center',
    },
    pricingBtnTxt: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        color: 'white',
    },
    inputContainerLabel: {
        marginBottom: 8,
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 16,
    },
    input: {
        width: 325,
        height: 56,
        marginTop: 10,
        paddingVertical: 10,
        borderColor: 'transparent',
        backgroundColor: '#f2f2f2',
        borderRadius: 11,
        color: 'black',
        fontWeight: '200',
    },
    errorMessage: {
        padding: 15,
        width: 300,
        color: '#b51c07',
        backgroundColor: '#b51c0720',
        fontWeight: '500',
    },
    inputContainer: {
        width: 325,
        marginTop: 10,
        paddingVertical: 10,
        borderColor: 'transparent',
        borderRadius: 32,
    },
    inputContainerText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
    },
    outlineButton: {
        width: 325,
        marginTop: 10,
        paddingVertical: 10,
        borderColor: '#000',
        backgroundColor: 'transparent',
        borderRadius: 32,
        borderWidth: 1.5,
    },
    fillButton: {
        width: 325,
        marginTop: 10,
        paddingVertical: 10,
        borderColor: '#000',
        backgroundColor: 'black',
        borderRadius: 32,
        borderWidth: 1.5,
    },
    noLinesMsg: {
        padding: 50,
        color: 'black',
        fontWeight: '400',
        fontSize: 16
    },
    filledButton: {
        width: 325,
        marginTop: 10,
        paddingVertical: 10,
        borderColor: 'transparent',
        backgroundColor: '#0060ff',
        borderRadius: 32,
    },
    outlineButtonText: {
        color: 'black',
        fontWeight: '600',
        fontSize: 18,
    },
    filledButtonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
    },
    genericText: {
        color: 'black',
        fontWeight: '200',
        fontSize: 20,
        textAlign: 'center',
    },
    dateText: {
        color: 'black',
        fontWeight: '200',
        fontSize: 20,
        textAlign: 'center',
        marginTop: screenHeight * 0.0125,
        marginBottom: screenHeight * 0.05,
    },
    homeHeaderText: {
        color: 'black',
        fontWeight: '600',
        fontSize: 20,
        textAlign: 'center',
        marginTop: screenHeight * 0.05,
    },
    
    brandText: {
        color: '#0060ff',
        fontWeight: '900',
        fontSize: 70,
        textAlign: 'center',
        marginTop: screenHeight * 0.05
    },
    headerText: {
        color: 'black',
        fontWeight: '200',
        fontSize: 16,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-end",
        backgroundColor: '#ffffff',
    },
    footerText: {
        width: screenWidth * 0.70,
        marginTop: screenHeight * 0.025,
        marginBottom: screenHeight * 0.055,
        color: 'black',
        fontWeight: '200',
        fontSize: 18,
        textAlign: 'center',
    },
})
