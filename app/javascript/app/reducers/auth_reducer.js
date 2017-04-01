import {
   AUTH_USER,
   UNAUTH_USER,
   AUTH_ERROR,
   SET_USER_DATA
} from '../constants/';

const initialState = {
  authenticated: false,
  errors: [],
  user: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: true,
        errors: []
      };
    case AUTH_ERROR:
      return { ...state, errors: action.payload };
    case UNAUTH_USER:
      return { ...state, errors: [], authenticated: false };
    case SET_USER_DATA:
      console.log('set_user_data', action.payload)
      return { ...state, user: action.payload, errors: [] };
    default:
      return state;
  }
}