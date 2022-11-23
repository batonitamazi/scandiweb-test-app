import React, { Component } from 'react'
import { connect } from 'react-redux';
import './cartpage.css'
import { incrementQuantity, decrementQuantity } from '../../models/application/cartSlice'
import CartProduct from '../../components/cartproduct/CartProduct';
import currencyLabel from '../../utils/currencyLabel';

class CartPage extends Component {
  render() {
    const {
      items,
      currencies,
    } = this.props
    return (
      <div className='items--container'>
        <h1 className='cart--heading'>
          Cart:
        </h1>
        <CartProduct />
        <div className='cartpage--payments'>
          <h1 className='payments--heading'>Tax 21%:
            {items && items.reduce((acumulator, curValue) => {
              acumulator += Number(curValue.prices[curValue.prices.findIndex((element) => element.currency.label === currencies[1].label)].amount * curValue.quantity);
              return acumulator
            }, 0) * 21 / 100}
              {currencyLabel(items, currencies)}
            
            <span className='product--price'>
            </span>
          </h1>
          <h1 className='payments--heading'>Quantity:
            {items && items.reduce((acumulator, curValue) => {
              acumulator += Number(curValue.quantity)
              return acumulator
            }, 0)}
            <span className='product--price'>
            </span>
          </h1>
          <h1 className='payments--heading'>Total:
            <span className='product--price'>
              {items && items.reduce((acumulator, curValue) => {
                acumulator += Number(curValue.prices[curValue.prices.findIndex((element) => element.currency.label === currencies[1].label)].amount * curValue.quantity);
                return acumulator
              }, 0)}
              {currencyLabel(items, currencies)}
            </span>
          </h1>
          <button className='checkout--btn'>
            order
          </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)
