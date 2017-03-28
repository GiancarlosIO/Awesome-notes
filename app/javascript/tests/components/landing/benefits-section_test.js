import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { BenefitsSection } from '../../../app/components/landing/benefits-section';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

function debugComponent(wrapper) {
  let html = wrapper.html()
  return html
};

chai.use(chaiEnzyme(debugComponent));

describe('BenefitsSection', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter>
        <BenefitsSection />
      </MemoryRouter>
    );
  });
  it('render 4 benefits component', () => {
    expect(wrapper.find('Benefit')).to.have.length(4);
  });
  it('render 4 Columns component', () => {
    expect(wrapper.find('Column')).to.have.length(4);
  })
})