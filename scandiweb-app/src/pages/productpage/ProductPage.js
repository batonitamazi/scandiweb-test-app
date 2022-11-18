import React, { Component } from 'react'
import { GET_PRODUCT } from '../../models/queries/product.query'
import client from '../../models'
import { connect } from 'react-redux'
import { addtoCart } from '../../models/application/cartSlice'
import './productpage.css'



class ProductPage extends Component {
  constructor() {
    super()
    this.state = { product: [], currentImage: "", }
  }
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
    return (
      <div className='product--container'>
        <div className={this.props.backgroundBlur ? 'images--container--blur' : 'images--container' }>
          {this.state.product?.gallery?.map((item, index) => {
            return (
              <img key={index} src={item} className="mini--image" alt='product' onClick={() => this.setState({ image: `${item}` })} />
            )
          })}

        </div>
        <div className={this.props.backgroundBlur ? 'description--container--blur' : 'description--container'} >
          <img className='main--image' src={this.state.image} alt="product" />
          <div className='product--info--card'>
            <div>
              <h1 className='product--title'>{this.state.product?.brand}</h1>
              <h1 className='product--subtitle'>{this.state.product?.name}</h1>
            </div>
            {this.state.product.attributes && this.state.product.attributes.map((item, index) => {
              return (
                <div className='choice--container' key={index}>
                  <h4 className='container--subtitle'>{item.name}:</h4>
                  <div className='choices--container'>
                    {item.items.map((miniItem, index) => {
                      return (
                        <button key={index} className="choice--btn" style={{ backgroundColor: `${miniItem.value}`, border: `1px solid ${miniItem.value}`, color: `${miniItem.value}` }}>
                          {miniItem.value}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
            <div className='choice--container'>
              <h4 className='container--subtitle'>Price:</h4>
              <h1 className='product--price'>
                {this.state.product?.prices ?
                  this.state.product?.prices[this.state.product?.prices.findIndex((element) => element.currency.label === this.props.currencies[1]?.label)].amount
                  : null}
                {this.state.product?.prices ?
                  this.state.product?.prices[this.state.product?.prices.findIndex((element) => element.currency.label === this.props.currencies[1]?.label)].currency.symbol
                  : null}
              </h1>
            </div>
            <button className='cart--add' onClick={() => this.props.addtoCart(this.state.product)}>
              Add to cart
            </button>
            <p dangerouslySetInnerHTML={{
                __html: this.state.product?.description
              }}>
            </p>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  items: state.cartItems.cartItems,
  currencies: state.currencies.activeCurrency,
  backgroundBlur: state.backgroundBlur.backgroundBlur,
});
const mapDispatchToProps = { addtoCart };
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
