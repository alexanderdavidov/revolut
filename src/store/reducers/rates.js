import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
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
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GETINITIALRATES:
      return updateObject(state, action.result);
    case actionTypes.UPDATERATES:
      return updateObject(state, action.result);
    default:
      return state;
  }
};

export default reducer;
