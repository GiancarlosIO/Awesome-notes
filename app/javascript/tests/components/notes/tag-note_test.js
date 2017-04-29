import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { TagNote } from '../../../app/components/notes/tag-note';

function setup() {
  const props = {
    dispatch: sinon.spy(),
    tags: ['tag1', 'tag2'],
    noteSelected: {id:1, text: 'test text', tags: ['tag1']}
  };
  const enzymeWrapper = mount(<TagNote {...props} />);
  return {
    enzymeWrapper,
    props
  };
};

describe('TagNote component', () => {
  it('render self', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('Container')).to.have.length(1);
    expect(enzymeWrapper.find('Column')).to.have.length(2);
    expect(enzymeWrapper.find('select')).to.have.length(1);
    expect(enzymeWrapper.find('TagsInput')).to.have.length(1);
  });
  it('render 3 options inside the select', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('select').find('option')).to.have.length(3);
  });
  it('call dispatch when select change', () => {
    const { props, enzymeWrapper } = setup();
    const select = enzymeWrapper.find('select');
    select.simulate('change', {
      target:
        {
          value: 'tag1',
          options: {
            length: 2,
            selectedIndex: 1,
            1: {
              value: 'tag1'
            },
            2: {
              value: 'tag2'
            }
          }
        }
      });
    expect(props.dispatch.callCount).to.eql(1);
  });
  // it('call dispatch when the input text change', () => {
  //   const { props, enzymeWrapper } = setup();
  //   const input = enzymeWrapper.find('TagsInput');
  //   input.simulate('change');
  //   expect(props.dispatch.callCount).to.eql(1);
  // })
});