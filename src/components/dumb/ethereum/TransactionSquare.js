import React from "react";

import DomPixel from "./DomPixel";

class TransactionSquare extends React.Component {
  render() {
    const { transaction } = this.props;
    let classes = "transactionsquare col-sm-3";
    if (transaction.contractCreation) classes += " contract-creation";
    return (
      <div className={classes}>
        <div className="row">
          <div className="col">
            {transaction.contractCreation && <h4>Contract Creation</h4>}
            {/* <p className="hash">{transaction.hash}</p> */}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h3>{(transaction.value / 1000000000000000000).toFixed(4)} ETH</h3>
          </div>
        </div>
        {transaction.toToken && (
          <div className="row">
            <div className="col">
              <h4>{transaction.toToken.symbol}</h4>{" "}
            </div>
            <div className="col">
              <img
                className="tokenSymbol"
                src={`https://raw.githubusercontent.com/TrustWallet/tokens/master/images/${
                  transaction.to
                }.png`}
              />
            </div>
          </div>
        )}
        {transaction.fromToken && (
          <div className="row">
            <div className="col">
              <h4>{transaction.fromToken.symbol}</h4>
            </div>
            <div className="col">
              <img
                className="tokenSymbol"
                src={`https://raw.githubusercontent.com/TrustWallet/tokens/master/images/${
                  transaction.from
                }.png`}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TransactionSquare;
