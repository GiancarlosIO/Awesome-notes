import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER
} from '../constants/';

export const authUser = () => ({ type: AUTH_USER });
export const authError = () => ({ type: AUTH_ERROR, payload: error });
export const unauthUser = () => ({ type: UNAUTH_USER });

// async actions

export const signupUser = ({ email, password, password_confirmation }) => {
  console.log(email, password, password_confirmation);
  return (dispatch, getState, AuthAPI) => {
    AuthAPI.signup(email, password, password_confirmation).request.then(
      (response) => {
        console.log('signin', response);
      }
    ).catch(
      (error) => {
        console.log('error to signup', error.response);
      }
    )
  }
}