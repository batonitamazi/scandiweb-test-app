
import React, { Component } from 'react'
import './navbar.css'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import CurrenciesCard from '../currencyModal/CurrenciesCard'
import CartModal from '../minicart/CartModal'
import { addBackgroundBlur } from '../../models/application/modalSlice'
import productCounter from '../../utils/productCounter'

class Navbar extends Component {
  constructor() {
    super();
    this.state = { show: false, showCartModal: false }
  }
  handleModal = () => {
    this.setState({ showCartModal: false })
    this.setState({ show: !this.state.show })
  }
  handleCartModal = () => {
    this.setState({ showCartModal: !this.state.showCartModal })
    this.setState({ show: false })
    this.props.addBackgroundBlur(this.state.showCartModal)
  }

  render() {
    const {
      categories,
      active,
      activeChange,
      items: {
        cartItems,
      },
      currencies: {
        activeCurrency
      }
    }
      = this.props
    return (
      <div className='nav'>
        <ul className='nav--list'>
          {categories?.map((item, index) => {
            return (
              <Link to={`/${item.name}`} key={index}>
                <button
                  id={index}
                  className="nav--item"
                  style={Number(active) === index ? { borderBottom: `2px solid #5ECE7B` } : null}
                  onClick={(e) => (activeChange(e))}
                >
                  {item.name}
                </button>
              </Link>
            )
          })}
        </ul>
        <Link to="/">
          <img src='./assets/logo.png' alt='logo' className='navbar--logo' />
        </Link>
        <div className='nav--actions'>
          <div className='currencie-picker' onClick={this.handleModal}>
            {activeCurrency[1]?.symbol && (
              <span className='currency--tag'>{activeCurrency[1].symbol}</span>
            )}
            <CurrenciesCard show={this.state.show} />
            <img className='dropdown--icon' alt='dropdown' src='./assets/dropdown.png' />
          </div>
          <div onClick={this.handleCartModal} >
            <img src='./assets/Emptycart.png' className='empty--cart' alt='empty cart' />
            {
              this.props.items.cartItems.length > 0 && (
                <div className='quantity--container'>
                    {productCounter(cartItems)}
                </div>
              )
            }
          </div>
          <CartModal show={this.state.showCartModal} handleCartModal={this.handleCartModal} />
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  items: state.cartItems,
  currencies: state.currencies,
  backgroundBlur: state.backgroundBlur.backgroundBlur
});
const mapDispatchToProps = { addBackgroundBlur }

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
