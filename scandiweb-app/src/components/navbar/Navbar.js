
import React, { Component } from 'react'
import './navbar.css'

export default class Navbar extends Component {

  render() {
    return (
      <div className='nav'>
        <ul className='nav--list'>
          {this.props.categories?.map((item, index) => {
            console.log(index, this.props?.active);
            return (
              <button
                key={index}
                id={index}
                className="nav--item"
                style={Number(this.props?.active) === index ? { borderBottom: `2px solid #5ECE7B` } : null}
                onClick={this.props.activeChange}
              >
                {item.name}
              </button>
            )
          })}
        </ul>
        <img src='./assets/logo.png' alt='logo' className='navbar--logo' />
        <div className='nav--actions'>
          <div className='currencie-picker'>
            <span className='currency--tag'>{this.props.currencies[0]?.symbol}</span>
            <img className='dropdown--icon' alt='dropdown' src='./assets/dropdown.png' />
          </div>
          <img src='./assets/Emptycart.png' className='empty--cart' alt='empty cart' />
        </div>
      </div>
    )
  }
}
