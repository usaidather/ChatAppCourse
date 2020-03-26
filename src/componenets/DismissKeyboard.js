import React from 'react'
import { TouchableWithoutFeedback, Keyboard, Image } from 'react-native'

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)

export default DismissKeyboard
