import './App.css';
import React, { Component } from 'react';
import client from './models';
import GET_CATEGORIES from './models/queries/categories.query';
import { GET_CURRENCIES } from './models/queries/currencies.query';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from './pages/mainpage/MainPage';
import ProductPage from './pages/productpage/ProductPage';
import CartPage from './pages/cart/CartPage';

class App extends Component {
  state = { categories: [], currencies: [], products: [], active: 0 };


  componentDidMount() {
    this.fetchQuery();
    this.fetchCurrencies();
    // this.fetchProducts();
  }

  async fetchQuery() {
    const result = await client.query({
      query: GET_CATEGORIES,
    });
    this.setState({
      categories: [...result.data.categories],
    });
  }
  async fetchCurrencies() {
    const result = await client.query({
      query: GET_CURRENCIES,
      variables: {

      }
    })
    this.setState({
      currencies: [...result.data.currencies]
    })
  }
  handleActiveChange = (e) => {
    this.setState({ active: Number(e.target.id) })
  }
  render() {
    return (
      <div className='App'>
        <Router>
          <Navbar categories={this.state.categories} currencies={this.state.currencies} active={this.state.active} activeChange={this.handleActiveChange} />
          <Switch>
            <Route path='/' exact component={MainPage} />
            <Route path='/cart' exact component={CartPage}/>
            {this.state.categories?.map((item, index) => {
              return (
                <Route key={index} path={`/${item.name}`} component={MainPage} exact />
              )
            })}
            {this.state.categories?.map((item, index) => {
              return (
                <Route key={index} path={ `/:id`} component={ProductPage} exact />
              )
            })}
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
