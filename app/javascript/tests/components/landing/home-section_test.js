import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount } from 'enzyme';
import { HomeSection } from '../../../app/components/landing/home-section';
import { MemoryRouter } from 'react-router-dom';

function debugComponent(wrapper) {
  let html = wrapper.html();
  return html;
}

chai.use(chaiEnzyme(debugComponent));

describe('HomeSection', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <HomeSection />
      </MemoryRouter>
    );
  });
  it('render 1 column component', () => {
    expect(wrapper.find('Column').length).to.equal(1);
  });
  it('render a h1 and p', () => {
    expect(wrapper.find('h1')).to.exist;
    expect(wrapper.find('p')).to.exist;
  })
})