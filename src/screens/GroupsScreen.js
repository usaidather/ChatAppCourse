import React, { useLayoutEffect, useState, useEffect } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import ButtonWithBackground from '../componenets/ButtonWithBackground'
import GroupItem from '../componenets/GroupsItems'
import Images from '../const/Images'
import firebase, { firestore } from '../firebase/Firebase'

function GroupsScreen({ navigation }) {
    const [groups, setGroups] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <ButtonWithBackground onPress={() => {
                    navigation.navigate('Add Group Screen')
                }}
                    image={Images.add}
                />
            ),
            headerLeft: () => (
                <ButtonWithBackground onPress={() => {
                    signOutUser()
                }}
                    image={Images.logout}
                />
            )
        })

    })

    signOutUser = async () => {
        try{
            await firebase.auth().signOut()
            // navigation.reset({
            //     index: 0,
            //     routes: [{name: 'SplashScreen'}]
            // })
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        getChats()
    }, [])

    function getChats() {
        const db = firestore
        var groupArray = []

        db.collection("groups")
            .onSnapshot(function (snapshot) {
                snapshot.docChanges().forEach(function (change) {
                    if (change.type == "added") {
                        console.log("New Group: ", change.doc.data())
                        groupArray.push(change.doc.data())
                    }
                    if (change.type === "modified") {
                        console.log("Modified Group: ", change.doc.data())
                    }
                    if (change.type === "removed") {
                        console.log("Removed Group", change.doc.data())
                    }

                    setGroups(groupArray)
                })
            })

    }


    return (
        <View style={styles.container}>
            <FlatList
                data={groups}
                keyExtractor={(item, index) => 'key' + index}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('Chat Screen', {
                                item
                            })
                        }}>
                            <GroupItem item={item}></GroupItem>
                        </TouchableOpacity>
                    )
                }}
            >
            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ebebeb'
    },
    text: {
        color: '#101010',
        fontSize: 24,
        fontWeight: 'bold'
    }
})

export default GroupsScreen