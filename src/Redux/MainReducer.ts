import { combineReducers } from 'redux';
import {loginReducer} from './CommonReducer';

export default combineReducers({
    loginStatus: loginReducer,
});