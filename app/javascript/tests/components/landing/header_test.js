import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow, mount } from 'enzyme';
import header, { Header } from '../../../app/components/navigation/header';
import Link from '../../../app/components/navigation/link';