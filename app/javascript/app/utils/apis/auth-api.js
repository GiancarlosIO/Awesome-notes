const { env } = require('process')
import axios from 'axios';
import {
  getAuthApiHeaderConfig
} from './header-config';

const BASE_URL= env.NODE_ENV === 'test' ? 'http://localhost:3000/api/v1/auth' : '/api/v1/auth';

// get header values to send in request
//Create a new user
export const signup = (email, password, password_confirmation) => {
  let CancelToken = axios.CancelToken;
  let cancel;
  let request = axios({
    method: 'post',
    headers: getAuthApiHeaderConfig(),
    url: BASE_URL,
    data: { email, password, password_confirmation },
    responseType: 'json',
    cancelToken: new CancelToken( c => cancel = c)
  });
  return { request, cancel }
}

// Signin users, create token and uid
export const signin = (email, password) => {
  let CancelToken = axios.CancelToken;
  let cancel;
  let request = axios({
    method: 'post',
    url: `${BASE_URL}/sign_in`,
    headers: getAuthApiHeaderConfig(),
    data: { email, password },
    responseType: 'json',
    cancelToken: new CancelToken( c => cancel = c )
  });
  return { request, cancel }
}

//Signout users, delete token

export const signout = () => {
  let CancelToken = axios.CancelToken;
  let cancel;
  let request = axios({
    method: 'delete',
    url: `${BASE_URL}/sign_out`,
    headers: getAuthApiHeaderConfig(),
    responseType: 'json'
  });
  return { request, cancel };
}