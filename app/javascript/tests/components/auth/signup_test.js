import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount, render } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import ReduxThunk from 'redux-thunk';
import AuthAPI from '../../../app/utils/apis/auth-api';
import { Field } from 'redux-form';
import { reducer as formReducer } from 'redux-form';
import sinon from 'sinon';
import { createStore, combineReducers } from 'redux';

import SignupConnected, { Signup } from '../../../app/components/authentication/signup';
import RenderField from '../../../app/components/authentication/render_field';

chai.use(chaiEnzyme());

describe('signup component', () => {
  describe('unit-test', () => {
    let subject = null;
    let submitting, touched, error, reset, onSave, onSaveResponse, handleSubmit, errors = [];
    beforeEach(() => {
      submitting = false;
      touched = false;
      error = null;
      reset = sinon.spy();
      onSaveResponse = Promise.resolve();
      handleSubmit = fn => fn;
    });
    const buildSubject = () => {
      onSave = sinon.stub().returns(onSaveResponse);
      const props = {
        onSave,
        submitting: submitting,
        fields: {
          email: {
            value: '',
            touched: false,
            error: error
          },
          password: {
            value: '',
            touched: false,
            error: error
          },
          password_confirmation: {
            value: '',
            touched: false,
            error: error
          }
        },
        handleSubmit,
        reset,
        errors
      };
      return shallow(<Signup {...props}/>);
    }
    it('render a 3 Field component', () => {
      // const middlewares = [ ReduxThunk.withExtraArgument(AuthAPI) ];
      // const mockstore = configureMockStore(middlewares);
      // const store = mockstore({form: 'signupForm'})
      const wrapper = buildSubject();
      expect(wrapper.find('form').find(Field)).to.have.length(3);
    });
    it('show a error in text fields', () => {
      const input = { name: 'email', className: 'form-control'};
      const label = 'email';
      const type = 'email';
      const meta = { touched: true, error: 'email invalid' };
      const wrapper = shallow(<RenderField {...input} label={label} type={type} meta={meta}/>)
      expect(wrapper.find('span')).to.exist;
      expect(wrapper.find('span').html()).to.contain('email invalid');
    });
    it('show a error when submit fail', () => {
      errors = ['password not match'];
      const wrapper = buildSubject();
      expect(wrapper.find('form').find('ul').html()).to.contain('password not match');
    });
  });
  describe('integration test', () => {
      let store, onSave, subject, errors = [];
    beforeEach(() => {
      store = createStore(combineReducers({ form: formReducer, auth: (state) => ({errors: []}) }));
      onSave =sinon.stub().returns(Promise.resolve());
      const props = {
        onSave,
        errors
      };
      subject = mount(
        <MemoryRouter>
          <Provider store={store}>
            <SignupConnected {...props}/>
          </Provider>
        </MemoryRouter>
      );
    });
    it('should show errors when fields are submitting in blank', () => {
      subject.find('form').simulate('submit');
      const htmlForm = subject.find('form').html();
      expect(htmlForm).to.contain('Enter a email');
      expect(htmlForm).to.contain('Enter a password');
      expect(htmlForm).to.contain('Enter a password confirmation');
    });
    it('should show a error when email is invalid', () => {
      const input = subject.find('form').find('input[name="email"]');
      input.simulate('change', {
        target: { value: 'invalid email' }
      });
      subject.find('form').simulate('submit');
      const htmlForm = subject.find('form').html();
      expect(htmlForm).to.contain('Invalid email address');
    });
    it('should show a error when password and password confirmation not match', () => {
      const passwordField = subject.find('form').find('input[name="password"]');
      const passwordConfirmationField = subject.find('form').find('input[name="password_confirmation"]');
      passwordField.simulate('change', {
        target: { value: '123123123' }
      });
      passwordConfirmationField.simulate('change', {
        target: { value: '123123123123' }
      });
      subject.find('form').simulate('submit');
      const htmlForm = subject.find('form').html();
      expect(htmlForm).to.contain('Password confirmation not match with password');
    })
  })
});