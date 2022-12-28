import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useUserContext } from '../contexts/userContext'
import BetHistoryListItem from '../components/BetHistoryListItem'
const BetHistory = ({navigation}) => {
    const {betHistory} = useUserContext()

    const goBack = () => {
        navigation.replace("Home")
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "",
            headerTitleStyle: {color: "black"},
            headerStyle: {backgroundColor: "#fff"},
            headerTintColor: "black",
            headerLeft: () => (
                <TouchableOpacity onPress={() => goBack()}>
                    <Text style={styles.goBackButton}>Back</Text>
                </TouchableOpacity>
            ),
        });
    }, [])
  return (
    <SafeAreaView>
        <ScrollView>
            <Text style={styles.headerText}>Bet History</Text>
            {betHistory.map((line, i) => {
                return (
                    <BetHistoryListItem line={line} idx={i + 1}/>
                )
            })}
        </ScrollView>
    </SafeAreaView>
  )
}

export default BetHistory

const styles = StyleSheet.create({
    goBackButton: {
        paddingLeft: 16,
        fontSize: 16,
        fontWeight: '300',
    },
    headerText: {
        fontWeight: '800',
        alignSelf: 'center',
        fontSize: 24,
        marginBottom: 16,
    },
})