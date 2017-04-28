import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Menu } from '../../../app/components/notes/menu';

function setup() {
  const props = {
    dispatch: sinon.spy(),
    email: 'giancarlos@gmail.com',
    noteSelected: { id:1, text: 'test' },
    notesCount: [1]
  };
  const enzymeWrapper = shallow(<Menu {...props} />);
  return {
    props,
    enzymeWrapper
  };
};

describe('Menu note component', () => {
  it('render self and subcomponents', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('.menu-note')).to.have.length(1);
    expect(enzymeWrapper.find('Icon')).to.have.length(2);
  });
  it('render the info email user', () => {
    const { props, enzymeWrapper } = setup();
    expect(enzymeWrapper.find('.menu-note-info')).to.have.text('giancarlos@gmail.com');
  });
  it('change state when click en info icon', () => {
    const { enzymeWrapper } = setup();
    const IconInfo = enzymeWrapper.find('Icon').first();
    IconInfo.props().handleClick();
    expect(enzymeWrapper.state().openModal).to.eql(true);
  });
  it('call dispatch when click in delete icon', () => {
    const { props, enzymeWrapper } = setup();
    const Icon = enzymeWrapper.find('Icon').last();
    Icon.props().handleClick();
    expect(props.dispatch.callCount).to.eql(1);
  });
});