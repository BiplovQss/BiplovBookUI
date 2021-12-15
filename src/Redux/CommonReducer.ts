import { combineReducers } from 'redux';
import Types from './Type';

const INITIAL_STATE = {
    loginData: {},

};
export const loginReducer = (state = INITIAL_STATE, action:any) => {

    switch (action.type) {
        case Types.LOGIN_STATUS:
            return {
                ...state,
                loginData: action.data,
            };        
        case "persist/REHYDRATE":
            const loginDetail = action.payload ? action.payload.loginStatus.loginData : {};
            return {
                ...state,
                loginData: loginDetail
            };
            case Types.LOG_OUT:
            return {
                ...INITIAL_STATE,

            };
        default:
            return state;
    }
}