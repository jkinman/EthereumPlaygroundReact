import React, { Component } from 'react';
import { Provider } from 'react-redux';


import configureStore from './stores';

import './App.css';
import './styles/app.scss'

import PollEthereum from './components/smart/PollEthereum';

const store = configureStore();

class App extends Component {
  render() {

    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to Ethereum React Starter Kit</h1>
          </header>
          <PollEthereum />
        </div>
      </Provider>
    );
  }
}

export default App;
