import Purchases from "react-native-purchases";

export class RevenueCat {
    // Thsi function initially configures RevenueCart, and does so with anonymous App UID
    async configureRevenueCat() {
        // console.log("The function `configureRevenueCat()` was triggered!");

        Purchases.setDebugLogsEnabled(true);
        try {
            if (Platform.OS === 'ios') {
                Purchases.configure({ 
                    apiKey: "appl_ojeITQxIMBehijogjimVTULazFJ",
                });
                console.log("RevenueCat is properly configured, anonymously!")
            }
        } catch (error) {
            console.log("Error while anonymously configuring RevenueCat:", error)
        }
    }

    // This function logs in a Firebase UID to RevenueCat, and is called only after RevenueCat has
    // been initially configured with `configureRevenueCat()`
    async loginForRevenueCat(uid) {
        // console.log("The function `loginForRevenueCat()` was triggered!");

        try {
            // Later log in provided user Id
            console.log("Logging In: ", uid)
            Purchases.logIn(uid);
        } catch (error) {
            console.log(`Error while logging in uid ${uid} for RevenueCat:`, error);
        }
    }

    // This function logs out a present App UID from RevenueCat, be the App UID a Firebase UID or an
    // anonymous App UID. Not that this may only be called after RevenueCat has been initially configured
    // with `configureRevenueCat()`
    async logoutForRevenueCat() {
        // console.log("The function `logoutForRevenueCat()` was triggered!");

        try {
            Purchases.logOut();
        } catch(error) {
            console.log("Error while logging out RevenueCat:", error);
        }
    }

    // This function gets the customerInfo object for the App UID currently logged in to RevenueCat
    async fetchCustomerInfo() {
        // console.log("The function `fetchCustomerInfo()` was triggered!");

        let customerInfo;
        try {
            customerInfo = await Purchases.getCustomerInfo();
          } catch (e) {
            console.log("Error while fetching RevenueCat customer info:", error);
          }
        return customerInfo;
    }
}
