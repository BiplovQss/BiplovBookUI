import { CheckNet } from '../../../Utils/CommonFun'
//for host & Apis url
import Config from '../../../Utils/Config';
//axios is a library for react native for API calling
import axios from 'axios';


export default class Api {
  private _name: any;
  constructor(name: any) {
    this._name = name;
  }
}//end of class



//Auth Apis
export const callgetUserDataFromFBApi = async (token: any) => {
  let Conn = await CheckNet();
  if (!Conn) { throw 'No internet connection.' } else {
    var authOptions = {
      method: 'GET',
      url: Config.FBURL + token,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    console.log('authOptions callgetUserDataFromFBApi :-  ', authOptions)
    //@ts-ignore
    return axios(authOptions).then(res => {
      console.log("response", res);
      return res.data;
    })
      .catch((error) => {
        console.log('ERROR GETTING DATA FROM FACEBOOK', error)
        //throw error 
        handleErrors(error);
      });

  }
}










function handleErrors(error: any) {
  console.log('Error====> :- ', error)
  if (!error.response) {
    // network error
    throw 'Please check your network connection.'
  }
  else {
    // http status code
    const code = error.response.status
    // response data
    const response = error.response.data
    console.log('code :- ' + code + ' response :- ', response)
    if (error.response.status === 400) {
      throw 'Please Provide valid credential.'
    }
    else if (error && error.response && error.response.status == 401) {
      throw error.response.data.message ? error.response.data.message : 'Please Provide valid credential.'
    }
    else if (error && error.response && error.response.status == 404) {
      throw error.response.data.message;
    }
    else {
      throw 'Oops server error occurred'
    }
  }
}