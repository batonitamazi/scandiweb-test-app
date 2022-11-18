import React, { Component } from 'react'
import { GET_PRODUCT } from '../../models/queries/product.query'
import client from '../../models'
import { connect } from 'react-redux'
import { addtoCart } from '../../models/application/cartSlice'
import {Attributes} from '../../components/attributes/Attributes'
import './productpage.css'



class ProductPage extends Component {
  constructor() {
    super()
    this.state = { product: [], currentImage: "", selectedAttributes: {'size': 'xl', 'color': 'red'} }
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
      this.setState({ product: { ...result.data.product } });
      this.setState({ image: result.data.product.gallery[0] })
      
      this.setState({activeAttribute: {...result.data.product.attributes.map((item) => {return item.items[0].id})}
    })
    } catch (error) {
      console.log(error)
    }
  }

  createProductWithSelectedAttribtues(){
    const {
        product
    } = this.state;

    const newProduct = structuredClone(product);

    newProduct.attributes = this.state.selectedAttributes;

    return newProduct;
    
  }

  onAttributeSelect = (attributeId, attributeValue) => {
    console.log(attributeId, attributeValue);
    this.setState({...this.state.selectedAttributes, [attributeId]: attributeValue});
  }

  render() {
    const {
      product: {
        attributes
      },
      backgroundBlur,
    } = this.state;
    return (
      <div className='product--container'>
        <div className={backgroundBlur ? 'images--container--blur' : 'images--container'}>
          {this.state.product?.gallery?.map((item, index) => {
            return (
              <img key={index} src={item} className="mini--image" alt='product' onClick={() => this.setState({ image: `${item}` })} />
            )
          })}

        </div>
        <div className={backgroundBlur ? 'description--container--blur' : 'description--container'} >
          <img className='main--image' src={this.state.image} alt="product" />
          <div className='product--info--card'>
            <div>
              <h1 className='product--title'>{this.state.product?.brand}</h1>
              <h1 className='product--subtitle'>{this.state.product?.name}</h1>
            </div>
            <Attributes attributes={attributes} onAttributeSelect = {this.onAttributeSelect} />
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
            <button className='cart--add' onClick={() => this.props.addtoCart(this.createProductWithSelectedAttribtues())}>
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
