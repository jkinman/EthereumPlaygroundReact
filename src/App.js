import React, { Component } from "react";
import { Provider } from "react-redux";

import configureStore from "./stores";

import "bootstrap";
import "./App.css";
import "./styles/app.scss";

// import Main from "./components/smart/PollEthereum";
import Main from "./components/smart/BabylonBlockExplorer";

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="container-fluid">
            <Main />
          </div>
          <div id="spawnedthings" />
        </div>
      </Provider>
    );
  }
}

export default App;
