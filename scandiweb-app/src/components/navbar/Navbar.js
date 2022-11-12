
import React, { Component } from 'react'
import './navbar.css'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'

class Navbar extends Component {
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
          <div className='currencie-picker'>
            <span className='currency--tag'>{this.props.currencies[0]?.symbol}</span>
            <img className='dropdown--icon' alt='dropdown' src='./assets/dropdown.png' />
          </div>
          <Link to="/cart">
            <img src='./assets/Emptycart.png' className='empty--cart' alt='empty cart' />
          </Link>
          <div className='quantity--container'>
            <span>{this.props.items.cartItems.length}</span>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  items: state.cartItems
});

export default connect(mapStateToProps)(Navbar);
