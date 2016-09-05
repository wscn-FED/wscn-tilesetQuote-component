import React, {Component} from "react";
import classNames from "classnames";
import LineChart from "./LineChart";

export default class MarketItem extends Component {

    constructor(props) {
        super(props);
        this.fieldsMap = {
            price: {
                name: "prod_name",
                lastPrice: "last_px",
                change: "px_change",
                changeRate: "px_change_rate"
            },
            kline: {
                closePx: "close_px"
            }
        }

    }

    componentDidMount() {
        console.log('market-item didmount');
    }

    componentDidUpdate() {
        console.log('item update')
    }

    componentWillReceiveProps() {
        // console.log('b');
    }

    getData = (name, type) => {
        const props = this.props;
        const index = props.fields[type].indexOf(this.fieldsMap[type][name]);
        return props.data[type][index];
    };

    justUpORdown = (num) => {
        var bool = false;
        if (+num >= 0) {
            bool = true;
        }
        return bool;
    };

    fixNum = (num, digit, type)=> {
        if (!num) return;
        let _num = num.toFixed(digit);
        if (+num >= 0) {
            _num = '+' + _num;
        } else {
            _num = _num;
        }
        if (type == 'rate') {
            return _num + '%';
        } else {
            return _num
        }

    };

    render() {
        const props = this.props;
        const state = this.state;
        // console.log(this.props.priceData);
        const symbolName = this.getData("name", "price");
        const lastPrice = this.getData("lastPrice", "price");
        const change = this.fixNum(this.getData("change", "price"), 4);
        const changeRate = this.fixNum(this.getData("changeRate", "price"), 2, "rate");
        const klineData = props.data.kline;
        const upORdownBool = this.justUpORdown(change);
        const upORdownClass = classNames({up: upORdownBool}, {'down': !upORdownBool});
        return (
            <div className="market-item-container">
                <div className="market-quotecard-container">
                    <div className="market-quotecard-left">
                        <div className="symbol-name{}">{symbolName}</div>
                        <div className="last-price">{lastPrice}</div>
                    </div>
                    <div className="market-quotecard-right">
                        <div className={"change " + upORdownClass}>{change}</div>
                        <div className={"change-rate " + upORdownClass}> {changeRate}</div>
                    </div>
                </div>

                {(klineData.length)
                    ? <LineChart klineData={klineData}/>
                    : null
                }
            </div>

        );
    }
}