import React from 'react';
//@ts-ignore
import {Text} from 'react-native';
import GlobalStyles from "../Utils/Global";
const BodyText = (props:any) => {
  return <Text onPress={props.onPress} numberOfLines={props.numberOfLines} {...props} style={{...GlobalStyles.bodyText,...props.style}}>{props.children}</Text>;
};
export default BodyText;