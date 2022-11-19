import React, { Component } from 'react'
import { connect } from 'react-redux'
import { incrementQuantity, decrementQuantity } from '../../models/application/cartSlice'
class CartProduct extends Component {
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
                            <div className='cart--item' key={index}>
                                <div className='cart--item--description'>
                                    <h1 className='product--title'>{item.brand}</h1>
                                    <h1 className='product--subtitle'>{item.name}</h1>
                                    <h1 className='product--price'>
                                        {(item.prices[item.prices.findIndex((element) => element.currency.label === currencies[1].label)].amount * item.quantity)}
                                        {item.prices[item.prices.findIndex((element) => element.currency.label === currencies[1].label)].currency.symbol}
                                    </h1>
                                </div>
                                <div className='cart--item--gallery'>
                                    <div className='cart--quantity--actions'>
                                        <button className='quantity--btn' onClick={() => incrementQuantity(item)}>+</button>
                                        <span className='cart--item--quantity'>{item.quantity}</span>
                                        <button className='quantity--btn' onClick={() => decrementQuantity(item)}>-</button>
                                    </div>
                                    <img className='cart--item--image' src={item.gallery[0]} alt="product in cart" />
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

export default connect(mapStateToProps, mapDispatchToProps)(CartProduct)



