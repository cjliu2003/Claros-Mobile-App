// USER CONTEXT

// This code imports various functions and components from the React and Firebase libraries. 
// It then creates a context object called UserContext, and exports a hook and a provider 
// component for this context.

import { createContext, useContext, useState, useEffect} from "react";
import { auth } from "../firebase";
import { firestore } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateEmail, fetchSignInMethodsForEmail} from "@firebase/auth";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { REACT_APP_STRIPE_PREMIUM_WEEKLY1, REACT_APP_STRIPE_PREMIUM_MONTHLY1, REACT_APP_STRIPE_PREMIUM_WEEKLY2, REACT_APP_STRIPE_PREMIUM_MONTHLY2 } from '@env'
import { Alert } from "react-native";
import { parseFirebaseSignInError } from "../functions/parsing/parseFirebaseSignInError";
import { parseFirebaseSignUpError } from "../functions/parsing/parseFirebaseSignUpError";

// Imports for Vulcan relations stemming from Firebase
// import { addUserToVulcan } from '../functions/search/searchQueryStorage';

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
    // The historicalBetslip state represents the user's most recent bet slips
    const [historicalBetslip, setHistoricalBetSlip] = useState([]);
    // The betHistory state represents the user's entire bet history
    const [betHistory, setBetHistory] = useState([]);
    // The change state is used to trigger updates to the customer state
    const [change, setChange] = useState(false);
    const [authEmail, setAuthEmail] = useState("");
    
    // Sets the user information whenever the auth state changes
    useEffect(() => {
      setLoading(true)
      const unsubscribe = onAuthStateChanged(auth, res => {
        // If a user is authenticated, set the user state with the user data
        // Otherwise, set the user state to null
          res ? setState(res) : setUser(null)
          setError("")
          setLoading(false);
      });
      return unsubscribe;
    }, []);

    const setState = (user) => {
        setUser(user)
        findData(user)
    }

    const isAuthenticatedEmail = async(email) => {
        try {
            const result = await fetchSignInMethodsForEmail(auth, email);
            return result.length > 0
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    // Sets customer data whenever a user state changes
    useEffect(() => {
        if (user) {
            findData(user);
        }
    }, [user, change])

    // function that finds the customer data collection in firebase. 
    // Sets the data to the customer state.
    const findData = async(user) => {
        setLoading(true)
        const userDocRef = doc(firestore, "customers", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
            setCustomer(userDocSnap.data());
        } else {
            console.log("No such doc :(");
        }
        setLoading(false)
    }
     
    useEffect(() => {
        if (user) findSubscription()
    }, [user])
    
    // Helper function. Inputs the priceId and returns the associated subscription name
    const parsePriceId = (priceId) => {
        if (priceId === REACT_APP_STRIPE_PREMIUM_WEEKLY1 || priceId === REACT_APP_STRIPE_PREMIUM_MONTHLY1 || REACT_APP_STRIPE_PREMIUM_WEEKLY2 || priceId === REACT_APP_STRIPE_PREMIUM_MONTHLY2) {
            return "premium"
        }
    }

    // Finds the customer's subscription status in firebase.
    const findSubscription = async() => {
        // reference to user's subscription document in firebase firestore. Goal is to find the subId
        const subCollectionRef = collection(firestore, "customers", user.uid, "subscriptions");
        const userCollectionSnap = await getDocs(subCollectionRef);
        // finds the subId to allow access into the plan document
        let subId;
        userCollectionSnap.forEach((document) => {
            subId = document.id;
        })
        if (subId) {
            // reference to user's subscription data using the id
            const subDocRef = doc(firestore, "customers", user.uid, "subscriptions", subId)
            const subDocSnap = await getDoc(subDocRef);
    
            // active is a boolean, representing if the subscription is active or not
            // priceId is the product they purhased (subscription plan)
            let items = subDocSnap.data().items;
            let active;
            let priceId;
            if (items) {
                active = items[items.length - 1].plan.active
                priceId = items[items.length - 1].plan.id
                if (active && priceId) {
                    let subscription = parsePriceId(priceId)
                    setSubscription(subscription)
                }
            }
        } else {
            setSubscription("none")
        }
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
        let newQuery = {
            query: query,
            results: results,
            timestamp: Date.now()
        }
        curr.push(newQuery)
        const userDocRef = doc(firestore, "customers", user.uid);
        updateDoc(userDocRef, {
            search_queries: curr
        }, {merge: true});
    }

    // Helper function for registering user. will intialize a bet history array, allowing them to input bets they've placed.
    const initializeUserData = (user) => {
        const userDocRef = doc(firestore, "customers", user.uid);
        setDoc(userDocRef, {
            search_queries: []
        }, {merge: true});
    }

    const registerUser = (password) => {
        // Set the global loading state to true
        setLoading(true)
        // Attempt to create a new user with the provided email and password
        createUserWithEmailAndPassword(auth, authEmail, password)
        // Log the result of the display name update
        // If there is an error, set the sign-up error state with the error message
        .catch(err => {
            if (err) {
                Alert.alert('Sign Up Error', parseFirebaseSignUpError(err))
            }
        }).then((res) => console.log(res))
        .then(() => {
            initializeUserData(auth.currentUser);
        })
        // Set the global loading state to false, regardless of success or failure
        .finally(() => setLoading(false));
    }
    
    const signInUserEmail = async (email, password) => {
        setLoading(true);
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            const uid = auth.currentUser.uid;
            console.log(`User ${email}, with uid = ${uid}, just signed in!`);
            return uid;
        } catch (err) {
            Alert.alert("Sign In Error", parseFirebaseSignInError(err));
        } finally {
            setLoading(false);
        }
    }
    
    const logoutUser = () => {
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
        setChange,
        recentSignIn, setRecentSignIn,
        historicalBetslip,
        betHistory,
        isAuthenticatedEmail,
        authEmail, setAuthEmail,
        trackSearchQuery
    };
    
    return (
        <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
    );
};
