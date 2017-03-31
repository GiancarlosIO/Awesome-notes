import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER
} from '../constants/';
import {
  setAuthApiHeaderConfig, 
  getAuthApiHeaderConfig
} from '../utils/apis/header-config';

export const authUser = () => ({ type: AUTH_USER });
export const authError = (error) => ({ type: AUTH_ERROR, payload: error });
export const unauthUser = () => ({ type: UNAUTH_USER });

// async actions

export const signupUser = ({ email, password, password_confirmation }) => {
  console.log(email, password, password_confirmation);
  return (dispatch, getState, AuthAPI) => {
    AuthAPI.signup(email, password, password_confirmation).request.then(
      (response) => {
        window.authAPi = AuthAPI;
        console.log('user register completed', response);
        AuthAPI.setItemInLocalStorage(response.headers["access-token"], 'access-token');
        setAuthApiHeaderConfig(response.headers);
        console.log('headers', getAuthApiHeaderConfig());
        dispatch(authUser());
      },
      (error) => { console.log(error) }
    ).catch(
      (error) => {
        console.log('error to register', error.response)
        dispatch(authError(error.response.data.errors.full_messages));
      }
    )
  }
}