import React, { Component } from 'react'
import './mainpage.css'
import { GET_PRODUCTS } from '../../models/queries/products.query'
import client from '../../models'
import { Link } from 'react-router-dom'



class MainPage extends Component {
    state = { products: [], }

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
        console.log(this.props)
        return (
            <div className='items--container'>
                <h1 className='category--heading'>Category name</h1>
                <div className='category--items'>
                    {this.state.products?.map((item, index) => {
                        return (
                            <Link to={`/${item.id}`} key={index}>
                                <div className='product--card'>
                                    <img src={item.gallery[0]} alt="product" className="product--image" />
                                    <img src='./assets/addtocart.png' className='addto--cart' alt='cart' />
                                    <div className='card--subcontainer'>
                                        <span className='item--span'>{item.name}</span>
                                        <h4 className='item--price'>{item.prices[0].amount} {item.prices[0].currency.symbol}</h4>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default MainPage