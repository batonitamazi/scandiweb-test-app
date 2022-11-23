import React, { Component } from 'react'
import { connect } from 'react-redux'
import { incrementQuantity, decrementQuantity } from '../../models/application/cartSlice'
import { Attributes } from '../attributes/Attributes'
class CartProduct extends Component {
    constructor() {
        super();
        this.state = { activeImage: 0 };
    }
    imageChange = (number) => {
        this.setState({
            activeImage: this.state.activeImage + number
        })
    }
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
                                        <Attributes attributes={item.attributes} activeAttributes={item.activeAttributes} isCart={true}/>
                                </div>
                                <div className='cart--item--gallery'>
                                    <div className='cart--quantity--actions'>
                                        <button className='quantity--btn' onClick={() => incrementQuantity(item)}>+</button>
                                        <span className='cart--item--quantity'>{item.quantity}</span>
                                        <button className='quantity--btn' onClick={() => decrementQuantity(item)}>-</button>
                                    </div>
                                    <img className='cart--item--image' src={item.gallery[Number(this.state.activeImage)]} alt="product in cart" />
                                    <div className='arrows--container'>
                                        <div className='arrow--container'>
                                            <img src='./assets/arrow.png' alt='arrow ' onClick={() => this.imageChange(1)} />
                                        </div>
                                        <div className='arrow--container'>
                                            <img src='./assets/arrow.png' alt='arrow ' className='arrow-rotated' onClick={() => this.imageChange(1)} />
                                        </div>
                                    </div>

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



