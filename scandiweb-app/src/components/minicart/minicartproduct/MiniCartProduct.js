import React, { Component } from 'react'
import { connect } from 'react-redux'
import {incrementQuantity, decrementQuantity} from '../../../models/application/cartSlice'
import Attributes from '../../attributes/Attributes'

class MiniCartProduct extends Component {
    render() {
        const {
            items,
            currencies,
            incrementQuantity,
            decrementQuantity,
        } = this.props
        return (
            <>
                {
                    items.map((item, index) => {
                        return (
                            <div className='cart--product--card' key={index}>
                                <div className='product--card--description'>
                                    <h1 className='card--product--heading'>{item.brand}</h1>
                                    <h1 className='card--product--heading'>{item.name}</h1>
                                    <h1 className='card--product--price'>
                                        {(item.prices[item.prices.findIndex((element) => element.currency.label === currencies[1].label)].amount * item.quantity)}
                                        {item.prices[item.prices.findIndex((element) => element.currency.label === currencies[1].label)].currency.symbol}
                                    </h1>
                                    <Attributes attributes={item.attributes}/>
                                </div>
                                <div className='product--card--actions'>
                                    <div className='card--quantity--actions'>
                                        <button className='cart--quantity--btn' onClick={() => incrementQuantity(item)}>+</button>
                                        <span className='cart--item--quantity'>{item.quantity}</span>
                                        <button className='cart--quantity--btn' onClick={() => decrementQuantity(item)}>-</button>
                                    </div>
                                    <img className='card--item--image' src={item.gallery[0]} alt="product in cart" />
                                </div>
                            </div>
                        )
                    })
                }
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    items: state.cartItems.cartItems,
    currencies: state.currencies.activeCurrency
});
const mapDispatchToProps = { incrementQuantity, decrementQuantity };

export default connect(mapStateToProps, mapDispatchToProps)(MiniCartProduct)



