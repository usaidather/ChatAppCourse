import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import Constants from '../const/Constants'
import Images from '../const/Images'
import Color from '../utils/Colors'
import firebase, { firestore } from '../firebase/Firebase'


function MessageItem({ item }) {
    const userID = firebase.auth().currentUser.uid

    function messageView() {
        if (userID === item.senderId) {
            return (
                <View style={styles.othersMessageContainerView}>
                    <Text style={[styles.senderName, { textAlign: 'right' }]} >{item.senderEmail}</Text>
                    <Text style={[styles.message, { textAlign: 'right' }]}>{item.message}</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.myMessageContainerView}>
                    <Text style={styles.senderName}> {item.senderEmail}</Text>
                    <Text style={styles.message}>{item.message}</Text>
                </View>
            )
        }
    }

    return(
        messageView()
    )
}

const styles = StyleSheet.create({
    othersMessageContainerView: {
        width: Constants.screenWidth - 50,
        backgroundColor: Color.gray,
        borderRadius: 5,
        marginLeft: 25,
        marginTop: 5,
        marginBottom: 5,
        padding: 10
    },
    myMessageContainerView: {
        width: Constants.screenWidth - 50,
        backgroundColor: Color.gray,
        borderRadius: 5,
        margin: 5,
        padding: 10
    },
    senderName: {
        color: Color.white,
        fontSize: 14,
        fontWeight: 'bold'
    },

    message: {
        color: Color.white,
        fontSize: 14
    }
})


export default MessageItem