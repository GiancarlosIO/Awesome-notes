import React from 'react';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import AddNoteConnected, { AddNote } from '../../../app/components/notes/add-note';

function setup(){
  const props = {
    dispatch: sinon.spy()
  };
  const enzymeWrapper = mount(<AddNote {...props} />);
  return {
    props,
    enzymeWrapper
  }
}
describe('Add note component', () => {
  it('should render self and subcomponent', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('div#add-note')).to.has.length(1);
    const IconProps = enzymeWrapper.find('Icon').props();
    expect(IconProps.type).to.eql('plus');
    expect(IconProps.title).to.eql('Add a new note');
    expect(IconProps.handleClick).to.exist;
  });
  it('should call dispatch when click on icon', () => {
    const { enzymeWrapper, props } = setup();
    const Icon = enzymeWrapper.find('Icon');
    Icon.simulate('click');
    expect(props.dispatch.callCount).to.eql(1);
  });
});