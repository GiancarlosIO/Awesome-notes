import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'enzyme';
import * as Constants from '../../app/constants/';
import * as Actions from '../../app/actions/';
import configureMockStore from 'redux-mock-store';
import ReduxThunk from 'redux-thunk';
import nock from 'nock';
import * as AuthAPI from '../../app/utils/apis/auth-api';

describe('actions', () => {
  describe('sync', () => {
    it('should create an action of type auth user', () => {
      const expectedAction = {
        type: Constants.AUTH_USER
      };
      expect(Actions.authUser()).to.eql(expectedAction);
    });
    it('should create an action of type auth error', () => {
      const expectedAction = {
        type: Constants.AUTH_ERROR,
        payload: 'User not found'
      };
      expect(Actions.authError('User not found')).to.eql(expectedAction);
    });
    it('should create an action of type unauth user', () => {
      const expectedAction = {
        type: Constants.UNAUTH_USER
      };
      expect(Actions.unauthUser()).to.eql(expectedAction);
    });
    it('should create a action to set user data', () => {
      const expectedAction = {
        type: Constants.SET_USER_DATA,
        payload: {id: 1, email: 'test@gmail.com'}
      };
      expect(Actions.setUserData({id: 1, email: 'test@gmail.com'})).to.eql(expectedAction);
    });
  });
  describe('async', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it('create AUTH_USER and SET_USER_DATA when signup user is done and set user-data in localStorage', () => {
      nock('http://localhost:3000')
        .post('/api/v1/auth',
          {
            email: 'test1@gmail.com',
            password: '123123123',
            password_confirmation: '123123123'
          })
        .reply(200, {
          "status": "success",
          "data": {
            "id": 1,
            "email": "test1@gmail.com",
            "provider": "email",
            "uid": "test1@gmail.com"
          }
        });
      const expectedActions = [
        { type: Constants.AUTH_USER },
        { type: Constants.SET_USER_DATA, payload: {
          "id": 1,
          "email": "test1@gmail.com",
          "provider": "email",
          "uid": "test1@gmail.com"
        }}
      ];
      const middlewares = [ ReduxThunk.withExtraArgument(AuthAPI) ];
      const mockStore = configureMockStore(middlewares);
      const store = mockStore({auth: { authenticated: false, user: null, errors: [] }});
      return store.dispatch(Actions.signupUser({
        email: 'test1@gmail.com',
        password: '123123123',
        password_confirmation: '123123123'
      })).then(() => {
        expect(store.getActions()).to.eql(expectedActions);
        const userData = JSON.parse(localStorage.getItem('user'));
        expect(userData.id).to.equal(1);
        expect(userData.email).to.equal('test1@gmail.com');
      });
    });
    it('create an action AUTH_ERROR when the signup fail', () => {
      nock('http://localhost:3000')
        .post('/api/v1/auth',
          {
            email: 'test2@gmail.com',
            password: '123123123',
            password_confirmation: '123123123abc'
          })
        .reply(401, {
          status: 'error',
          errors: {
            full_messages: ["Password confirmation doesn't match Password"]
          }
        });
      const middlewares = [ ReduxThunk.withExtraArgument(AuthAPI) ];
      const mockstore = configureMockStore(middlewares);
      const store = mockstore({auth: { authenticated: false, user: null, erros: [] }});
      const expectedActions = [
        {
          type: Constants.AUTH_ERROR,
          payload: ["Password confirmation doesn't match Password"]
        }
      ];
      return store.dispatch(Actions.signupUser({
          email: 'test2@gmail.com',
          password: '123123123',
          password_confirmation: '123123123abc'
        }))
        .catch(() => {
          expect(store.getActions()).to.eql(expectedActions);
        });
    });
    it('create an action of type AUTH_USER and SET_DATA_USER when signin user is done', () => {
      nock('http://localhost:3000')
        .post('/api/v1/auth/sign_in', {
          email: 'test1@gmail.com',
          password: '123123123'
        }).reply(200, {
          "status": "success",
          "data": {
            id: 1,
            email: 'test1@gmail.com',
            provider: 'email',
            uid: 'test1@gmail.com'
          }
        });
      const middlewares = [ ReduxThunk.withExtraArgument(AuthAPI) ];
      const mockstore = configureMockStore(middlewares);
      const store = mockstore({ auth: { authenticated: false, user: null, errors: [] } });
      const expectedActions = [
        { type: Constants.AUTH_USER },
        {
          type: Constants.SET_USER_DATA,
          payload: {
            id: 1,
            email: 'test1@gmail.com',
            provider: 'email',
            uid: 'test1@gmail.com'
          }
        }
      ];
      return store.dispatch(Actions.signinUser({email: 'test1@gmail.com', password: '123123123'}))
        .then(() => {
          const userData = JSON.parse(localStorage.getItem('user'));
          expect(store.getActions()).to.eql(expectedActions);
          expect(userData.id).to.equal(1);
          expect(userData.email).to.equal('test1@gmail.com');
        });
    });
    it('create an action type AUTH_ERROR when signin fail', () => {
      nock('http://localhost:3000')
        .post('/api/v1/auth/sign_in', {
          email: 'test1@gmail.com',
          password: '123123123'
        }).reply(401, {
            errors: ["Invalid login credentials. Please try again."]
        });
      const middlewares = [ ReduxThunk.withExtraArgument(AuthAPI) ];
      const mockstore = configureMockStore(middlewares);
      const store = mockstore({ auth: { authenticated: false, user: null, errors: [] } });
      const expectedActions = [
        {
          type: Constants.AUTH_ERROR,
          payload: ["Invalid login credentials. Please try again."]
        }
      ];
      return store.dispatch(Actions.signinUser({email: 'test1@gmail.com', password: '123123123'}))
        .catch(() => {
          expect(store.getActions()).to.eql(expectedActions);
        })
    });
    it('create an action of type UNAUTH_USER and clean the localStorage to signout', () => {
      nock('http://localhost:3000')
      .delete('/api/v1/auth/sign_out')
      .reply(200, { status: "success" });
      const middlewares = [ ReduxThunk.withExtraArgument(AuthAPI) ];
      const mockstore = configureMockStore(middlewares);
      const store = mockstore({ auth: { authenticated: false, user: null, errors: [] } });
      const expectedActions = [
        {
          type: Constants.UNAUTH_USER
        }
      ];
      return store.dispatch(Actions.signoutUser()).then(() => {
        expect(store.getActions()).to.eql(expectedActions);
      });
    })
  })
})