import React, { useState } from 'react';
import { Platform, ScrollView, StatusBar, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../Utils/Colors';
import Loading from '../Components/Loading';

const Layout = (props: any) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleSideMenu = () => { props.navigation.toggleDrawer(); setShowSideDrawer(!showSideDrawer); };
  const getChildLayoutContent = () => <View style={{ flex: 1 }}>
    {props.children}
  </View>

  return (
    <>
      {props.loading ? <Loading /> : null}
      <SafeAreaView style={{ flex: 1, backgroundColor: props.transparent ? Colors.trans : props.backgroundColor ? props.backgroundColor : Colors.White }}>
        <StatusBar backgroundColor={Colors.statusBarColor} barStyle={'dark-content'} />
        <View style={{ backgroundColor: props.transparent ? Colors.trans : props.backgroundColor ? props.backgroundColor : Colors.White, flex: 1, paddingBottom: 5 }}>
          {
            props.hasChildScrollView ? getChildLayoutContent() :
              <ScrollView scrollEnabled={!props.loading} showsVerticalScrollIndicator={Platform.OS === 'ios' ? false : true} persistentScrollbar={true}
                style={{ flex: 1 }} >{getChildLayoutContent()}</ScrollView>
          }
        </View>

      </SafeAreaView></>
  );
};

export default Layout;