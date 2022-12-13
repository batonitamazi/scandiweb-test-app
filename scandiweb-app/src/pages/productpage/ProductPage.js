import React, { Component } from 'react'
import { GET_PRODUCT } from '../../models/queries/product.query'
import client from '../../models'
import { connect } from 'react-redux'
import { addtoCart } from '../../models/application/cartSlice'
import { Attributes } from '../../components/attributes/Attributes'
import './productpage.css'
import ProductPrice from '../../components/productPrices/ProductPrice'
import createProductWithSelectedAttribtues from '../../utils/createProduct'


class ProductPage extends Component {
  constructor() {
    super()
    this.state = {
      product: [],
      currentImage: "",
      activeAttributes: {},
    }
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
      this.setState({ product: { ...result.data.product, } });
      this.setState({ image: result.data.product.gallery[0] })
    } catch (error) {
      console.log(error)
    }
  }
  onAttributeSelect = (attributeId, attributeValue) => {
    this.setState({ activeAttributes: { ...this.state.activeAttributes, [attributeId]: attributeValue } });
  }

  render() {
    const {
      product,
      product: {
        attributes,
      },
      backgroundBlur,
      activeAttributes
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
        <div className='description--container'>
          <img className='main--image' src={this.state.image} alt="product" />
          <div className='product--info--card'>
            <div>
              <h1 className='product--title'>{this.state.product?.brand}</h1>
              <h1 className='product--subtitle'>{this.state.product?.name}</h1>
            </div>
            <Attributes attributes={attributes} onAttributeSelect={this.onAttributeSelect} activeAttributes={activeAttributes} />
            <div className='choice--container'>
              <h4 className='container--subtitle'>Price:</h4>
              <h1 className='product--price'>
                <ProductPrice prices={this.state.product.prices} />
              </h1>
            </div>
            <button
              className='cart--add'
              onClick={() => {this.props.addtoCart(createProductWithSelectedAttribtues(product, activeAttributes)) }}
            >
              Add to cart
            </button>

            <div dangerouslySetInnerHTML={{
              __html: this.state.product?.description
            }}>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  backgroundBlur: state.backgroundBlur.backgroundBlur,
});


const mapDispatchToProps = { addtoCart };
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
