// Ignore this file. It was intended to create the popup web browser. Will come back to this later.

import { TouchableOpacity, View, StyleSheet} from 'react-native'
import { WebView } from 'react-native-webview'
import React, { useLayoutEffect} from 'react'

const CenterScreen = (navigation) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Account Settings",
            headerLeft: () => (
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}>
                    <Text>Back</Text>
                </TouchableOpacity>
            ),
        });
    }, [])
  return (
    <View>
      <WebView source={{uri: "https://www.claros.ai/center"}} style={{flex: 1}} />
    </View>
  )
}

export default CenterScreen

const styles = StyleSheet.create({})