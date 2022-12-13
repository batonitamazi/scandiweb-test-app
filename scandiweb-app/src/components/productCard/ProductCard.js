import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addtoCart } from '../../models/application/cartSlice'
import { Link } from 'react-router-dom';
import ProductPrice from '../productPrices/ProductPrice';
import createProductWithSelectedAttribtues from '../../utils/createProduct';



class ProductCard extends Component {
    onAttributeSelect = (attributeId, attributeValue) => {
        this.setState({ selectedAttributes: { ...this.state.selectedAttributes, [attributeId]: attributeValue } });
    }
    render() {
        const {
            item,
            item: {
                name,
                inStock,
                gallery,
                id,
                prices,
            },
            currencies,
            addtoCart,
        } = this.props;
        return (
            <div className='product--card--wrapper'>
                <Link to={`/${id}`} className='product--card text--link'>
                    <div className={inStock ? 'in--stock' : 'out--stock'}>
                        Out of Stock
                    </div>
                    <img src={gallery[0]} alt="product" className="product--image" />
                    <div className='card--subcontainer'>
                        <span className='item--span'>{name}</span>
                        {currencies[1] && (
                            <h4 className='item--price'>
                                <ProductPrice prices={prices} />
                            </h4>
                        )}
                    </div>

                </Link>
                <img src='./assets/addtocart.png' className={inStock ? 'addto--cart' : 'hidden--cart'} alt='cart' onClick={() => addtoCart(createProductWithSelectedAttribtues(item))} />
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