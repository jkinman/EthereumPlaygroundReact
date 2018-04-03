import React from "react";

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
    return (
      <div>
        <p ref="info">HUD</p>
        {this.state.messages.map(message => <p>{message}</p>)}
      </div>
    );
  }
}

export default HUD;
