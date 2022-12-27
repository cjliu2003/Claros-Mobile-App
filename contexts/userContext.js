// This is the workhorse of the user data. Here are functions that allow you to manage state of user auth and customer data throughout the website

import { createContext, useContext, useState, useEffect} from "react";
import { auth } from "../firebase";
import { firestore } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateEmail} from "@firebase/auth";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { findTodaysLines } from "../functions/findTodaysLines";
import {REACT_APP_STRIPE_PREMIUM_WEEKLY, REACT_APP_STRIPE_PREMIUM_MONTHLY} from '@env'

const UserContext = createContext({});

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {

    // an object of the users data, including email, display name, and profile picture
    const [user, setUser] = useState(null);
    // an object of the user's data, pertaining to the product. Bet history, subscription info, sportsbook preferences
    const [customer, setCustomer] = useState(null);
    // a string that represents the user's subscriptoin status. Options are either "premium", "standard", or null.
    const [subscription, setSubscription] = useState(null);
    // state to manage loading globally, helps with not rendering pages until info is loaded
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [signInError, setSignInError] = useState(null);
    const [signUpError, setSignUpError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [recentSignIn, setRecentSignIn] = useState(false);
    const [historicalBetslip, setHistoricalBetSlip] = useState([])


    // triggers an update, the value of the boolean doesn't even matter lol
    const [change, setChange] = useState(false);

    // Sets the user information whenever the auth state changes
    useEffect(() => {
      setLoading(true)
      const unsubscribe = onAuthStateChanged(auth, res => {
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

    // function that finds the customer data collection in firebase. Sets the data to the customer state.
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
        }
    }, [customer])
    
    

    useEffect(() => {
        if (user) findSubscription()
    }, [user])
    
    
    // Helper function. Inputs the priceId and returns the associated subscription name
    const parsePriceId = (priceId) => {
        if (priceId === REACT_APP_STRIPE_PREMIUM_WEEKLY || priceId === REACT_APP_STRIPE_PREMIUM_MONTHLY) {
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

    
    const updateDisplayName = (user, name) => {
        updateProfile(user, {
            displayName: name
        }).then(() => {
            console.log("Succesful Profile Update")
        }).catch((error) => {
            alert(error);
        })
    }

    const updateProfilePicture = (user, image) => {
        updateProfile(user, {
            photoURL: image
        }).then(() => {
            console.log("Succesful Profile Update")
        }).catch((error) => {
            alert(error);
        })
    }

    const changeEmail = (user, email) => {
        updateEmail(user, email).then(() => {
            console.log("Succesful Profile Update")
        }).catch((error) => {
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

    
    const initializePreferences = () => {
        const userDocRef = doc(firestore, "customers", user.uid);
        setDoc(userDocRef, {
            initializedPreferences: true,
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
            initializedPreferences: false,
            bet_history: {},
            login_times: [],
        }, {merge: true});
    }

    const registerUser = (email, password, name, phone) => {
        ///
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            return updateProfile(auth.currentUser, {
                displayName: name,
            });
        }).then((res) => console.log(res)).then(() => {
            writePhone(auth.currentUser, phone);
            initializeUserData(auth.currentUser);
        }).catch(err => setSignUpError(err.toString()))
        .finally(() => setLoading(false));
    }

    
    const signInUserEmail = (email, password) => {
        ///
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
        ///
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
        updateProfilePicture,
        setChange,
        excludeSportsbook,
        initializePreferences,
        recentSignIn, setRecentSignIn,
        historicalBetslip
    };
    
    return (
        <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
    );
};