import React, { Component } from "react";
import { Provider } from "react-redux";

import configureStore from "./stores";

import "bootstrap";
import "./App.css";
import "./styles/app.scss";

import PollEthereum from "./components/smart/PollEthereum";

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="container-fluid">
            <header className="App-header">
              <h1 className="App-title">
                Welcome to Ethereum React Starter Kit
              </h1>
              <h2>
                This is a suite of tools to help digest the ethereum blockchain
              </h2>
            </header>
            <PollEthereum />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
