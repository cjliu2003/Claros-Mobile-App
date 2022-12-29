// USER CONTEXT

// This code imports various functions and components from the React and Firebase libraries. 
// It then creates a context object called UserContext, and exports a hook and a provider 
// component for this context.

import { createContext, useContext, useState, useEffect} from "react";
import { auth } from "../firebase";
import { firestore } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateEmail} from "@firebase/auth";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { REACT_APP_STRIPE_PREMIUM_WEEKLY1, REACT_APP_STRIPE_PREMIUM_MONTHLY1, REACT_APP_STRIPE_PREMIUM_WEEKLY2, REACT_APP_STRIPE_PREMIUM_MONTHLY2 } from '@env'
import { findTodaysLines } from "../functions/lines/findTodaysLines";

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
        if (customer) {
            let date = new Date()
            setHistoricalBetSlip(findTodaysLines(date, customer.historical_bet_slip.reverse().slice(0,10)))
            setBetHistory(customer.historical_bet_slip)
        }
    }, [customer])
    
    
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

    // takes in user and sportsbooks
    const excludeSportsbook = (user, sportsbook) => {
        let currentBooks = customer.sportsbooks;
        if (currentBooks.includes(sportsbook)) {
            for (let i = 0; i < currentBooks.length; i++) {
                if (currentBooks[i] === sportsbook) {
                    currentBooks.splice(i, 1)
                    i--
                }
            }
        } else {
            currentBooks.push(sportsbook)
        }
        const userDocRef = doc(firestore, "customers", user.uid);
        setDoc(userDocRef, {
            sportsbooks: currentBooks
        }, {merge: true});
    }


    // Helper function for registering user. will intialize a bet history array, allowing them to input bets they've placed.
    const initializeUserData = (user) => {
        const userDocRef = doc(firestore, "customers", user.uid);
        setDoc(userDocRef, {
            sportsbooks: [
                "onexbet",
                "sport888",
                "barstool",
                "betclic",
                "betfair",
                "betmgm",
                "betonlineag",
                "betrivers",
                "betsson",
                "betus",
                "betvictor",
                "bovada",
                "williamhill_us",
                "circasports",
                "draftkings",
                "fanduel",
                "foxbet",
                "gtbets",
                "intertops",
                "lowvig",
                "marathonbet",
                "matchbook",
                "mybookieag",
                "nordicbet",
                "pointsbetus",
                "sugarhouse",
                "superbook",
                "twinspires",
                "unibet_us",
                "unibet_eu",
                "williamhill",
                "wynnbet"
            ],
            leagues: [
                "MLB",
                "NBA",
                "NCAAF",
                "NFL",
                "NHL",
                "EFL Cup",
                "League 1",
                "League 2",
                "EPL",
                "Ligue 1 - France",
                "Ligue 2 - France",
                "Bundesliga - Germany",
                "Serie A - Italy",
                "La Liga - Spain",
                "UEFA Champions",
                "UEFA Europa",
            ],
            bet_history: {},
            login_times: [],
        }, {merge: true});
    }

    const registerUser = (email, password, name, phone) => {
        // Set the global loading state to true
        setLoading(true)
        // Attempt to create a new user with the provided email and password
        createUserWithEmailAndPassword(auth, email, password)
        // If the user is successfully created, update their display name
        .then(() => {
            return updateProfile(auth.currentUser, {
                displayName: name,
            });
        })
        // Log the result of the display name update
        .then((res) => console.log(res))
        // Write the user's phone number to the database and initialize their user data
        .then(() => {
            writePhone(auth.currentUser, phone);
            initializeUserData(auth.currentUser);
        })
        // If there is an error, set the sign-up error state with the error message
        .catch(err => setSignUpError(err.toString()))
        // Set the global loading state to false, regardless of success or failure
        .finally(() => setLoading(false));
    }
    
    const signInUserEmail = (email, password) => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
            console.log(email)
        })
        .catch(err => {
            setSignInError(err.toString())
        })
        .finally(() => setLoading(false));
    }

    const logoutUser = () => {
        signOut(auth);
        setSubscription(null);
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
        excludeSportsbook,
        recentSignIn, setRecentSignIn,
        historicalBetslip,
        betHistory,
    };
    
    return (
        <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
    );
};
