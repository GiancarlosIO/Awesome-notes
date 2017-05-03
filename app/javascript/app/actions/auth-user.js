import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  SET_USER_DATA
} from '../constants/';
import {
  resetAuthApiHeaderConfig,
  setAuthApiHeaderConfig,
  getAuthApiHeaderConfig
} from '../utils/apis/header-config';

export const authUser = () => ({ type: AUTH_USER });
export const authError = (error) => ({ type: AUTH_ERROR, payload: error });
export const unauthUser = () => ({ type: UNAUTH_USER });
export const setUserData = (userData) => ({ type: SET_USER_DATA, payload: userData });

// async actions

// Signup users
export const signupUser = ({ email, password, password_confirmation }) => {
  return (dispatch, getState, { AuthAPI }) => {
    return AuthAPI.signup(email, password, password_confirmation).request.then(
      (response) => {
        console.log('user register completed', response);
        setAuthApiHeaderConfig(response.headers, response.data.data);
        dispatch(setUserData(response.data.data));
        dispatch(authUser());
      }).catch(
      (error) => {
        console.log('error to register', error)
        dispatch(authError(error.response.data.errors.full_messages));
        return Promise.reject(error);
      }
    )
  }
}

// Sign users
export const signinUser = ({email, password}) => {
  return (dispatch, getState, { AuthAPI }) => {
    return AuthAPI.signin(email, password).request.then(
      (response) => {
        //console.log('sign in user', response);
        resetAuthApiHeaderConfig();
        setAuthApiHeaderConfig(response.headers, response.data.data);
        dispatch(authUser());
        dispatch(setUserData(response.data.data));
      }
    ).catch(
      ( error ) => {
        //console.log('error to signin', error.response);
        dispatch(authError(error.response.data.errors));
        return Promise.reject();
      }
    )
  }
}

// Sign out Users
export function signoutUser() {
  return (dispatch, getState, { AuthAPI }) => {
    return AuthAPI.signout().request.then(
      (response) => {
        // signout
        //console.log('signout user', response);
        resetAuthApiHeaderConfig();
        dispatch(unauthUser());
      }
    ).catch(
      (error) => {
        console.log('error to signout', error);
      }
    )
  }
}