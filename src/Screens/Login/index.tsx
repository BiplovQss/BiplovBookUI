import React, { useState, useEffect } from 'react'
import { View, ImageBackground, Image, Keyboard } from 'react-native'
import Layout from '../../hoc/Layout';
import { AllImages } from '../../Utils/AllImages';
import GlobalStyles from '../../Utils/Global';
import Colors from '../../Utils/Colors';
import Config from '../../Utils/Config';
import { CheckNet, normalizeSize, validateEmail } from '../../Utils/CommonFun';
import BodyText from '../../Components/BodyText';
import GlobalInput from '../../Components/GlobalInput';
import RButton from '../../Components/RButton'
import SocialIcon from '../../Components/SocialIcon'
import KeyBoardWrapper from '../../Components/KeyBoardWrapper';
import auth, { firebase } from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk';
import { callgetUserDataFromFBApi } from '../../Services/Api/Index';
import { showMessage } from 'react-native-flash-message';
import { StackActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import Type from '../../Redux/Type';
import _ from 'lodash';
import { store } from '../../Redux/Store'

let ID = 0
let UData = ''





const Login = (props:any) => {
    const dispatch = useDispatch()
    const { route, navigation } = props

    const [DATA, setData] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [passError, setPassError] = useState('')
    const removeError = async () => { setEmailError(''); setPassError(''); }
    const showError = async (val:any) => { showMessage({ message: 'Error', description: val, type: "warning" }); }
    const showAlert = async (val:any) => { showMessage({ message: 'Alert', description: val, type: "warning" }); }
    const showSuccess = async (val:any) => { showMessage({ message: 'Alert', description: val, type: "success" }); }

    useSelector(S => {
        let D = ''
        //@ts-ignore
        if (S && S.loginStatus && S.loginStatus.loginData && Object.keys(S.loginStatus.loginData).length != 0) { D = S.loginStatus.loginData; if (D) { UData = D }; if (D.id) { ID = D.id } } return D
    })
   
    console.log('UData: ', UData)
   
useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
        GoogleSignin.configure({
            // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // [Android] what API you want to access on behalf of the user, default is email and profile
            scopes: ['email', 'profile'],
            //@ts-ignore
            androidClientId: '611350146281-9obtu0nkr8rei6n8rtii3u7ecl603i80.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            webClientId: '611350146281-9obtu0nkr8rei6n8rtii3u7ecl603i80.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            hostedDomain: '', // specifies a hosted domain restriction
            forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
            accountName: '', // [Android] specifies an account name on the device that should be used
            // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
            // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
            // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
            profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
        });

        const S = store.getState();
        let data = _.get(S.loginStatus,'loginData','') 
        if(data && data != '' && data.name){goToHome()}
    });
    return unsubscribe;
}, [route])


    const callGoogleSignIn = async () => {
        let Conn = await CheckNet();
        if (!Conn) { showAlert('No internet connection.')} else {  
        setLoading(true)
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log('userInfo', userInfo);
            // create a new firebase credential with the token
            //@ts-ignore
            // login with credential
            const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
            const firebaseUserCredential = await firebase.auth().signInWithCredential(googleCredential);
            console.log('firebaseUserCredential', firebaseUserCredential)
            let Name = _.get(firebaseUserCredential.user,'_user.displayName')
            let Img = _.get(firebaseUserCredential.user,'_user.photoURL')
            saveData(Name,Img)
            setLoading(false)
        } catch (error) {
            console.log(error)
            showError(String(error))
            setLoading(false)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    }};

    const validateFields = async () => {
        removeError()
        if (!email) {
            setEmailError('Please enter Email')
            return
        }
        if (!email.trim()) {
            setEmailError('Please enter Email')
            return
        }
        if (!validateEmail(email)) {
            setEmailError('Please enter valid Email')
            return
        }

        if (!password) {
            setPassError('Please enter Password')
            return
        }

        if (!password.trim()) {
            setPassError('Please enter Password')
            return
        }
        if (password.length < 5) {
            setPassError('Minimum 5 characters allowed')
            return
        }
        loginWithFirebase()
    }


