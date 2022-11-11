
import React, { Component } from 'react'
import './navbar.css'
import {Link} from "react-router-dom"

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
export default (Navbar)
