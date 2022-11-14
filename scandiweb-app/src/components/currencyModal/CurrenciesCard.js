import React, { Component } from 'react'
import './currenciescard.css'

class CurrenciesCard extends Component {

    
    render() {
        return (
            <div className={this.props.show ? 'currencies--card' : 'currencies--card--hide'}>
                {this.props.currencies?.map((item) => {
                    return (
                        <div className='currency--picker' key={item.label}>
                            <h6>{item.symbol}</h6>
                            <h6>{item.label}</h6>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default CurrenciesCard