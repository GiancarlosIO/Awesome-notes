import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Note } from '../../../app/components/notes/note';

function setup(selected=false) {
  const props = {
    id: 1,
    text: 'text test',
    handleSelectNote: sinon.spy(),
    selected: selected
  };
  const enzymeWrapper = shallow(<Note {...props} />);
  return {
    enzymeWrapper,
    props
  }
}

describe('Note component', () => {
  it('render self', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper).to.have.text('text test');
  });
  it('call handleSelectNote when click in the component', () => {
    const { props, enzymeWrapper } = setup();
    enzymeWrapper.simulate('click');
    expect(props.handleSelectNote.callCount).to.eql(1);
  });
  it('shouldnt has the selected style', () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.simulate('click');
    const props = enzymeWrapper.props().style;;
    expect(props[1].backgroundColor).to.eql(undefined);
  })
  it('has the selected style when selected prop is true', () => {
    const { enzymeWrapper } = setup(true);
    enzymeWrapper.simulate('click');
    const props = enzymeWrapper.props().style;
    console.log(props);
    expect(props[1].backgroundColor).to.eql('#2CC990');
  });
})