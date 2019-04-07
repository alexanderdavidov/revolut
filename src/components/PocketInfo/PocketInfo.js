import React from 'react';
import PropTypes from 'prop-types';
import './PocketInfo.css';

const pocketInfo = props => {
  let currency, sign, balance, proportion, input;

  if (props.type === 'from') {
    currency = props.data[0].currency;
    sign = props.data[0].sign;
    balance = props.data[0].balance;
    proportion = null;
    input = (
      <input
        onChange={e => props.onChangeHandler(e, props.type)}
        value={props.value}
        className="pocketinfo-cbnpwrapper-np-number__input"
        autoFocus={true}
        type="text"
      />
    );
  }

  if (props.type === 'to') {
    currency = props.data[1].currency;
    sign = props.data[1].sign;
    balance = props.data[1].balance;
    proportion = (
      <div className="pocketinfo-cbnpwrapper-np__proportion">
        1{props.data[1].sign} ={' '}
        {parseFloat(
          props.data[1][props.data[0].currency.toLowerCase()]
        ).toFixed(2)}
        {props.data[0].sign}
      </div>
    );
    input = (
      <input
        onChange={e => props.onChangeHandler(e, props.type)}
        value={props.value}
        className="pocketinfo-cbnpwrapper-np-number__input"
        type="text"
      />
    );
  }

  return (
    <div className="pocketinfo">
      <div
        onClick={e => props.leftRightArrowClick(e, 'left', props.type)}
        className="pocketinfo__arrow pocketinfo-arrow"
      >
        <i className="pocketinfo-arrow__left" />
      </div>
      <div className="pocketinfo__cbnpwrapper pocketinfo-cbnpwrapper">
        <div className="pocketinfo-cbnpwrapper__cb pocketinfo-cbnpwrapper-cb">
          <div className="pocketinfo-cbnpwrapper-cb__currency">{currency}</div>
          <div className="pocketinfo-cbnpwrapper-cb__balance">
            You have {sign} {balance}
          </div>
        </div>
        <div className="pocketinfo-cbnpwrapper__np pocketinfo-cbnpwrapper-np">
          <div className="pocketinfo-cbnpwrapper-np__number pocketinfo-cbnpwrapper-np-number">
            {input}
          </div>
          {proportion}
        </div>
      </div>
      <div
        onClick={e => props.leftRightArrowClick(e, 'right', props.type)}
        className="pocketinfo__arrow"
      >
        <i className="pocketinfo-arrow__right" />
      </div>
    </div>
  );
};

pocketInfo.propTypes = {
  data: PropTypes.array,
  leftRightArrowClick: PropTypes.func,
  value: PropTypes.string || PropTypes.number,
  onChangeHandler: PropTypes.func,
  type: PropTypes.string
};

export default pocketInfo;
