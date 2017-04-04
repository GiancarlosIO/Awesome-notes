import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { reducer as formReducer } from 'redux-form';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import sinon from 'sinon';

import SigninConnected from '../../../app/components/authentication/signin';

describe('signin component', () => {
  let errors = [];
  let renderComponent = () => {
    const store = createStore(combineReducers({form: formReducer, auth: (state) => ({errors: errors}) }));
    const onSave = sinon.stub().returns(Promise.resolve());
    const props = {
      onSave
    };
    const wrapper = mount(
      <MemoryRouter>
        <Provider store={store}>
          <SigninConnected {...props}/>
        </Provider>
      </MemoryRouter>
    );
    return wrapper;
  };
  it('should render email and password fields', () => {
    const wrapper = renderComponent();
    expect(wrapper.find('input[name="email"]')).to.have.length(1);
    expect(wrapper.find('input[name="password"]')).to.have.length(1);
  });
  it('should show a text errors when email and password are blank', () => {
    const wrapper = renderComponent();
    wrapper.find('form').simulate('submit');
    const wrapperHtml = wrapper.find('form').html();
    expect(wrapperHtml).to.contain('Enter a email');
    expect(wrapperHtml).to.contain('Enter a password');
  });
  it('should show a error with invalid email', () => {
    const wrapper = renderComponent();
    const inputEmail = wrapper.find('form').find('input[name="email"]');
    inputEmail.simulate('change', {
      target: { value: 'invalid email' }
    });
    wrapper.find('form').simulate('submit');
    expect(wrapper.find('form').html()).to.contain('Invalid email');
  });
  it('should render a error form auth-state', () => {
    errors = ['Invalid credentials'];
    const wrapper = renderComponent();
    const wrapperHtml = wrapper.find('form').html();
    expect(wrapperHtml).to.contain('Invalid credentials');
  });
});