import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import Colors from '../Utils/Colors';
import BodyText from './BodyText';
import { AllImages } from '../Utils/AllImages';
import { normalizeSize } from '../Utils/CommonFun';

const RButton = (props:any) => {
    const { style, title, titleStyle, onPress, filled } = props
    return (
        <TouchableOpacity style={[filled ? styles.mainContainer1 : styles.mainContainer,style]}  onPress={onPress} >
        <BodyText style={titleStyle ? titleStyle : filled ? styles.themeText : styles.noDataText}>{title}</BodyText>
       </TouchableOpacity> 
    )
};

export default RButton;
const styles = StyleSheet.create({
    mainContainer: { flex: 1, maxHeight:normalizeSize(50), paddingVertical:normalizeSize(15), justifyContent: 'center', backgroundColor: Colors.White, marginVertical:20, borderRadius:10 },
    mainContainer1: { flex: 1, maxHeight:normalizeSize(50), paddingVertical:normalizeSize(15), justifyContent: 'center', backgroundColor: Colors.themeGreen, marginVertical:20, borderRadius:10 },
    noDataText: { color:  Colors.themeGreen, alignSelf: 'center',fontWeight:'600', fontSize: normalizeSize(15),},
    themeText: { color:  Colors.White, alignSelf: 'center',fontWeight:'600', fontSize: normalizeSize(15),},
});