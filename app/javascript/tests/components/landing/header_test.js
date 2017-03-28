import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount } from 'enzyme';
import HeaderRadium, { Header } from '../../../app/components/navigation/header';
import { LinkHeader } from '../../../app/components/navigation/link-header';
import { Column } from '../../../app/grid/column';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

function debuComponent(wrapper) {
  let html = wrapper.html();
  return html;
}

chai.use(chaiEnzyme(debuComponent));

describe('Header', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  });
  it('render 1 nav tag', () => {
    expect(wrapper.find('nav')).to.have.length(1);
  });
  it('render 2 Column component', () => {
    expect(wrapper.find('Column').length).to.equal(2);
  });
  it('render 4 LinkHeader components', () => {
    expect(wrapper.find('LinkHeader').length).to.equal(4);
  });
  it('contain a Sign up and Sign In links text', () => {
    expect(wrapper.text()).to.contain('Home');
    expect(wrapper.text()).to.contain('Sign up');
    expect(wrapper.text()).to.contain('Sign in');
  })
})