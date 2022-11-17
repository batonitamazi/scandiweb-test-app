
import React, { Component } from 'react'
import './navbar.css'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import CurrenciesCard from '../currencyModal/CurrenciesCard'
import CartModal from '../cart/CartModal'
import { addBackgroundBlur } from '../../models/application/modalSlice'

class Navbar extends Component {
  constructor() {
    super();
    this.state = { show: false, showCartModal: false }
  }
  handleModal = () => {
    this.setState({ showCartModal: false })
    this.setState({ show: !this.state.show })
    console.log(this.props.backgroundBlur)
    this.props.addBackgroundBlur(this.props.backgroundBlur)
  }
  handleCartModal = () => {
    this.setState({ showCartModal: !this.state.showCartModal })
    this.props.addBackgroundBlur(this.props.backgroundBlur)
    this.setState({ show: false })
  }

  render() {
    return (
      <div className='nav'>
        <ul className='nav--list'>
          {this.props.categories?.map((item, index) => {
            return (
              <Link to={`/${item.name}`} key={index}>
                <button
                  id={index}
                  className="nav--item"
                  style={Number(this.props?.active) === index ? { borderBottom: `2px solid #5ECE7B` } : null}
                  onClick={(e) => (this.props.activeChange(e))}
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
            {this.props.currencies?.activeCurrency[1]?.symbol && (
              <span className='currency--tag'>{this.props.currencies.activeCurrency[1].symbol}</span>
            )}
            <CurrenciesCard show={this.state.show} />
            <img className='dropdown--icon' alt='dropdown' src='./assets/dropdown.png' />
          </div>
          <img src='./assets/Emptycart.png' className='empty--cart' alt='empty cart' onClick={this.handleCartModal} />
          {
            this.props.items.cartItems.length > 0 && (
              <div className='quantity--container'>
                <span>
                  {this.props.items.cartItems && this.props.items.cartItems.reduce((acumulator, curValue) => {
                    acumulator += Number(curValue.quantity)
                    return acumulator
                  }, 0)}
                </span>
              </div>
            )
          }
          <CartModal show={this.state.showCartModal} />
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
