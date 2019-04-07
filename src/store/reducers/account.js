import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  usd: { currency: 'USD', balance: 100, sign: '$' },
  eur: { currency: 'EUR', balance: 101, sign: '€' },
  gbp: { currency: 'GBP', balance: 102, sign: '£' }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EXCHANGE:
      return updateObject(state, action.result);
    default:
      return state;
  }
};

export default reducer;
