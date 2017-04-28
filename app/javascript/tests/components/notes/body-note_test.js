import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { BodyNote } from '../../../app/components/notes/body-note';

function setup() {
  const props = {
    dispatch: sinon.spy(),
    noteSelected: { id:1, text: 'text test' }
  };
  const enzymeWrapper = mount(<BodyNote {...props} />);
  return {
    props,
    enzymeWrapper
  };
};

function timeoutHelper(ms) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

describe('BodyNote Component', () => {
  it('should render a textarea', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('textarea')).to.has.length(1);
  });
  it('shouldnt call dispatch immediately when textarea change', () => {
    const { props, enzymeWrapper } = setup();
    const textarea = enzymeWrapper.find('textarea');
    expect(props.dispatch.callCount).to.eql(0);
    textarea.simulate('change', 'text');
    expect(props.dispatch.callCount).to.eql(0);
  });
  it('should call dispatch after delay of 400', () => {
    async function sleep() {
      const { props, enzymeWrapper } = setup();
      const textarea = enzymeWrapper.find('textarea');
      textarea.simulate('change', 'text');
      const helper = () => {setTimeout( function(){console.log('running')}, 1000 )}
      await timeoutHelper(400);
      expect(props.dispatch.callCount).to.eql(1);
    };
    sleep();
  });
})