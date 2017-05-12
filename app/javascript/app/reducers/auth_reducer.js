import {
   AUTH_USER,
   UNAUTH_USER,
   AUTH_ERROR,
   SET_USER_DATA,
   SET_AUTH_LOADING
} from '../constants/';

const initialState = {
  authenticated: false,
  errors: [],
  user: null,
  loading: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: true,
        errors: []
      };
    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case AUTH_ERROR:
      return {
        ...state,
        errors: action.payload
      };
    case UNAUTH_USER:
      return { ...state, errors: [], authenticated: false };
    case SET_USER_DATA:
      return { ...state, user: action.payload, errors: [] };
    default:
      return state;
  }
}