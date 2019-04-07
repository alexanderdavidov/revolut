import React from 'react';
import { shallow } from 'enzyme';

import { findByClassAttr } from './testUtils';
import { UnconnectedApp } from './App';

const setup = (initialState = {}) => {
  const wrapper = shallow(<UnconnectedApp {...initialState} />);
  return wrapper;
};

const propsInitialData = [
  {
    usd: { currency: 'USD', balance: 100, sign: '$' },
    eur: { currency: 'EUR', balance: 101, sign: '€' },
    gbp: { currency: 'GBP', balance: 102, sign: '£' }
  },
  {
    usd: {
      gbp: 1,
      eur: 1,
      usd: 1
    },
    gbp: {
      usd: 1,
      eur: 1,
      gbp: 1
    },
    eur: {
      gbp: 1,
      usd: 1,
      eur: 1
    }
  }
];

describe('redux properties', () => {
  test('has access to `act` state', () => {
    const act = propsInitialData[0];
    const rts = propsInitialData[1];
    const wrapper = setup({ act: act, rts: rts });
    const actProp = wrapper.instance().props.act;
    expect(actProp).toBe(act);
  });
  test('has access to `rts` state', () => {
    const act = propsInitialData[0];
    const rts = propsInitialData[1];
    const wrapper = setup({ act: act, rts: rts });
    const rtsProps = wrapper.instance().props.rts;
    expect(rtsProps).toBe(rts);
  });
});

test('renders without error', () => {
  const act = propsInitialData[0];
  const rts = propsInitialData[1];
  const wrapper = setup({ act: act, rts: rts });
  const component = findByClassAttr(wrapper, 'app');
  expect(component.length).toBe(1);
});
