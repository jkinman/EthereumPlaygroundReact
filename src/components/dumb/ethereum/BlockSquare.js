import React from "react";

//components
import TransactionSquare from "./TransactionSquare";

class BlockSquare extends React.Component {
  render() {
    const { block, index } = this.props;

    return (
      <div className="blocksquare container">
        <div className="row">
          <div className="col-sm-12">
            <h4>{block.number}</h4>
            <div className="row" />
          </div>
          <div className="row">
          {this.props.block.transactions.map(transaction => {
              if (transaction.toToken) {
                return (
                  <div className="col-sm-1">
                    <img
                      className="tokenSymbol"
                      src={`https://raw.githubusercontent.com/TrustWallet/tokens/master/images/${
                        transaction.to
                      }.png`}
                    />
                  </div>
                );
              }
            })}
            {this.props.block.transactions.map(transaction => {
              if (transaction.fromToken) {
                return (
                  <div className="col-sm-1">
                    <img
                      className="tokenSymbol"
                      src={`https://raw.githubusercontent.com/TrustWallet/tokens/master/images/${
                        transaction.from
                      }.png`}
                    />
                  </div>
                );
              }
            })}
          </div>
          <div className="row">
            {this.props.block.transactions.map(e => (
              <TransactionSquare transaction={e} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default BlockSquare;
