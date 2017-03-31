import {
   AUTH_USER,
   UNAUTH_USER,
   AUTH_ERROR
} from '../constants/';

const initialState = {
  authenticated: false,
  errors: {},
  user: null
}

export default function(state = initialState, action) {
  return state;
}