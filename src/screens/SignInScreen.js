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

function SignInScreen() {

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
                            onTermChange={newEmail => { setEmail(newEmail)}}
                            onValidateEmailAddress={validateEmailAddress}

                        />

                        <PasswordTextField
                            term={password}
                            error={passwordError}
                            placeHolder={Strings.PasswordPlaceHolder}
                            onTermChange={newPassword => { setPassword(newPassword) }}
                            onValidatePasswordField={validatePasswordField}
                        />

                        <Button title={Strings.Join}  />
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