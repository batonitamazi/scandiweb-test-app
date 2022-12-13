import './App.css';
import React, { Component } from 'react';
import client from './models';
import GET_CATEGORIES from './models/queries/categories.query';
import { GET_CURRENCIES } from './models/queries/currencies.query';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import MainPage from './pages/mainpage/MainPage';
import ProductPage from './pages/productpage/ProductPage';
import CartPage from './pages/cart/CartPage';
import { connect } from 'react-redux'
import { addCurrencies } from './models/application/currencySlice'
import { addBackgroundBlur } from './models/application/modalSlice'


class App extends Component {
  constructor() {
    super();
    this.state = { categories: [], currencies: [], active: 0 };
  }
  componentDidMount() {
    this.fetchCategories();
    this.fetchCurrencies();
  }

  async fetchCategories() {
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
    })
    this.setState({
      currencies: [...result.data.currencies]
    })
    this.props.addCurrencies([...result.data.currencies])
  }
  handleActiveChange = (e) => {
    this.setState({ active: Number(e.target.id) })
  }

  render() {
    const {categories, active} = this.state
    return (
      <div className='App'>
        <Router>
          <Navbar categories={categories} active={active} activeChange={this.handleActiveChange} handleBackground={this.handleBackground} />
          <Switch>
            <Route path='/' exact render={() => <Redirect to="/all" />} />
            <Route path='/cart' exact component={CartPage} />
            {categories?.map((item) => {
              return (
                <Route key={item.name} path={`/${item.name}`} component={MainPage} exact />
              )
            })}
            {categories?.map((item) => {
              return (
                <Route key={item.name} path={`/:id`} component={ProductPage} exact />
              )
            })}
          </Switch>
        </Router>
      </div>
    )
  }
}

const mapDispatchToProps = { addCurrencies, addBackgroundBlur }
const mapStateToProps = (state) => ({
  items: state.currencies.currencies,
  backgroundBlur: state.backgroundBlur.backgroundBlur,
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
