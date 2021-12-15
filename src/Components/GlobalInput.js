import React, { Component, FunctionComponent } from 'react'
import { Keyboard } from 'react-native';
import { Input } from "react-native-elements";
import Colors from '../Utils/Colors';
import GlobalStyles from '../Utils/Global';

export default class GlobalInput extends Component {
    render() {
        const { ContainerStyle, AutoCapitalize, InputStyle, PlaceholderTextColor, OnChangeText, Value, AutoFocus, KeyboardType, Label,
            ReturnType, MaxLength, onFocus, Ref, InputMainStyle, Placeholder, ErrorMessage, RightIcon, RightText, LeftIcon, inputContainerStyle, SecureTextEntry, OnSubmitEditing, Multiline, DisableEdit,
            textAlign, onBlur, disabled,LabelStyle } = this.props

        const onSubmit = () => {
            Keyboard.dismiss();
            OnSubmitEditing ? OnSubmitEditing() : console.log('onSubmit')
        }
        return (
            <Input
                autoCapitalize={AutoCapitalize ? AutoCapitalize : 'none'}
                style={[InputMainStyle]}
                placeholderTextColor={PlaceholderTextColor ? PlaceholderTextColor : Colors.White}
                onChangeText={OnChangeText}
                value={Value}
                multiline={Multiline}
                label={Value ? Label : ''}
                labelStyle={[GlobalStyles.LabelStyle, { height: Label ? 'auto' : 0 },LabelStyle]}
                returnKeyType={ReturnType ? ReturnType : 'done'}
                maxLength={MaxLength}
                ref={Ref}
                secureTextEntry={SecureTextEntry || false}
                textAlign={textAlign}
                keyboardAppearance="light"
                autoCorrect={false}
                keyboardType={KeyboardType || "default"}
                // inputAccessoryViewID={inputAccessoryViewID}
                returnKeyLabel={'Done'}
                blurOnSubmit={true}
                inputStyle={[GlobalStyles.inputText, InputStyle]}
                disabled={disabled}
                disabledInputStyle={{ color: Colors.globalBorder, opacity: 1 }}
                onBlur={onBlur}
                editable={DisableEdit ? false : true}
                // textAlignVertical="bottom"
                placeholder={Placeholder ? Placeholder : label}
                errorMessage={ErrorMessage}
                errorStyle={GlobalStyles.DefaultErrorStyle}
                inputContainerStyle={[GlobalStyles.inputContainerStyle, inputContainerStyle]}
                containerStyle={[GlobalStyles.inputContainer, ContainerStyle]}
                rightIcon={RightIcon}
                leftIcon={LeftIcon}
                autoFocus={AutoFocus}
                onFocus={onFocus}
                leftIconContainerStyle={GlobalStyles.IPIconDefaultContainerStyle}
                rightIconContainerStyle={GlobalStyles.IPIconDefaultContainerStyle}
                onSubmitEditing={onSubmit}
            />
        );
    }
}
