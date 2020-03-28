import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Alert, SafeAreaView, Image, KeyboardAvoidingView } from 'react-native'
import Button from '../componenets/Button'
import EmailTextField from '../componenets/EmailTextField'
import Color from '../utils/Colors'
import Strings from '../const/String'
import Images from '../const/Images'
import Constants from '../const/Constants'
import DismissKeyboard from '../componenets/DismissKeyboard'
import Utility from '../utils/Utility'
import PasswordTextField from '../componenets/PasswordTextField'
import firebase from '../firebase/Firebase'

function SignInScreen({navigation}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [isLoading, setIsLoading] = useState('')

    validateEmailAddress = () => {
        const isValidEmail = Utility.isEmailValid(email)
        isValidEmail ? setEmailError('') : setEmailError(Strings.InvalidEmailAddress)
        return isValidEmail
    }

    validatePasswordField = () => {
        const isValidField = Utility.isValidField(password)
        isValidField ? setPasswordError('') : setPasswordError(Strings.PasswordFieldEmpty)
        return isValidField
    }

    performAuth = () =>{
        const isValidEmail = validateEmailAddress()
        const isValidPassword = validatePasswordField()

        if(isValidEmail && isValidPassword){
            setEmailError('')
            setPasswordError('')
            registration(email, password)
        }
    }

    registration = (email, password) => {
        try {
            setIsLoading(true)

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(user => {
                    setIsLoading(false)
                    
                    navigation.reset({
                        index: 0,
                        routes:  [{name: 'Groups Screen'}]
                    })
                    // Alert.alert('Logged In')

                }).catch((error) => {

                    firebase.auth().createUserWithEmailAndPassword(email, password)
                        .then(user => {
                            setIsLoading(false)
                            // Alert.alert('Create A New user')
                            navigation.reset({
                                index: 0,
                                routes:  [{name: 'Groups Screen'}]
                            })
                        })
                        .catch((error) => {
                            setIsLoading(false)
                            console.log('error')
                            Alert.alert(error.message)
                        })
                })
        }
        catch (error) {
            setIsLoading(false)
            Alert.alert(error.message)
        }
    }




    return (
        <DismissKeyboard>
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.container} >
                    <SafeAreaView>
                        <Image style={styles.logo} source={Images.logo}></Image>

                        <EmailTextField
                            term={email}
                            error={emailError}
                            placeHolder={Strings.EmailPlaceHolder}
                            onTermChange={newEmail => { setEmail(newEmail) }}
                            onValidateEmailAddress={validateEmailAddress}

                        />

                        <PasswordTextField
                            term={password}
                            error={passwordError}
                            placeHolder={Strings.PasswordPlaceHolder}
                            onTermChange={newPassword => { setPassword(newPassword) }}
                            onValidatePasswordField={validatePasswordField}
                        />

                        <Button title={Strings.Join} onPress = {performAuth} isLoading = {isLoading} />
                    </SafeAreaView>
                </View>

            </KeyboardAvoidingView>

        </DismissKeyboard>

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

export default SignInScreen