// USER CONTEXT

// This code imports various functions and components from the React and Firebase libraries. 
// It then creates a context object called UserContext, and exports a hook and a provider 
// component for this context.

import { createContext, useContext, useState, useEffect} from "react";
import { auth } from "../firebase";
import { firestore } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateEmail, fetchSignInMethodsForEmail} from "@firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { Alert } from "react-native";
import { parseFirebaseSignInError } from "../functions/parsing/parseFirebaseSignInError";
import { parseFirebaseSignUpError } from "../functions/parsing/parseFirebaseSignUpError";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RevenueCat } from "../functions/revenueCat/revenueCat";

// const revenueCat = new RevenueCat();
const UserContext = createContext({});

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
    // The user state represents the currently authenticated user
    const [user, setUser] = useState(null);
    // The customer state represents the customer data for the authenticated user
    const [customer, setCustomer] = useState(null);
    // The subscription state represents the subscription status for the authenticated user
    const [subscription, setSubscription] = useState(null);
    // The loading state represents whether the app is currently loading data
    const [loading, setLoading] = useState(true);
    // The error state represents any error that occurred while fetching data
    const [error, setError] = useState("");
    // The signInError state represents any error that occurred while signing in
    const [signInError, setSignInError] = useState(null);
    // The signUpError state represents any error that occurred while signing up
    const [signUpError, setSignUpError] = useState(null);
    // The success state represents whether a requested action was successful
    const [success, setSuccess] = useState(false);
    // The recentSignIn state represents whether the user recently signed in
    const [recentSignIn, setRecentSignIn] = useState(false);
    const [signUpSuccess, setSignUpSuccess] = useState(false);

    const [authEmail, setAuthEmail] = useState("");
    
    // Sets the user information whenever the auth state changes
    useEffect(() => {
      setLoading(true)
      const unsubscribe = onAuthStateChanged(auth, res => {
        // If a user is authenticated, set the user state with the user data
          if (res) {
            setUser(res)
          } else {
            setUser(null)
          }
          setError("")
          setLoading(false);
      });
      return unsubscribe;
    }, []);


    const isAuthenticatedEmail = async(email) => {
        try {
            const result = await fetchSignInMethodsForEmail(auth, email);
            return result.length > 0
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
     
    useEffect(() => {
        if (user) findSubscription()
    }, [user])
    
    // Finds the customer's subscription status in firebase.
    const findSubscription = async() => {
        console.log("The function `findSubscription()` in `userContext.js` was triggered!");
        try {
            const revenueCat = new RevenueCat();
            const customerInfo = await revenueCat.fetchCustomerInfo();
            console.log(customerInfo);
            if (customerInfo.entitlements.active.premium) {
                if (customerInfo.entitlements.active.premium.isActive === true) {
                    // setSubscription("premium")
                    console.log("premium")
                    return "premium"
                } else {
                    // setSubscription("none")
                    console.log("none")
                    return "none"
                }
            } else {
                // setSubscription("none")
                return "none"
            }
        } catch (error) {
            console.log("Error while getting customer info:", error);
        }

        // console.log(subscription);
    }

    // This function updates the display name of the given user with the given name
    const updateDisplayName = (user, name) => {
        // Update the user's profile with the new display name
        updateProfile(user, {
            displayName: name
        })
        .then(() => {
            // If the update is successful, log a message
            console.log("Succesful Profile Update")
        })
        .catch((error) => {
            // If there is an error, show an alert with the error message
            alert(error);
        })
    }

    // This function changes the email of the given user to the given email
    const changeEmail = (user, email) => {
        // Update the user's email
        updateEmail(user, email)
        .then(() => {
            // If the update is successful, log a message
            console.log("Succesful Profile Update")
        })
        .catch((error) => {
            // If there is an error, show an alert with the error message
            alert(error);
        })
    }

    const writePhone = (user, phone) => {
        const userDocRef = doc(firestore, "customers", user.uid);
        setDoc(userDocRef, {
            phone: phone
        }, {merge: true});
    }

    const trackSearchQuery = (query, results) => {
        let curr = []
        if (customer) {
            if (customer.search_queries) {
                curr = customer.search_queries
            } 
        }
        let currDate = new Date()

        let newQuery = {
            query: query,
            results: results,
            timestamp: currDate.toUTCString()
        }
        curr.push(newQuery)
        const userDocRef = doc(firestore, "customers", user.uid);
        updateDoc(userDocRef, {
            search_queries: curr
        }, {merge: true});
    }

    // Helper function for registering user. will intialize a bet history array, allowing them to input bets they've placed.
    const initializeUserData = (uid) => {
        const userDocRef = doc(firestore, "customers", uid);
        setDoc(userDocRef, {
            search_queries: []
        }, {merge: true});
    }

    const registerUser = async (password) => {
        setLoading(true);
        try {
            const res = await createUserWithEmailAndPassword(auth, authEmail, password)
            const uid = res.user.uid;
            const revenueCat = new RevenueCat();
            revenueCat.loginForRevenueCat(uid);
            initializeUserData(uid)
            return uid;
        } catch (err) {
            Alert.alert('Sign Up Error', parseFirebaseSignUpError(err))
            return null;
        } finally {
            setLoading(false);
        }
    }
    
    const signInUserEmail = async (email, password) => {
        setLoading(true);
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            const uid = auth.currentUser.uid;
            const revenueCat = new RevenueCat();
            revenueCat.loginForRevenueCat(uid)
            await AsyncStorage.setItem('userToken', uid); //store the user's uid in AsyncStorage
            return uid;
        } catch (err) {
            Alert.alert("Sign In Error", parseFirebaseSignInError(err));
        } finally {
            setLoading(false);
        }
    }
    
    const logoutUser = async() => {
        await AsyncStorage.setItem('userToken', '');
        // const revenueCat = new RevenueCat();
        // revenueCat.logoutForRevenueCat()
        signOut(auth);
        setSubscription("none");
    }

    const forgotPassword = (email) => {
        sendPasswordResetEmail(auth, email, {url: "http://claros.ai/signin"})
        .then(response => {
            console.log(response)
            setSuccess(true);
        }).catch(error => {
            console.log(error.message)
            setSuccess(false);
        })
    }

    const contextValue = {
        user,
        loading, setLoading,
        error,
        subscription,
        success,
        customer,
        signInError, setSignInError,
        signUpError, setSignUpError,
        registerUser,
        signInUserEmail,
        logoutUser,
        forgotPassword,
        updateDisplayName,
        changeEmail,
        writePhone,
        initializeUserData,
        recentSignIn, setRecentSignIn,
        isAuthenticatedEmail,
        authEmail, setAuthEmail,
        trackSearchQuery, 
        findSubscription,
        signUpSuccess
    };
    
    return (
        <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
    );
};
