import React, { Component } from 'react'
import './mainpage.css'
import { GET_PRODUCTS } from '../../models/queries/products.query'
import client from '../../models'
import { connect } from 'react-redux'
import { addtoCart } from '../../models/application/cartSlice'
import ProductCard from '../../components/productCard/ProductCard'


class MainPage extends Component {
    constructor() {
        super()
        this.state = { products: [], }
    }

    componentDidMount() {
        this.fetchProducts();
    }

    async fetchProducts() {
        const result = await client.query({
            query: GET_PRODUCTS,
            variables: {
                category: `${this.props.location.pathname.slice(1, 10)}`,
            },
        });
        this.setState({ products: result.data.category.products });
    }
    

    render() {
        const {
            backgroundBlur
        } = this.props;
        const {
            products
        } = this.state
        
        return (
            <div className='items--container'>
                <h1 className='category--heading'>{this.props.location.pathname.slice(1, 10)}</h1>
                <div className='category--items'>
                    {products?.map((item, index) => {
                        return (
                            <ProductCard backgroundBlur={backgroundBlur} item={item} key={item.id}/>
                        )
                    })}
                </div>
            </div >
        )
    }
}

const mapStateToProps = (state) => ({
    currencies: state.currencies.activeCurrency,
    backgroundBlur: state.backgroundBlur.backgroundBlur,
});
const mapDispatchToProps = { addtoCart };


export default connect(mapStateToProps, mapDispatchToProps)(MainPage);