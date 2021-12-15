import React, { useState, useEffect } from 'react'
import { View, ImageBackground, Image } from 'react-native'
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
import { showMessage } from 'react-native-flash-message';
import { StackActions } from '@react-navigation/native';


GoogleSignin.configure({
    // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // [Android] what API you want to access on behalf of the user, default is email and profile
    scopes: ['email', 'profile'],
    webClientId: '611350146281-9obtu0nkr8rei6n8rtii3u7ecl603i80.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
    // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    // googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    // openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
    profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});



const Register = (props:any) => {
    const [DATA, setData] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [passError, setPassError] = useState('')
    // useEffect(() => { showMessage({ message: 'Error', description: 'Testing Error', type: "warning" }); }, []);
    const removeError = async () => { setEmailError(''); setPassError(''); }
    const showError = async (val:any) => { showMessage({ message: 'Error', description: val, type: "warning" }); }
    const showAlert = async (val:any) => { showMessage({ message: 'Alert', description: val, type: "warning" }); }
    const showSuccess = async (val:any) => { showMessage({ message: 'Alert', description: val, type: "success" }); }



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

const goToHome = async () => props.navigation.dispatch( StackActions.replace("Home"));
const goToCreateAccount = async () => props.navigation.dispatch( StackActions.replace("Home"));
    
const goBack = async () => props.navigation.goBack(null);

const loginWithFirebase = async () => {
    let Conn = await CheckNet();
  if (!Conn) { showAlert('No internet connection.')} else {  
setLoading(true)
try {
auth().createUserWithEmailAndPassword(email, password)
.then((res:any) => {
    console.log(res)
    setLoading(false)
    showSuccess('User account created & please signed in!');
    goBack()
  })
  .catch(error => {
    setLoading(false)
    if (error.code === 'auth/email-already-in-use') {
      showError('That email address is already in use!');
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
                        <BodyText style={{ fontSize: normalizeSize(13), color: Colors.White,marginVertical:normalizeSize(10), fontWeight: '700' }}>Create Account</BodyText>

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
                                <BodyText onPress={() => goBack()} style={{ fontSize: normalizeSize(13), color: Colors.White, fontWeight: '700' }}>Cancel</BodyText>
                            </View>
                        </View>
                        <RButton onPress={() => validateFields()} title='Continue' />
                        <View style={{marginTop:Config.height/4, alignItems:'center'}}>
                        <BodyText onPress={() => goBack()} style={{ fontSize: normalizeSize(13), color: Colors.WhiteHalf, fontWeight: '700' }}>Already an account? Login</BodyText>

                        </View>

                    </View>



                </Layout>
            </ImageBackground>
        </KeyBoardWrapper>
    )
}

export default Register


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