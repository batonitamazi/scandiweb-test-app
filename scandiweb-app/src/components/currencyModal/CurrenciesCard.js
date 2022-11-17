import React, { Component } from 'react'
import './currenciescard.css'
import { connect } from 'react-redux'
import { activeCurrency } from '../../models/application/currencySlice'

class CurrenciesCard extends Component {


    render() {
        return (
                <div className={this.props.show ? 'currencies--card' : 'currencies--card--hide'}>
                    {this.props.currencies[0] && this.props.currencies[0].map((item) => {
                        return (
                            <div
                                className={item.isActive ? 'currency--picker--active' : 'currency--picker'}
                                key={item.label}
                                onClick={() => this.props.activeCurrency(item)}
                            >
                                <h6>{item.symbol}</h6>
                                <h6>{item.label}</h6>
                            </div>
                        )
                    })}
                </div>
        )
    }
}
const mapStateToProps = (state) => ({
    currencies: state.currencies.currencies,
    backgroundBlur: state.backgroundBlur.backgroundBlur

})
const mapDispatchToProps = { activeCurrency };
export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesCard)