import React, { Component } from 'react'
import { connect } from 'react-redux';
import './cartpage.css'
import {incrementQuantity, decrementQuantity} from '../../models/application/cartSlice'

class CartPage extends Component {
  render() {
    return (
      <div className='items--container'>
        <h1 className='cart--heading'>
          Cart:
        </h1>
        {this.props.items.map((item, index) => {
          return (
            <div className='cart--item' key={index}>
              <div className='cart--item--description'>
                <h1 className='product--title'>{item.brand}</h1>
                <h1 className='product--subtitle'>{item.name}</h1>
                <h1 className='product--price'>
                  {item.prices[item.prices.findIndex((element) => element.currency.label === this.props.currencies[1].label)].amount * item.quantity} 
                  {item.prices[item.prices.findIndex((element) => element.currency.label === this.props.currencies[1].label)].currency.symbol}
                </h1>
                {item.attributes.map((item, index) => {
                  return (
                    <div className='choice--container' key={index}>
                      <h4 className='container--subtitle'>{item.name}:</h4>
                      <div className='choices--container'>
                        {item.items.map((miniItem, index) => {
                          return (
                            <button key={index} className="choice--btn" style={{ backgroundColor: `${miniItem.value}`, border: `1px solid ${miniItem.value}`, color: `${miniItem.value}` }}>
                              {miniItem.id}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className='cart--item--gallery'>
                <div className='cart--quantity--actions'>
                  <button className='quantity--btn' onClick={() => this.props.incrementQuantity(item)}>+</button>
                  <span className='cart--item--quantity'>{item.quantity}</span>
                  <button className='quantity--btn' onClick={() => this.props.decrementQuantity(item)}>-</button>
                </div>
                <img className='cart--item--image' src={item.gallery[0]} alt="product in cart"/>
              </div>

            </div>

          )

        })}

      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  items: state.cartItems.cartItems,
  currencies: state.currencies.activeCurrency

});
const mapDispatchToProps = {incrementQuantity, decrementQuantity};

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)
