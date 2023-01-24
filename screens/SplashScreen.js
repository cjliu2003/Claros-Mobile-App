import { View, Image, StyleSheet } from 'react-native';
import { useScreenWidth, useScreenHeight } from "../contexts/useOrientation";

const SplashScreen = () => {
    const screenWidth = useScreenWidth();
    const screenHeight = useScreenHeight();

    return (
        <View style={styles(screenWidth, screenHeight).container}>
            <Image
                style={styles(screenWidth, screenHeight).logo}
                source={require('../assets/claros__logo__splash__light.png')}
            />
        </View>
    );
}

export default SplashScreen;

const styles = (screenWidth, screenHeight) => StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: "#FFFFFF",
        height: screenHeight,
        width: screenWidth,
    },
    logo: {
        width: 200,
        height: 200,
    },
})