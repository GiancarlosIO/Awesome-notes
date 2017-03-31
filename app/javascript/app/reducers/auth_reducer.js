import {
   AUTH_USER,
   UNAUTH_USER,
   AUTH_ERROR
} from '../constants/';

const initialState = {
  authenticated: false,
  errors: [],
  user: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true, errors: [] };
    case AUTH_ERROR:
      return { ...state, errors: action.payload };
    case UNAUTH_USER:
      return { ...state, errors: [], authenticated: false };
    default:
      return state;
  }
}