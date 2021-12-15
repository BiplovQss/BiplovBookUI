import React, { useState , useEffect} from 'react'
import { View, Image, FlatList } from 'react-native'
import Layout from '../../hoc/Layout';
import { AllImages } from '../../Utils/AllImages';
import GlobalStyles from '../../Utils/Global';
import Colors from '../../Utils/Colors';
import { normalizeSize } from '../../Utils/CommonFun';
import BodyText from '../../Components/BodyText';
import { showMessage } from 'react-native-flash-message';
import { StackActions } from '@react-navigation/native';
import RIcon from '../../Components/RIcon';
import {useDispatch, useSelector} from 'react-redux'
import _ from 'lodash'
import Type from '../../Redux/Type';
let ID = 0
let UData = ''
let catData = [
    {
        image: AllImages.img1,
        title: 'Recipes',
        color: Colors.themeRecipts
    },
    {
        image: AllImages.img2,
        title: 'Chats',
        color: Colors.themeChats
    },
    {
        image: AllImages.img3,
        title: 'Networks',
        color: Colors.themeNetworks
    },
    {
        image: AllImages.img4,
        title: 'Friends',
        color: Colors.themeFriends
    },
    {
        image: AllImages.img5,
        title: 'Favourites',
        color: Colors.Red
    },
    {
        image: AllImages.img6,
        title: 'Uploads',
        color: Colors.themeYellow
    },
]

let notiData = [
    {
        date: 'Yesterday',
        title: 'Adebayo Apercu sent you a message'
    },
    {
        title: 'Oladele Tamilore replied your message',
        date: 'Monday 22 October'
    },
    {
        title: '20 people added your recipe as a favourite',
        date: 'Friday 19 October'
    },

]
const Home = (props: any) => {
    const dispatch = useDispatch()
    const { route, navigation } = props

    useSelector(S => {
        let D = ''
        //@ts-ignore
        if (S && S.loginStatus && S.loginStatus.loginData && Object.keys(S.loginStatus.loginData).length != 0) { D = S.loginStatus.loginData; if (D) { UData = D }; if (D.id) { ID = D.id } } return D
    })
    console.log('biplov kumar', UData)

    const [DATA, setData] = useState(catData)

    const [notiDATA, setNotiData] = useState(notiData)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", async () => {console.log('Home Page')});
        return unsubscribe;
    }, [route])


    const showError = async (val: any) => { showMessage({ message: 'Error', description: val, type: "warning" }); }
    const showAlert = async (val: any) => { showMessage({ message: 'Alert', description: val, type: "warning" }); }
    const showSuccess = async (val: any) => { showMessage({ message: 'Alert', description: val, type: "success" }); }


    const clearData = async () => {
        dispatch({ type: Type.LOGIN_STATUS, data: null})
        showSuccess('You have successfully logged out!')
        goToLogin()
     };

    const goToLogin = async () => props.navigation.dispatch(StackActions.replace("Login"));
    const goToCreateAccount = async () => props.navigation.dispatch(StackActions.replace("Home"));

    const goBack = async () => props.navigation.goBack(null);

    const renderItem = ({ item }) => (
        <View key={String(item)} style={GlobalStyles.cardViewCont}>
            <Image
                style={GlobalStyles.cardViewCont1}
                resizeMode={'contain'}
                source={item.image} />
            <BodyText style={{ fontSize: normalizeSize(13), color: item.color }}> {item.title} </BodyText>
        </View>
    )


    const renderNotiItem = ({ item }) => (
        <View key={String(item)} style={GlobalStyles.cardViewCont2}>
            <View>
                <RIcon color={Colors.Red} size={normalizeSize(30)} name='dot-single' type='entypo' />
            </View>
            <View >
                <BodyText style={{ fontSize: normalizeSize(13), marginTop: 10, color: item.color }}> {item.title} </BodyText>
                <BodyText style={{ fontSize: normalizeSize(13), marginTop: 10, marginBottom: 10, color: Colors.date }}> {item.date} </BodyText>
            </View>
        </View>
    )


    const UserImage = _.get(UData, 'image', undefined)
    const Name = _.get(UData, 'name', '')
    return (
        <Layout hasChildScrollView backgroundColor={Colors.homeBG} loading={loading}>
            <View style={GlobalStyles.cardViewCont14}>
                <BodyText onPress={() => clearData()} style={GlobalStyles.cardViewCont13}>Logout</BodyText>
            </View>
            <View style={GlobalStyles.cardViewCont3}>
                <View style={GlobalStyles.cardViewCont4}>
                    <BodyText style={GlobalStyles.cardViewCont5}>Welcome {Name ? Name : 'Test'}</BodyText>
                </View>
                <View style={GlobalStyles.w20}>
                    <Image style={GlobalStyles.cardViewCont6}
                        source={UserImage ? { uri: UserImage } : AllImages.user} />
                </View>
            </View>

            <View style={GlobalStyles.cardViewCont7}>
                <FlatList
                    data={DATA}
                    numColumns={3}
                    scrollEnabled={false}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </View>

            <View style={GlobalStyles.cardViewCont8}>
                <View style={GlobalStyles.cardViewCont9}>

                    <BodyText style={GlobalStyles.cardViewCont10}>Notifications</BodyText>
                    <View style={GlobalStyles.cardViewCont11}>
                        <BodyText onPress={() => showError('Coming Soon')} style={GlobalStyles.cardViewCont12}>Clear Notification</BodyText>
                    </View>
                </View>
                <FlatList
                    data={notiDATA}
                    scrollEnabled={false}
                    renderItem={renderNotiItem}
                    keyExtractor={(item, index) => String(index)}
                    showsVerticalScrollIndicator={false}
                />
            </View>

        </Layout>

    )
}

export default Home