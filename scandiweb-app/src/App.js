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
import { connect } from 'react-redux'
import { addCurrencies } from './models/application/currencySlice'


class App extends Component {
  constructor() {
    super();
    this.state = { categories: [], currencies: [], products: [], active: 0};
  }


  componentDidMount() {
    this.fetchQuery();
    this.fetchCurrencies();
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
    return (

      <div className={this.props.backgroundBlur ? 'App--blurred' : 'App'}>
        <Router>
          <Navbar categories={this.state.categories} active={this.state.active} activeChange={this.handleActiveChange} handleBackground={this.handleBackground}/>
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
                <Route key={index} path={`/:id`} component={ProductPage} exact />
              )
            })}
          </Switch>
        </Router>
      </div>
    )
  }
}

const mapDispatchToProps = { addCurrencies }
const mapStateToProps = (state) => ({
  items: state.currencies.currencies,
  backgroundBlur: state.backgroundBlur.backgroundBlur,
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
