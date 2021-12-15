import React from 'react';
import { Icon } from 'react-native-elements';
const RIcon = (props:any) => {
  const {name, type, color, size, containerStyle, iconStyle, onPress} = props
  return <Icon name={name} size={size} type={type} color={color} onPress={onPress} containerStyle={containerStyle} iconStyle={iconStyle} tvParallaxProperties />;
};
export default RIcon;