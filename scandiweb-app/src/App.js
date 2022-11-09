import './App.css';
import React, { Component } from 'react';
import client from './models';
import GET_CATEGORIES from './models/queries/categories.query';
import { GET_CURRENCIES} from './models/queries/currencies.query';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from './pages/MainPage';

class App extends Component {
  state = { categories: [], currencies: [], active: 0, };

  
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
  handleActiveChange = (e) => {
    this.setState({active: Number(e.target.id)})
  }

  render() {

    return (
      <div className='App'>
        <Router>
          <Navbar categories={this.state.categories} currencies={this.state.currencies} active={this.state.active} activeChange={this.handleActiveChange}/>
          <Routes>
            <Route path='/' element={ <MainPage />}/>
          </Routes>
        </Router>
      </div>
    )
  }
}

export default App;
