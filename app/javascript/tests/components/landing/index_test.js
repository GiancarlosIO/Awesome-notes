import React from 'react';
import { expect } from '../../test_helper';
import { shallow } from 'enzyme';
import Landing from '../../../app/landing/';

describe('sample test', () => {
  it('container has the title', () => {
    const app = shallow(<Landing />);
    expect(app.find('LANDING PAGE')).to.exist;
  })
})