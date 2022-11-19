import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './cartmodal.css'
import MiniCartProduct from './minicartproduct/MiniCartProduct'

class CartModal extends Component {
    render() {
        const { show,
            items,
            currencies,
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
                    <MiniCartProduct />
                </div>
                <div className='total--card'>
                    <h1 className='cart--card--heading'>Total:</h1>
                    <h1 className='cart--card--heading'>
                        {items && items.reduce((acumulator, curValue) => {
                            acumulator += Number(curValue.prices[curValue.prices.findIndex((element) => element.currency.label === currencies[1].label)].amount * curValue.quantity);
                            return acumulator
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

export default connect(mapStateToProps)(CartModal)



