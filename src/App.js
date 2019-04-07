import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import PocketInfo from './components/PocketInfo/PocketInfo';
import * as actionCreators from './store/actions/index';

export class UnconnectedApp extends Component {
  state = {
    from: '',
    to: '',
    curPockets: [0, 2]
  };

  getPropsDataInSingleArray = () => {
    return [
      { ...this.props.act.usd, ...this.props.rts.usd },
      { ...this.props.act.eur, ...this.props.rts.eur },
      { ...this.props.act.gbp, ...this.props.rts.gbp }
    ];
  };

  getActualDataArray = data => {
    return [data[this.state.curPockets[0]], data[this.state.curPockets[1]]];
  };

  getRatesForMultiply = actualData => {
    return [
      actualData[0][actualData[1].currency.toLowerCase()],
      actualData[1][actualData[0].currency.toLowerCase()]
    ];
  };

  inputValueManager = e => {
    let { value } = e.target;
    let valueArr = value.split('');
    let dotIndex;
    for (let i = 0; i < valueArr.length; i++) {
      if (valueArr[i] === '.') dotIndex = i;
    }
    if (dotIndex) {
      valueArr = valueArr.slice(0, dotIndex + 3);
      value = valueArr.join('');
    }
    return value;
  };

  pocketInfoHandler = (e, type) => {
    const data = this.getPropsDataInSingleArray();
    const actualData = this.getActualDataArray(data);
    const ratesForMultiply = this.getRatesForMultiply(actualData);

    if (
      type === 'from' &&
      (!isNaN(e.target.value) ||
        (e.target.value[0] === '-' && !isNaN(e.target.value.substr(1))))
    ) {
      let value = this.inputValueManager(e);
      if (value[0] === '-') value = value.substr(1);
      this.setState(prevState => {
        if (value.length < 8) {
          return {
            ...prevState,
            from: value,
            to: value ? (value * ratesForMultiply[0]).toFixed(2) : ''
          };
        }
      });
    }
    if (
      type === 'to' &&
      (!isNaN(e.target.value) ||
        (e.target.value[0] === '+' && !isNaN(e.target.value.substr(1))))
    ) {
      let value = this.inputValueManager(e);
      if (value[0] === '+') value = value.substr(1);
      this.setState(prevState => {
        if (value.length < 8) {
          return {
            ...prevState,
            to: value,
            from: value ? (value * ratesForMultiply[1]).toFixed(2) : ''
          };
        }
      });
    }
  };

  ratesManager = () => {
    const data = this.getPropsDataInSingleArray();
    const actualData = this.getActualDataArray(data);
    return actualData;
  };

  queueManager = (arrow, number) => {
    if (arrow === 'left' && number === 0) {
      return 2;
    }
    if (arrow === 'right' && number === 2) {
      return 0;
    }
    if (arrow === 'left') {
      return number - 1;
    }
    if (arrow === 'right') {
      return number + 1;
    }
  };

  leftRightClickHandler = (e, arrow, type) => {
    this.setState(prevState => {
      if (type === 'from') {
        return {
          ...prevState,
          curPockets: [
            this.queueManager(arrow, prevState.curPockets[0]),
            prevState.curPockets[1]
          ],
          from: '',
          to: ''
        };
      }
      if (type === 'to') {
        return {
          ...prevState,
          curPockets: [
            prevState.curPockets[0],
            this.queueManager(arrow, prevState.curPockets[1])
          ],
          from: '',
          to: ''
        };
      }
    });
  };

  upDownClickHandler = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        curPockets: [prevState.curPockets[1], prevState.curPockets[0]],
        from: '',
        to: ''
      };
    });
  };

  componentDidMount() {
    this.props.onDidMountGetRates();
    this.props.onDidMountUpdateRates();
  }

  render() {
    const data = this.getPropsDataInSingleArray();
    const dataForPockets = this.ratesManager();
    const fromValue = this.state.from ? `-${this.state.from}` : '';
    const toValue = this.state.to ? `+${this.state.to}` : '';
    return (
      <div className="app">
        <div className="app__wrapper app-wrapper">
          <div className="app-wrapper__buttonwrapper app-wrapper-buttonwrapper">
            <div
              onClick={() =>
                this.props.onExchange([
                  data[this.state.curPockets[0]].balance,
                  {
                    balance: this.state.from,
                    currency: data[this.state.curPockets[0]].currency,
                    sign: data[this.state.curPockets[0]].sign
                  },
                  {
                    balance: this.state.to,
                    currency: data[this.state.curPockets[1]].currency,
                    sign: data[this.state.curPockets[1]].sign
                  },
                  data[this.state.curPockets[1]].balance
                ])
              }
              className="app-wrapper-buttonwrapper__button"
            >
              Exchange
            </div>
          </div>
          <div className="app-wrapper__pocketinfowrapper app-wrapper-pocketinfowrapper">
            <PocketInfo
              data={dataForPockets}
              leftRightArrowClick={this.leftRightClickHandler}
              value={fromValue}
              onChangeHandler={this.pocketInfoHandler}
              type="from"
            />
            <div
              onClick={this.upDownClickHandler}
              className="app-wrapper-pocketinfowrapper__changepockets app-wrapper-pocketinfowrapper-changepockets"
            >
              <i className="app-wrapper-pocketinfowrapper-changepockets__up" />
              <i className="app-wrapper-pocketinfowrapper-changepockets__down" />
            </div>
            <PocketInfo
              data={dataForPockets}
              leftRightArrowClick={this.leftRightClickHandler}
              value={toValue}
              onChangeHandler={this.pocketInfoHandler}
              type="to"
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    act: state.act,
    rts: state.rts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDidMountGetRates: () => dispatch(actionCreators.getInitialRates()),
    onDidMountUpdateRates: () => dispatch(actionCreators.updateRates()),
    onExchange: updateBalanceData =>
      dispatch(actionCreators.updateBalance(updateBalanceData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedApp);
