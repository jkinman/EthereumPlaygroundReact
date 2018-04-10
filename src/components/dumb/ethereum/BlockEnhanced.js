import React from "react";
import anime from "animejs";

import TransactionBlob from "./TransactionBlob";

import "./ethereum.scss";

const tweens = [];

class BlockEnhanced extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: { ...props.style }
    };
  }

  zoomIn() {
    let tweenData = { percent: 0 };
    tweens.push(
      anime({
        targets: tweenData,
        percent: 100,
        update: () => {
          this.setZoomPercent(tweenData.percent);
        }
      })
    );
  }

  zoomOut() {
    this.setState({ style: { ...this.state.style, display: "none" } });
  }

  setZoomPercent(percent) {
    const FULL_SIZE = 2;
    this.setStyle({
      transform: `scale(${FULL_SIZE * (percent / 100)}, ${FULL_SIZE *
        (percent / 100)})`
    });
  }

  setStyle(styleParam) {
    let newStyle = { ...this.state.style, ...styleParam };
    this.setState({ style: newStyle });
  }

  render() {
    return (
      <div className="block blockEnhanced container" style={this.state.style}>
        <div className="row">
          <div className="col-sm-12">
            <h1>{`Block # ${this.props.block.number}`}</h1>
          </div>
        </div>

        <div key={this.props.index} className=" row">
          {this.props.block.pixelArray.map((transaction, i) => (
            <TransactionBlob
              select={this.props.select}
              pixels={transaction}
              showTransactionDetails={this.props.showTransactionDetails}
              toolTipCB={this.props.toolTipCB}
              transaction={this.props.block.transactions[i]}
              key={i}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default BlockEnhanced;
