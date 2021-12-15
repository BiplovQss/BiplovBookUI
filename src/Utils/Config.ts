import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window");
const SEC = 'https://**********************'
const HOST = 'https://**********************'
const LIVE = 'api/'
const version = 'V 0.0.1'
const FBURL = 'https://graph.facebook.com/v2.5/me?fields=email,name,picture.type(large),friends&access_token='


export default {
    HOST,
    SEC,
    LIVE,
    width, height,
    version,
    FBURL
}
