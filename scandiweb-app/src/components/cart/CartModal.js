import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { incrementQuantity, decrementQuantity } from '../../models/application/cartSlice'
import './cartmodal.css'

class CartModal extends Component {
    render() {
        return (
            <div className={this.props.show ? 'cart--card' : 'cart--card--hide'}>
                <h1 className='cart--card--heading'>My Bag. <span className='cart--span'>{this.props.items.length} items</span></h1>
                <div className='card--products'>
                    {this.props.items && this.props.items.map((item) => {
                        return (
                            <div className='cart--product--card' key={item.id}>
                                <div className='product--card--description'>
                                    <h2 className='card--product--heading'>{item.brand}</h2>
                                    <h2 className='card--product--heading'>{item.name}</h2>
                                    <h3 className='card--product--price'>
                                        {item.prices[item.prices.findIndex((element) => element.currency.label === this.props.currencies[1].label)].amount * item.quantity}
                                        {item.prices[item.prices.findIndex((element) => element.currency.label === this.props.currencies[1].label)].currency.symbol}
                                    </h3>
                                    {item.attributes.map((item, index) => {
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
                                    })}
                                </div>
                                <div className='product--card--actions'>
                                    <div className='card--quantity--actions'>
                                        <button className='cart--quantity--btn' onClick={() => this.props.incrementQuantity(item)}>+</button>
                                        <span className='cart--item--quantity'>{item.quantity}</span>
                                        <button className='cart--quantity--btn' onClick={() => this.props.decrementQuantity(item)}>-</button>
                                    </div>
                                    <img className='card--item--image' src={item.gallery[0]} alt="product in cart" />
                                </div>

                            </div>)
                    })}
                </div>
                <div className='cart--component--actions'>
                    <Link to='/cart'>
                        <button className='viewcart--btn'>
                            View Bag
                        </button>
                    </Link>
                    <Link to='/cart'>
                        <button className='checkout--btn'>
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