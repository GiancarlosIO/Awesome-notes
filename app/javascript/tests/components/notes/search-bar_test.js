import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { SearchBar } from '../../../app/components/notes/search-bar';

function setup(searchText=null) {
  const props = {
    searchText,
    dispatch: sinon.spy()
  };
  const enzymeWrapper = mount(<SearchBar {...props} />);
  return {
    enzymeWrapper,
    props
  };
};

describe('SearchBar component', () => {
  it('render self', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('input')).to.have.length(1);
  });
  it('call dispatch when change the input', () => {
    const { props, enzymeWrapper } = setup();
    enzymeWrapper.simulate('change', 'new text');
    expect(props.dispatch.callCount).to.eql(1);
  });
})