import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import GlobalStyles from '../Utils/Global';
const KeyBoardWrapper = (props:any) => {
  return <KeyboardAvoidingView style = {GlobalStyles.fl1} behavior={Platform.OS === "ios" ? "padding" : undefined}>{props.children}</KeyboardAvoidingView>      
};
export default KeyBoardWrapper;