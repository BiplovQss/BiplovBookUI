import { Dimensions, Platform, StyleSheet } from "react-native";
import Colors from './Colors';
import { normalizeSize, statusBarHeight } from "./CommonFun";

const { height, width } = Dimensions.get('window');
const Margin = width / 20
const TitleFontSize = height / 45;
import Config from "./Config";
// const brandingStyle = {}
const GlobalStyles = StyleSheet.create({
  fl1: { flex: 1 },
  pageContainer: { flex: 1 },
  bodyText: { color: Colors.bodyTextColor,fontSize: normalizeSize(12) },
  loginMainCont: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  LabelStyle: { fontSize: TitleFontSize, color: Colors.Grey },
  DefaultErrorStyle: {fontSize: normalizeSize(11), height: normalizeSize(12), margin: 0, marginLeft:10, color: Colors.Red },
  IPIconDefaultContainerStyle: { height: 'auto', marginVertical: 0, paddingHorizontal: height / 100 },
  //Input Styles
  inputContainerStyle:{borderBottomWidth:0, backgroundColor: Colors.trans,},
  inputContainer: { marginTop: 5, paddingHorizontal: 0 },
  inputText: {paddingLeft:20, height:normalizeSize(50), borderRadius:10, backgroundColor: Colors.WhiteHalf, color: Colors.blackHalfOpacity, fontSize: normalizeSize(12) },
  inputTextContainer: { borderBottomColor: Colors.inputBoxBorder, borderColor: Colors.inputBoxBorder, borderWidth: 1, borderBottomWidth: 1, borderRadius: 6 },
  inputlabelText: { fontSize: normalizeSize(14), marginBottom: '2%', color: Colors.Black, fontWeight: 'bold' },
  inputTextMaskContainer: { borderColor: Colors.inputBoxBorder, borderWidth: 1, borderBottomWidth: 0, borderRadius: 6, paddingLeft: 10 },
  w10: { width: '10%' },
  w20: { width: '20%' },
  w15: { width: '15%' },
  w25: { width: '25%' },
  w30: { width: '30%' },
  w33: { width: '33.33%' },
  w40: { width: '40%' },
  w45: { width: '45%' },
  w50: { width: '50%' },
  w60: { width: '60%' },
  w70: { width: '70%' },
  w75: { width: '75%' },
  w80: { width: '80%' },
  w85: { width: '85%' },
  w90: { width: '90%' },
  w95: { width: '95%' },
  w97: { width: '97%' },
  w98: { width: '98%' },
  w99: { width: '99%' },
  w100: { width: '100%' },
  w500: { width: 500 },
  mt8: { marginTop: '8%' },

  //Home View
  cardViewCont: { margin: 10, zIndex: 9999, padding: 10, borderRadius: 10, backgroundColor: Colors.cardBG, flex: 1, justifyContent: 'center', alignItems: 'center' },
  cardViewCont1: { width: 40, margin: 10, height: 40 },
  cardViewCont2: { padding: 10, paddingLeft: 0, flexDirection: 'row', borderBottomWidth: 1, borderColor: Colors.globalBorder, flex: 1 },
  cardViewCont3: { marginHorizontal: 20, flexDirection: 'row', paddingVertical: 10, marginBottom: Config.height / 45, marginTop: Config.height / 20 },
  cardViewCont4: { width: '80%', justifyContent: 'space-around' },
  cardViewCont5: { fontSize: normalizeSize(20), fontWeight: '500' },
  cardViewCont6: { width: normalizeSize(52), height: normalizeSize(52), borderRadius: normalizeSize(104) },
  cardViewCont7: { borderTopLeftRadius: normalizeSize(20), paddingVertical: 40, zIndex: 1, borderTopEndRadius: normalizeSize(20), padding: 10, backgroundColor: Colors.White },
  cardViewCont8: { marginHorizontal: 10, paddingBottom: 10, backgroundColor: Colors.White, zIndex: 1 },
  cardViewCont9: { flexDirection: 'row', marginTop: 20, marginHorizontal: 10, justifyContent: 'space-between' },
  cardViewCont10: { fontSize: normalizeSize(15), alignSelf: 'center', color: Colors.themeGreen, fontWeight: '700' },
  cardViewCont11: { borderColor: Colors.globalBorder, alignSelf: 'flex-end', paddingVertical: normalizeSize(3), borderBottomWidth: 2 },
  cardViewCont12: { fontSize: normalizeSize(13), color: Colors.globalBorder, fontWeight: '700' },
  cardViewCont13: { fontSize: normalizeSize(13), color: Colors.Red, fontWeight: '700' },
  cardViewCont14: {borderColor: Colors.Red, alignSelf: 'flex-end',position:'absolute', paddingVertical: normalizeSize(3), borderBottomWidth: 2,right:normalizeSize(10)},


})
// const GlobalStyles = { ...baseStyle, ...brandingStyle };
// const GlobalStyles = StyleSheet.create(baseStyle);
export default GlobalStyles;

const styles = {
  mini: {
    fontSize: normalizeSize(13),
  },
  small: {
    fontSize: normalizeSize(16),
  },
  medium: {
    fontSize: normalizeSize(17),
  },
  large: {
    fontSize: normalizeSize(20),
  },
  xlarge: {
    fontSize: normalizeSize(24),
  },
};
// console.log(styles)
