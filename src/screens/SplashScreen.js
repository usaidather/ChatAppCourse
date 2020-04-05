import React, { useEffect, useLayoutEffect } from 'react'
import { StyleSheet, View, Text, Image, Alert } from 'react-native'
import Color from '../utils/Colors'
import Images from '../const/Images'
import Constants from '../const/Constants'
import firebase from '../firebase/Firebase'

function SplashScreen({ navigation }) {

    useEffect(() => {
        const { currentUser } = firebase.auth()
        setTimeout(function () {

            if (currentUser != null) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Groups Screen' }]
                })
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'SignInScreen' }]
                })
            }
        }, 1000);

    }, [navigation])

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={Images.logo}></Image>

        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        alignSelf: 'center',
        margin: 0.04 * Constants.screenHeight
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.theme
    }
})

export default SplashScreen