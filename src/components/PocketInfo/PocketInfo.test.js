import React from 'react';
import PocketInfo from './PocketInfo';
import { findByClassAttr, checkProps } from '../../testUtils';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme/build/index';

const setup = (initialState = {}) => {
  const wrapper = shallow(<PocketInfo {...initialState} />);
  return wrapper;
};

const defaultProps = {
  data: [],
  leftRightArrowClick: () => {},
  value: '',
  onChangeHandler: () => {},
  type: ''
};

test('does not throw warning with expected props', () => {
  checkProps(PocketInfo, defaultProps);
});

test('renders without error', () => {
  const wrapper = setup({ defaultProps });
  const component = findByClassAttr(wrapper, 'pocketinfo');
  expect(component.length).toBe(1);
});
