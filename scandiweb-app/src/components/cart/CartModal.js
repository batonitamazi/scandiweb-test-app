import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { incrementQuantity, decrementQuantity } from '../../models/application/cartSlice'
import './cartmodal.css'

class CartModal extends Component {
    render() {
        const { show,
                items,
                currencies,
                incrementQuantity, 
                decrementQuantity,
                handleCartModal,
        } = this.props
        return (
            <div className={show ? 'cart--card' : 'cart--card--hide'}>
                <h1 className='cart--card--heading'>My Bag. <span className='cart--span'>
                    {items && items.reduce((acumulator, curValue) => {
                        acumulator += Number(curValue.quantity)
                        return acumulator
                    }, 0)}
                    items</span></h1>
                <div className='card--products'>
                    {items && items.map((item) => {
                        return (
                            <div className='cart--product--card' key={item.id}>
                                <div className='product--card--description'>
                                    <h2 className='card--product--heading'>{item.brand}</h2>
                                    <h2 className='card--product--heading'>{item.name}</h2>
                                    <h3 className='card--product--price'>
                                        {(item.prices[item.prices.findIndex((element) => element.currency.label === currencies[1].label)].amount * item.quantity).toFixed(2)}
                                        {item.prices[item.prices.findIndex((element) => element.currency.label === currencies[1].label)].currency.symbol}
                                    </h3>
                                    {/* {item.attributes.map((item, index) => {
                                        return (
                                            <div className='choice--container' key={index}>
                                                <h4 className='container--subtitle'>{item.name}:</h4>
                                                <div className='choices--container'>
                                                    {item.items.map((miniItem, index) => {
                                                        return (
                                                            <button key={index} className="choice--btn--cart" style={{ backgroundColor: `${miniItem.value}`, border: `1px solid ${miniItem.value}`, color: `${miniItem.value}` }}>
                                                                {miniItem.value.slice(0, 4)}
                                                            </button>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        )
                                    })} */}
                                </div>
                                <div className='product--card--actions'>
                                    <div className='card--quantity--actions'>
                                        <button className='cart--quantity--btn' onClick={() => incrementQuantity(item)}>+</button>
                                        <span className='cart--item--quantity'>{item.quantity}</span>
                                        <button className='cart--quantity--btn' onClick={() => decrementQuantity(item)}>-</button>
                                    </div>
                                    <img className='card--item--image' src={item.gallery[0]} alt="product in cart" />
                                </div>

                            </div>)
                    })}
                </div>
                <div className='total--card'>
                    <h1 className='cart--card--heading'>Total:</h1>
                    <h1 className='cart--card--heading'>
                        {items && items.reduce((acumulator, curValue) => {
                            acumulator += Number(curValue.prices[curValue.prices.findIndex((element) => element.currency.label === currencies[1].label)].amount * curValue.quantity);
                            return acumulator.toFixed(2)
                        }, 0)}
                        {items[0]?.prices[items[0]?.prices.findIndex((element) => element.currency.label === currencies[1].label)].currency.symbol}
                    </h1>
                </div>
                <div className='cart--component--actions'>
                    <Link to='/cart'>
                        <button className='viewcart--btn' onClick={handleCartModal}>
                            View Bag
                        </button>
                    </Link>
                    <Link to='/cart'>
                        <button className='checkout--btn' onClick={handleCartModal}>
                            Check out
                        </button>
                    </Link>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    items: state.cartItems.cartItems,
    currencies: state.currencies.activeCurrency
});
const mapDispatchToProps = { incrementQuantity, decrementQuantity };

export default connect(mapStateToProps, mapDispatchToProps)(CartModal)