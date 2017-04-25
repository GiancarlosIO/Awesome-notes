import { expect } from 'chai';
import * as Constants from '../../app/constants/';
import AuthReducer from '../../app/reducers/auth_reducer';

describe('auth reducers', () => {
  const initialState = {
    authenticated: false,
    errors: [],
    user: null
  }
  it('should return the initial state', () => {
    expect(AuthReducer(undefined, {})).to.eql(initialState);
  });
  it('should handle AUTH_USER', () => {
    expect(AuthReducer(initialState, { type: Constants.AUTH_USER }))
      .to.eql({ authenticated: true, errors: [], user:null });
  });
  it('should handle AUTH_ERROR', () => {
    expect(AuthReducer(initialState, {
      type: Constants.AUTH_ERROR,
      payload: ['error test']
    })).to.eql({ authenticated: false, errors: ['error test'], user: null });
  });
  it('should handle UNAUTH_USER', () => {
    expect(AuthReducer(initialState, {
      type: Constants.UNAUTH_USER
    })).to.eql({
      authenticated: false,
      errors: [],
      user: null
    });
  });
  it('should handle SET_USER_DATA', () => {
    expect(AuthReducer(initialState, {
      type: Constants.SET_USER_DATA,
      payload: {
        id: 1,
        email: 'test@gmail.com'
      }
    })).to.eql({
      authenticated: false,
      errors: [],
      user: {
        id: 1,
        email: 'test@gmail.com'
      }
    });
  });
})