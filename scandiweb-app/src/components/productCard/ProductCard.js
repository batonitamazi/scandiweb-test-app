import React, { Component } from 'react'
import {connect} from 'react-redux'
import {addtoCart} from '../../models/application/cartSlice'
import { Link } from 'react-router-dom';
import ProductPrice from '../productPrices/ProductPrice';



class ProductCard extends Component {
    onAttributeSelect = (attributeId, attributeValue) => {   
        this.setState({ selectedAttributes: { ...this.state.selectedAttributes, [attributeId]: attributeValue }});
      }
    createProductWithSelectedAttribtues() {
        const {
          item,
          item: {
            attributes,
          }
        } = this.props;
        const newProduct = structuredClone(item);
        newProduct.activeAttributes = [];
        attributes.map((attr) => (
            newProduct.activeAttributes = {...newProduct.activeAttributes, [attr.id] : attr.items[0].value }
        ));
        newProduct.unicalId = newProduct.id.slice(0, 6) + Object.values(newProduct.activeAttributes)
        return newProduct
      }

    render() {
        const {
            backgroundBlur,
            item,
            item: {
                inStock,
                gallery,
                id,
                prices,
            },
            currencies,
        } = this.props;
        return (
            <div className={backgroundBlur ? 'product--card--blurred' : 'product--card'} >
                <div className={inStock ? 'in--stock' : 'out--stock'}>
                    Out of Stock
                </div>
                <img src={gallery[0]} alt="product" className="product--image" />
                <img src='./assets/addtocart.png' className={inStock ? 'addto--cart' : 'hidden--cart'} alt='cart' onClick={() => this.props.addtoCart(this.createProductWithSelectedAttribtues())} />
                <div className='card--subcontainer'>
                    <Link to={`/${id}`} className="text--link">
                        <span className='item--span'>{item.name}</span>
                        {currencies[1] && (
                            <h4 className='item--price'>
                                <ProductPrice prices={prices}/>
                            </h4>
                        )}
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    currencies: state.currencies.activeCurrency,
    backgroundBlur: state.backgroundBlur.backgroundBlur,

});
const mapDispatchToProps = { addtoCart };


export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);