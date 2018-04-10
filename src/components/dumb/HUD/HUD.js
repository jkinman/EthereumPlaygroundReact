import React from "react";

// components
import HUDBox from "./HUDBox";

// style
import "./HUD.scss";

class HUD extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
  }

  addMessage(text) {
    this.setState({ messages: [...this.state.messages, text] });
  }
  showInfo(message) {
    this.refs.info.textContent = message;
  }

  render() {
    const { ethereum } = this.props;
    return (
      <div className="HUD">
        <h1 class="title">ETHEREUM EXPLORER</h1>
        <div className="panelsTop">
          <HUDBox
            title="ETH blocks mined"
            subtitle={ethereum.latestBlock.number}
          />
        </div>
        {this.state.messages.map(message => <p>{message}</p>)}
      </div>
    );
  }
}

export default HUD;
