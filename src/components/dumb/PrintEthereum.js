import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./ethereum/ethereum.scss";

//TODO remove this dependency
import EthereumService from "../../services/EthereumService";

//components
import BlockEnhanced from "./ethereum/BlockEnhanced";
import BlockDetails from "./ethereum/BlockDetails";
import TransactionDetails from "./ethereum/TransactionDetails";
import BlockInspector from "./ethereum/BlockInspector/BlockInspector";

export default class PrintEthereum extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      hoverId: 0
    };
  }

  componentDidMount() {}

  showTransactionDetails(transaction) {
    this.props.ethService.loadTransaction(transaction, (err, data) => {
      this.refs.TransactionDetails.open(data);
    });
  }

  showDetails(block) {
    this.refs.blockDetails.open(block);
  }

  showToolTip(data) {
    if (!data) {
      this.refs.hoverInfo.style.display = "none";
    } else {
      this.refs.hoverInfo.innerText = data;
      this.refs.hoverInfo.style.display = "block";
    }
  }
  setCurrentBlock(event, block) {
    console.log(event);
    console.log(block);
  }

  setCurrentContext(element) {
    let fixedStyle = {
      position: 'fixed',
      left: '50%',
      top: '50%',
      transformOrigin: 'center',
      transform: 'translate(-50%,-50%)',
    }
    this.selectedElement = ReactDOM.render(
      <BlockEnhanced {...element.props} style={fixedStyle}/>,
      this.refs.currentElement
    );

   this.selectedElement.zoomIn();
  }

  render() {
    return (
      <div className="index">
        <h1>Ethereum Blockchain Bitmap Visualization</h1>
        <h3>
          The transactions in every block are being concatenated and converted
          to RGB values and the result is being rendered to a bitmap.
        </h3>
        <h3>Click the blocks to inspect</h3>

        <h3>
          Each group of squares represents one transaction, each group of
          transactions is a block.
        </h3>
        <p ref="data" />

        <div className="blockContainer">
          {this.props.ethereum &&
            this.props.ethereum.blockArray.map((block, i) => {
              return (
                <div key={i}>
                  <BlockEnhanced
                    select={this.setCurrentContext.bind(this)}
                    showBlock={this.showDetails.bind(this)}
                    // toolTipCB={ this.showToolTip.bind(this) }
                    block={block}
                    tilt={this.state.hoverId == i}
                    index={i}
                    key={i + "block"}
                  />
                </div>
              );
            })}
        </div>
        <div ref="currentElement" />
      </div>
    );
  }
}
