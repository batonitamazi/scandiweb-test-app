import React, { Component } from 'react'
import { connect } from 'react-redux'

class ProductPrice extends Component {

    render() {
        const {
            currencies,
            prices,
        } = this.props
        console.log(this.props)
        return (
            <>
                {prices ?
                  prices[prices.findIndex((element) => element.currency.label === currencies[1]?.label)].amount
                : null}
                {prices ?
                  prices[prices.findIndex((element) => element.currency.label === currencies[1]?.label)].currency.symbol
                : null}
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    currencies: state.currencies.activeCurrency,
})

export default connect(mapStateToProps)(ProductPrice)