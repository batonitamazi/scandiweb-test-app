import React, { Component } from 'react'
import './mainpage.css'
import { GET_PRODUCTS } from '../../models/queries/products.query'
import client from '../../models'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { addtoCart } from '../../models/application/cartSlice'


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
    handleActiveChange = (e) => {
        this.setState({ active: Number(e.target.id) })
    }

    render() {
        return (
            <div className='items--container'>
                <h1 className='category--heading'>Category name</h1>
                <div className='category--items'>
                    {this.state.products?.map((item, index) => {
                        return (
                            <div className='product--card' key={index}>
                                <img src={item.gallery[0]} alt="product" className="product--image" />
                                <img src='./assets/addtocart.png' className='addto--cart' alt='cart' onClick={() => this.props.addtoCart(item)} />
                                <div className='card--subcontainer'>
                                    <Link to={`/${item.id}`}>
                                        <span className='item--span'>{item.name}</span>
                                        {this.props.currencies[1] && (
                                            <h4 className='item--price'>
                                                {item.prices[item.prices.findIndex((element) => element.currency.label === this.props?.currencies[1]?.label)].amount}
                                                {item.prices[item.prices.findIndex((element) => element.currency.label === this.props?.currencies[1]?.label)].currency.symbol}
                                            </h4>
                                        )}

                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    items: state.cartItems.cartItems,
    currencies: state.currencies.activeCurrency
});
const mapDispatchToProps = { addtoCart };

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);