import React, { Component } from 'react'
import { GET_PRODUCT } from '../../models/queries/product.query'
import client from '../../models'
import './productpage.css'



export default class ProductPage extends Component {
  state = { product: [], currentImage: "", }
  componentDidMount() {
    this.fetchProduct();
  }
  async fetchProduct() {
    try {
      const result = await client.query({
        query: GET_PRODUCT,
        variables: {
          productId: this.props.match.params.id,
        },
      });

      this.setState({ product: result.data.product });
      this.setState({ image: result.data.product.gallery[0] })
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    console.log(this.state.product)
    return (
      <div className='product--container'>
        <div className='images--container'>
          {this.state.product?.gallery?.map((item, index) => {
            return (
              <img key={index} src={item} className="mini--image" alt='product' onClick={() => this.setState({ image: `${item}` })} />
            )
          })}

        </div>
        <div className='description--container'>
          <img className='main--image' src={this.state.image} alt="product" />
          <div className='product--info--card'>
            <h1 className='product--title'>{this.state.product?.name}</h1>
            <h1 className='product--subtitle'>{this.state.product?.description}</h1>
            {this.state.product.attributes && this.state.product.attributes.map((item, index) => {
              return (
                <div className='choice--container' key={index}>
                  <h4 className='container--subtitle'>{item.name}:</h4>
                  <div className='choices--container'>
                    {item.items.map((miniItem, index) => {
                      return (
                        <button key={index} className="choice--btn" style={{backgroundColor: `${miniItem.value}`, border: `1px solid ${miniItem.value}`, color: `${miniItem.value}`}}>
                          {miniItem.id}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
            <div className='choice--container'>
              <h4 className='container--subtitle'>Price:</h4>
              <h1 className='product--price'>50{this.state.product?.prices ? this.state.product?.prices[0].currency.symbol : null}</h1>
            </div>
            <button className='cart--add'>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    )
  }
}
