import React, { Component } from 'react'
import { connect } from 'react-redux';
import './cartpage.css'

class CartPage extends Component {
  render() {
    console.log(this.props.items)
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
                  {item.prices[0].amount} {item.prices[0].currency.symbol}
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
                  <button className='quantity--btn'>+</button>
                  <span>{item.quantity}</span>
                  <button className='quantity--btn'>-</button>
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
  items: state.cartItems.cartItems
});

export default connect(mapStateToProps)(CartPage)
