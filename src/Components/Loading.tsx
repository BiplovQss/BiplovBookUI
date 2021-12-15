import React from 'react';
import {ActivityIndicator, StyleSheet, Dimensions, View} from 'react-native';
import { normalizeSize, statusBarHeight } from '../Utils/CommonFun';
import Colors from '../Utils/Colors';
import BodyText from './BodyText';
const { height } = Dimensions.get('window')

const Loading = (props:any) => {
    console.log("[test] loader loaded")
    return (
      <View style={[styles.container, !props.fullHeight && {height:'100%'}]}>
        <View style={{backgroundColor:Colors.White,borderRadius:normalizeSize(8), padding:normalizeSize(20),}}>
        <ActivityIndicator color={Colors.themePrimary} size="large"/>
        <BodyText style={styles.lText}>{props.text ? props.text : 'Loading...'}</BodyText>
        </View>
      </View>
    );
};

export default Loading;
const styles = StyleSheet.create({
  container: {position:'absolute',zIndex:9999, backgroundColor:Colors.blackFourOpacity, padding:10,width:'100%', justifyContent: 'center',alignItems:'center', alignSelf:'center', },
  lText: { color: Colors.themePrimary, paddingTop: 20 },
  lTextWhite : { color: Colors.White, paddingTop: 20 }
});