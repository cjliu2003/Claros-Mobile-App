import { StyleSheet, Text, TouchableOpacity, View, Modal, Image } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { useScreenWidth, useScreenHeight } from "../contexts/useOrientation";
import InAppWebBrowser from './WebBrowser';
import { useUserContext } from '../contexts/userContext';
import Purchases from 'react-native-purchases';
import LoadingSpinner from './LoadingSpinner';

const SubscriptionCTA = (props) => {
    const screenWidth = useScreenWidth();
    const screenHeight = useScreenHeight();

    const { findSubscription, subscription, user} = useUserContext();
    const [currWebview, setCurrWebview] = useState("");
    const [isMidPurchase, setIsMidPurchase] = useState(false);
    const [priceString, setPriceString] = useState("");

    // const handleLegalPress = () => {
    //     setCurrWebview("terms");
    // }

    useEffect(() => {
        async function fetchPriceString() {
            const offerings = await Purchases.getOfferings();
            if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
                setPriceString(offerings.current.availablePackages[0].product.priceString);
            }
        }
        fetchPriceString();
    }, []);    

    async function subscribe() {
        if (user.uid) {
            setIsMidPurchase(true);

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
                if (res) {
                    // navigation.reset({
                    //     index: 0,
                    //     routes: [{ name: 'Home' }],
                    // });
                    setIsMidPurchase(false);
                    props.setIsSubscriber(true);
                    props.setShowCTAModal(false);
                }
                
            } catch (e) {

                if (!e.userCancelled) {
                    setIsMidPurchase(false);
                    console.log("Error raised while purchasing subscription: ", e);
                }
            }
            setIsMidPurchase(false);
            props.setShowCTAModal(false);
        } else {
        Alert.alert("There was an unknown error in fetching your credentials. Please refresh the app and try again.")
        }
    }
    
    return (
        <>
            {isMidPurchase ? <LoadingSpinner /> : null}
            <View style={styles(screenWidth, screenWidth).modal}>
                
                <View style={styles(screenWidth, screenHeight).salesContainer}>
                    <Image style={styles(screenWidth, screenWidth).clarosCard} source={require('../assets/claros__iOS__card__light.png')}></Image>
                    <View style={styles(screenWidth, screenHeight).carouselContainer}>
                        <Image style={styles(screenWidth, screenWidth).carouselImage} source={require('../assets/subscription__cta__carousel__image__3.png')}></Image>
                    </View>
                </View>
                <View style={styles(screenWidth, screenHeight).purchaseOuterContainer}>
                    <View style={styles(screenWidth, screenHeight).purchaseContainer}>
                        <View style={styles(screenWidth, screenHeight).pricingContainer}>
                            <Text style={styles(screenWidth, screenWidth).priceText}>{priceString}</Text>
                            <View style={styles(screenWidth, screenWidth).durationTextContainer}>
                                <Text style={styles(screenWidth, screenWidth).durationText}>/ week</Text>
                            </View>
                        </View>
                        <Text style={styles(screenWidth, screenWidth).descriptionText}>Get unrestricted access to Claros AI and take your betting to the moon! Includes access to future developments.</Text>
                        <TouchableOpacity style={styles(screenWidth, screenWidth).subscribeButton} onPress={subscribe}>
                        <Text style={styles(screenWidth, screenWidth).subscribeButtonText}>Subscribe</Text>
                        </TouchableOpacity>
                        <View style={styles(screenWidth, screenWidth).legalContainer}>
                            <Text style={styles(screenWidth, screenWidth).legalText}>By Subscribing, you agree to our <Text style={styles(screenWidth, screenWidth).legalBoldText}>Terms and Conditions</Text>. Subscriptions auto-renew until canceled, as described in the Terms. If you have subscribed through another platform, manage your subscription through that platform.</Text>
                        </View>
                    </View>
                </View>
            </View>
        </>
        
    )
}

export default SubscriptionCTA;

const styles = (screenWidth, screenHeight) => StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingTop: 20,
        paddingBottom: 20,
        paddingHorizontal:15,
        backgroundColor: '#FFFFFF',
    },
    salesContainer: {
        flex: 1,
        width: '100%',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 10,
        // borderColor: "#0060FF",
        // borderWidth: 1,
    },
    spinner: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: "absolute",
        zIndex: 100,
        backgroundColor: "#FFFFFF",
    },
    clarosCard: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    carouselContainer: {
        flex: 1,
        width: '100%',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        // borderColor: "#0060FF",
        // borderWidth: 1,
    },
    carouselImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        marginBottom: 10,
        // borderColor: "#0060FF",
        // borderWidth: 1,
    },
    salesText: {
        fontSize: 20,
        fontWeight: "200",
        color: "#000000",
        textAlign: "left",
    },
    purchaseContainer: {
        width: '100%',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    purchaseOuterContainer: {
        width: '100%',
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
    },
    pricingContainer: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
        marginBottom: 10,
    },
    priceText: {
        fontWeight: "900",
        fontSize: 64,
        color: "#0060FF",
        letterSpacing: 0,
    },
    durationTextContainer: {
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        marginBottom: 10,
    },
    durationText: {
        fontSize: 20,
        fontWeight: "200",
        color: "#000000"
    },
    descriptionText: {
        fontSize: 16,
        color: "#000000",
        textAlign: "left",
        marginTop: 20,
        marginBottom: 20
    },
    subscribeButton: {
        height: 60,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 11,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 0,
        shadowColor: '#0060FF',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        shadowOpacity: 0.75,
        backgroundColor: '#0060FF',
        marginBottom: 20,
    },
    subscribeButtonText: {
        fontSize: 20,
        fontWeight: "600",
        color: "#FFFFFF"
    },
    legalContainer: {
        width: '100%',
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        marginBottom: 10,
},
    legalText: {
        fontSize: 14,
        fontWeight: "200",
        color: "#000000",
        textAlign: "left",
    },
    legalBoldText: {
        fontSize: 14,
        fontWeight: "400",
        color: "#000000",
        textAlign: "left",
        textDecorationLine: "underline",
    },
});