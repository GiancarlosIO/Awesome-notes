import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { mount, shallow, render } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import ButtonRadium, { Button } from '../../../../app/ui/buttons/button';

function debugComponent(wrapper) {
  let html = wrapper.html();
  return html;
}
chai.use(chaiEnzyme(debugComponent));

describe('Button', () => {
  it('render a button disabled', () => {
    const wrapper = render(
      <ButtonRadium disabled={true} type="button" bg="default">
        Sample button
      </ButtonRadium>
    );
    expect(wrapper.find('button')).to.have.attr('disabled');
  });
  it('render a button with background primary', () => {
    const wrapper = render(
      <ButtonRadium bg="primary" type="button">
        Button primary
      </ButtonRadium>
    );
    expect(wrapper).to.have.style('background-color', '#3498DB');
  });
  it('render a button with background secondary', () => {
    const wrapper = render(
      <ButtonRadium type="button" bg="secondary">
        Button secondary
      </ButtonRadium>
    );
    expect(wrapper).to.have.style('background-color', '#1ABC9C');
  });
  it('render a button with background tertiary', () => {
    const wrapper = render(
      <ButtonRadium type="button" bg="tertiary">
        Button tertiary
      </ButtonRadium>
    );
    expect(wrapper).to.have.style('background-color', '#F1C40F');
  });
  it('render a button with background danger', () => {
    const wrapper = render(
      <ButtonRadium type="button" bg="danger">
        Button danger
      </ButtonRadium>
    );
    expect(wrapper).to.have.style('background-color', '#E74C3C');
  });
  it('render a button with background default', () => {
    const wrapper = render(
      <ButtonRadium type="button" bg="default">
        Default button
      </ButtonRadium>
    );
    expect(wrapper).to.have.style('background-color', '#D1D5D8')
  })
});