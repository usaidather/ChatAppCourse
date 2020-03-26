import React from 'react'
import { TextInput, Text, StyleSheet, View } from 'react-native'
import Color from '../utils/Colors'
import Constants from '../const/Constants'

const PasswordTextField = ({ term, placeHolder, onTermChange, onValidatePasswordField, error }) => {
    return (
        <View>
            <Text style={styles.ErrorText}>{error}</Text>
            <View style={styles.TextFieldView}>
                <TextInput
                    autoCorrect={false}
                    secureTextEntry
                    style={styles.TextField}
                    placeholder={placeHolder}
                    value={term}
                    onChangeText={onTermChange}
                    onEndEditing={onValidatePasswordField}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    TextField: {
        fontSize: 14,
        flex: 1,
        marginHorizontal: 20
    },
    TextFieldView: {
        height: Constants.screenHeight * 0.06,
        width: Constants.screenWidth * 0.85,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 10,
        borderColor: Color.black,
        borderWidth: 1,
        justifyContent: 'center',
        backgroundColor: Color.smoke

    },
    ErrorText: {
        fontSize: 12,
        color: Color.red,
        marginBottom: -5,
        marginHorizontal: 20,
    }
})

export default PasswordTextField