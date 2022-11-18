import React, { Component } from 'react'
import {connect} from 'react-redux'
import {addtoCart} from '../../models/application/cartSlice'
import { Link } from 'react-router-dom';

class ProductCard extends Component {
    render() {
        const {
            backgroundBlur,
            item,
            item: {
                inStock,
                gallery,
                id,
                prices,
            },
            currencies,
        } = this.props;

        return (
            <div className={backgroundBlur ? 'product--card--blurred' : 'product--card'} >
                <div className={inStock ? 'in--stock' : 'out--stock'}>
                    Out of Stock
                </div>
                <img src={gallery[0]} alt="product" className="product--image" />
                <img src='./assets/addtocart.png' className={inStock ? 'addto--cart' : 'hidden--cart'} alt='cart' onClick={() => this.props.addtoCart(item)} />
                <div className='card--subcontainer'>
                    <Link to={`/${id}`} className="text--link">
                        <span className='item--span'>{item.name}</span>
                        {currencies[1] && (
                            <h4 className='item--price'>
                                {prices[prices.findIndex((element) => element.currency.label === currencies[1]?.label)].amount}
                                {prices[prices.findIndex((element) => element.currency.label === currencies[1]?.label)].currency.symbol}
                            </h4>
                        )}
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currencies: state.currencies.activeCurrency,
    backgroundBlur: state.backgroundBlur.backgroundBlur,

});
const mapDispatchToProps = { addtoCart };


export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);