const saveData = async (Name:any, Img:any) => {
    dispatch({ type: Type.LOGIN_STATUS, data: {name:Name, image:Img} })
    showSuccess('User successfully signed in!');
    goToHome()
};

const goToHome = async () => props.navigation.dispatch( StackActions.replace("Home"));
const goToCreateAccount = async () => props.navigation.navigate("Register");
    
const loginWithFirebase = async () => {
    let Conn = await CheckNet();
    if (!Conn) { showAlert('No internet connection.')} else {  
    setLoading(true)
    try {
        let user = auth().currentUser;
        if (!user) { showError('User not available! Please create an account first')}
        else { auth().signOut().then(() => console.log('User signed out!'));}  
    }catch(error){ showError(`logout: ${error}`); } 
    try {
    auth().signInWithEmailAndPassword(email, password)
    .then((res:any) => {
        console.log(res)
        showSuccess('User successfully signed in!');
        var getUsername = email.split("@");
        let name = getUsername[0];
        saveData(name,null)
        setLoading(false)
    })
    .catch(error => {
        setLoading(false)
        if (error.code === 'auth/email-already-in-use') {
        showError('That email address is already registered!');
        }

        if (error.code === 'auth/invalid-email') {
            showError('That email address is invalid!');
        }
    });
            
    } catch (error) {
        setLoading(false)
        showError(`error with simple login: ${error}`);    
    }
}}

    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            //   this.setState({ user: null, loggedIn: false }); // Remember to remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    }


    const CallgetApi = async () => {
        let Conn = await CheckNet();
        if (!Conn) { showAlert('No internet connection.')} else {  
        try {
            setLoading(true)
            LoginManager.logOut()
            Keyboard.dismiss();
            // if (Platform.OS=='android') { LoginManager.setLoginBehavior('WEB_ONLY'); }
            LoginManager.logInWithPermissions(['public_profile', 'email'])
                .then(async (result: any) => {
                    console.log("Login result", result);
                    if (result.isCancelled) {
                        console.log("Login cancelled");
                    } else {
                        console.log("Login success with permissions: ", result.grantedPermissions.toString());
                        const data = await AccessToken.getCurrentAccessToken();
                        if (!data) {
                            // handle this however suites the flow of your app
                            throw new Error('Something went wrong obtaining the users access token');
                        } else {
                            setData(data)
                            getUser(data.accessToken)
                            console.log("permission ", data)
                        }
                    }
                    setLoading(false)
                })
                .catch((error) => {
                    setLoading(false)
                    console.log("Login fail with error: " + error);
                });

        } catch (error) {
            console.log("Login fail with catch error: " + error);
        }
    }}



    const getUser = async (token: any) => {
        setLoading(true)
        callgetUserDataFromFBApi(token)
            .then((res) => {
                setLoading(false)
                console.log('Login Success res :- ', res);
                if (res) {
                    let json = res;
                    let imgURL = _.get(res.picture,'data.url',null)
                    ValidateFBSignUpFields(json.email, json.name, json.id, imgURL);
                } else {
                    alert(res.result.password)
                }
            })
            .catch((error) => {
                setLoading(false)
                alert(error)
            })
    }

    const ValidateFBSignUpFields = async (email: any, username: any, fb_id: any, imgURL:any) => {
        setLoading(true)
        console.log('fbdata,', email, 'name', username, 'idd', fb_id, 'imgURL: ', imgURL)
        if (!fb_id) {
            alert('Some error occured')
        } else {
            if (email) {
                let EmailValid = validateEmail(email)
                if (!EmailValid) {
                    alert('Email_not_valid_message')
                } else {
                    if (username) {
                        console.log('==========email, username,fb_id==========================');
                        console.log(email, username, fb_id);
                        saveData(username,imgURL)
                        console.log('====================================');
                    } else {
                        alert('Username Not available')
                    }
                }
            } else {
                alert('Please enter your Email ID')
            }
        }
        setLoading(false)
    }

    return (
        <KeyBoardWrapper>
            <ImageBackground source={AllImages.splash} style={GlobalStyles.loginMainCont} imageStyle={GlobalStyles.fl1}>
                <Layout loading={loading}  transparent>
                    <View style={{ marginHorizontal: 20 }}>
                        <View style={{ flexDirection: 'row', paddingVertical: 10, marginBottom: Config.height / 15, marginTop: Config.height / 20 }}>
                            <View style={{ width: '80%', justifyContent: 'space-around' }}>
                                <BodyText style={{ fontSize: normalizeSize(18), color: Colors.White, fontWeight: '500' }}>Welcome to</BodyText>
                                <BodyText style={{ fontSize: normalizeSize(30), color: Colors.White, fontWeight: '700' }}>Recipe Book</BodyText>
                            </View>
                            <View style={{ width: '20%' }}>
                                <Image style={{ width: normalizeSize(52), height: normalizeSize(57) }} source={AllImages.Icon} />
                            </View>
                        </View>

                        <GlobalInput
                            Value={email}
                            MaxLength={30}
                            KeyboardType='email-address'
                            Placeholder={"Email"}
                            ErrorMessage={emailError}
                            OnChangeText={(val: any) => { setEmailError(''); setEmail(val) }}
                        />

                        <GlobalInput
                            Value={password}
                            MaxLength={30}
                            Placeholder={"Password"}
                            ErrorMessage={passError}
                            inputContainerStyle={{ marginTop: normalizeSize(10) }}
                            OnChangeText={(val: any) => { setPassError(''); setPassword(val) }}
                        />
                        <View>
                            <View style={{ borderColor: Colors.WhiteHalf, alignSelf: 'flex-end', paddingVertical: normalizeSize(3), borderBottomWidth: 2 }}>
                                <BodyText onPress={() => showError('Coming Soon')} style={{ fontSize: normalizeSize(13), color: Colors.White, fontWeight: '700' }}>Forgot password</BodyText>
                            </View>
                        </View>
                        <RButton onPress={() => validateFields()} title='Login' />
                        <BodyText style={{ fontSize: normalizeSize(13), alignSelf: 'center', color: Colors.White, fontWeight: '700' }}>Login with</BodyText>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: '47%' }}>
                                <SocialIcon onPress={() => CallgetApi()} size={normalizeSize(30)} type='evilicon' color={Colors.White} name='sc-facebook' />
                            </View>
                            <View style={{ width: '47%' }}>
                                <SocialIcon onPress={() => callGoogleSignIn()} filled size={normalizeSize(20)} type='simple-line-icon' color={Colors.themeBlue} name='social-google' />
                            </View>
                        </View>
                        <BodyText style={{ fontSize: normalizeSize(13), alignSelf: 'center', color: Colors.White, fontWeight: '700' }}>or</BodyText>
                        <RButton onPress={() => goToCreateAccount()}  filled title='Create an account' />
                    </View>



                </Layout>
            </ImageBackground>
        </KeyBoardWrapper>
    )
}

export default Login


    // Set an initializing state whilst Firebase connects
    //   const [initializing, setInitializing] = useState(true);
    //   const [user, setUser] = useState();

    //   // Handle user state changes
    //   function onAuthStateChanged(user) {
    //     setUser(user);
    //     if (initializing) setInitializing(false);
    //   }

    //   useEffect(() => {
    //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //     return subscriber; // unsubscribe on unmount
    //   }, []);
    //   useEffect(() => { CallApi() }, []);

    
    //  try {
    //  auth()
    //   .signInAnonymously()
    //   .then(() => {
    //     console.log('User signed in anonymously');
    //   })
    //   .catch(error => {
    //     if (error.code === 'auth/operation-not-allowed') {
    //       console.log('Enable anonymous in your firebase console.');
    //     }

    //     console.error(error);
    //   });

    // } catch (error) {
    //     console.log('error biplov',error );
    // }