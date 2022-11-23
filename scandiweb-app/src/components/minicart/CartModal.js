import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './cartmodal.css'
import MiniCartProduct from './minicartproduct/MiniCartProduct'
import priceCalculator from '../../utils/priceCalculator'
import currencyLabel from '../../utils/currencyLabel'
import productCounter from '../../utils/productCounter'

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
                    {productCounter(items)}
                    items</span></h1>
                <div className='card--products'>
                    <MiniCartProduct />
                </div>
                <div className='total--card'>
                    <h1 className='cart--card--heading'>Total:</h1>
                    <h1 className='cart--card--heading'>
                        {priceCalculator(items, currencies)}
                        {currencyLabel(items, currencies)}
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



