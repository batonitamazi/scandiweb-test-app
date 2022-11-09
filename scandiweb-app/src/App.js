import './App.css';
import React, { Component } from 'react';
import client from './models';
import GET_CATEGORIES from './models/queries/categories.query';
import { GET_CURRENCIES} from './models/queries/currencies.query';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from './pages/MainPage';

class App extends Component {
  state = { categories: [], currencies: [], };

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
  }

  render() {
  console.log(this.state.categories)

    return (
      <div className='App'>
        <Router>
          <Navbar categories={this.state.categories} currencies={this.state.currencies}/>
          <Routes>
            <Route path='/' element={ <MainPage />}/>
          </Routes>
        </Router>
      </div>
    )
  }
}

export default App;
