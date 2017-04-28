import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { ListNote } from '../../../app/components/notes/list-note';

function setup() {
  const props = {
    dispatch: sinon.spy(),
    notes: {1: {id: 1, text: 'text1'}, 2: {id: 2, text:'text2'}},
    noteSelected: {id:1, text: 'text1'},
    searchText: null
  };
  const enzymeWrapper = mount(<ListNote {...props} />);
  return {
    enzymeWrapper,
    props
  };
};

describe('NoteList component', () => {
  it('render self and subcomponent', () => {
    const { props, enzymeWrapper } = setup();
    const columnsNote = enzymeWrapper.find('Column');
    expect(columnsNote).to.have.length(2);
  });
  it('call dispatch when component in mount', () => {
    const { props, enzymeWrapper } = setup();
    expect(props.dispatch.callCount).to.eql(1);
  });
  it('call dispatch when click en note component', () => {
    const { props, enzymeWrapper } = setup();
    const note = enzymeWrapper.find('Note').first();
    note.props().handleSelectNote();
    expect(props.dispatch.callCount).to.eql(2);
  });
});
