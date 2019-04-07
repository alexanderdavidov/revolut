import * as actionTypes from './actionTypes';
import axios from 'axios';
import { saveResult } from '../utility';

export const getInitialRates = () => {
  return dispatch => {
    axios
      .all([
        axios.get(
          'https://api.exchangeratesapi.io/latest?base=USD&symbols=EUR,GBP'
        ),
        axios.get(
          'https://api.exchangeratesapi.io/latest?base=EUR&symbols=USD,GBP'
        ),
        axios.get(
          'https://api.exchangeratesapi.io/latest?base=GBP&symbols=USD,EUR'
        )
      ])
      .then(
        axios.spread((USDRes, EURRes, GBPResp) => {
          const data = {
            usd: {
              gbp: USDRes.data.rates.GBP,
              eur: USDRes.data.rates.EUR,
              usd: 1
            },
            eur: {
              gbp: EURRes.data.rates.GBP,
              usd: EURRes.data.rates.USD,
              eur: 1
            },
            gbp: {
              usd: GBPResp.data.rates.USD,
              eur: GBPResp.data.rates.EUR,
              gbp: 1
            }
          };
          dispatch(saveResult(data, actionTypes.GETINITIALRATES));
        })
      )
      .catch(function(error) {
        console.log(error);
      });
  };
};

export const updateRates = () => {
  return dispatch => {
    setInterval(() => {
      axios
        .all([
          axios.get(
            'https://api.exchangeratesapi.io/latest?base=USD&symbols=EUR,GBP'
          ),
          axios.get(
            'https://api.exchangeratesapi.io/latest?base=EUR&symbols=USD,GBP'
          ),
          axios.get(
            'https://api.exchangeratesapi.io/latest?base=GBP&symbols=USD,EUR'
          )
        ])
        .then(
          axios.spread((USDRes, EURRes, GBPResp) => {
            const data = {
              usd: {
                gbp: USDRes.data.rates.GBP,
                eur: USDRes.data.rates.EUR,
                usd: 1
              },
              eur: {
                gbp: EURRes.data.rates.GBP,
                usd: EURRes.data.rates.USD,
                eur: 1
              },
              gbp: {
                usd: GBPResp.data.rates.USD,
                eur: GBPResp.data.rates.EUR,
                gbp: 1
              }
            };
            dispatch(saveResult(data, actionTypes.UPDATERATES));
          })
        )
        .catch(function(error) {
          console.log(error);
        });
    }, 10000);
  };
};

export const updateBalance = updateBalanceData => {
  if (
    updateBalanceData[1].balance === '' ||
    updateBalanceData[0] < parseFloat(updateBalanceData[1].balance) ||
    updateBalanceData[1].currency === updateBalanceData[2].currency
  ) {
    const data = {};
    data[updateBalanceData[1].currency.toLowerCase()] = {
      currency: updateBalanceData[1].currency,
      sign: updateBalanceData[1].sign,
      balance: updateBalanceData[0]
    };
    data[updateBalanceData[2].currency.toLowerCase()] = {
      currency: updateBalanceData[2].currency,
      sign: updateBalanceData[2].sign,
      balance: updateBalanceData[3]
    };
    return saveResult(data, actionTypes.EXCHANGE);
  } else {
    const data = {};
    data[updateBalanceData[1].currency.toLowerCase()] = {
      currency: updateBalanceData[1].currency,
      sign: updateBalanceData[1].sign,
      balance: (
        parseFloat(updateBalanceData[0]) -
        parseFloat(updateBalanceData[1].balance)
      ).toFixed(2)
    };
    data[updateBalanceData[2].currency.toLowerCase()] = {
      currency: updateBalanceData[2].currency,
      sign: updateBalanceData[2].sign,
      balance: (
        parseFloat(updateBalanceData[3]) +
        parseFloat(updateBalanceData[2].balance)
      ).toFixed(2)
    };
    return saveResult(data, actionTypes.EXCHANGE);
  }
};
