
import React, { Component } from 'react'
import './navbar.css'

export default class Navbar extends Component {
  render() {
    return (
        <div className='nav'>
        <ul className='nav--list'>
          {this.props.categories?.map((item, index) => {
            return(<li key={index}>
              {item.name}
            </li>)
          })}
        </ul>
        <img src='./assets/logo.png' alt='logo' className='navbar--logo'/>
        <div className='nav--actions'>
          <div className='currencie-picker'>
            <span className='currency--tag'>{this.props.currencies[0]?.symbol}</span>
            <img className='dropdown--icon' alt='dropdown' src='./assets/dropdown.png'/>
          </div>
          <img src='./assets/Emptycart.png' className='empty--cart' alt='empty cart'/>
        </div>
      </div>
    )
  }
}
