import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount } from 'enzyme';
import Landing from '../../../app/components/landing/';
import Header from '../../../app/components/navigation/header';
import HomeSection from '../../../app/components/landing/home-section';
import BenefitsSection from '../../../app/components/landing/benefits-section';
import Benefit from '../../../app/components/landing/benefit';

function debugComponent(wrapper) {
  let html = wrapper.html();
  console.log('html', html)
  return html;
}

chai.use(chaiEnzyme(debugComponent));

describe('Landing', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Landing />);
  })
  it('contain the header', () => {
    expect(wrapper).to.contain(<Header />);
  });
  it('contain the HomeSection', () => {
    expect(wrapper).to.contain(<HomeSection />);
  });
  it('contain the benefits section', () => {
    expect(wrapper).to.contain(<BenefitsSection />);
  });
})