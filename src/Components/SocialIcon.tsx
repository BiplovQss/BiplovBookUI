import React from 'react';
import { TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import Colors from '../Utils/Colors';
import { normalizeSize } from '../Utils/CommonFun';
import RIcon from './RIcon';

const RButton = (props:any) => {
    const { style, onPress, filled, size, type, color, name } = props
    return (
        <TouchableOpacity style={[filled ?  styles.mainContainer1 : styles.mainContainer,style]}  onPress={onPress} >
        <RIcon size={size} type={type} color={color} name={name}/>
       </TouchableOpacity> 
    )
};

export default RButton;
const styles = StyleSheet.create({
    mainContainer: { flex: 1, maxHeight:normalizeSize(50), paddingVertical:normalizeSize(15), justifyContent: 'center', backgroundColor: Colors.themePrimary, marginVertical:20, borderRadius:10 },
    mainContainer1: { flex: 1, maxHeight:normalizeSize(50), paddingVertical:normalizeSize(15), justifyContent: 'center', backgroundColor: Colors.White, marginVertical:20, borderRadius:10 },
});