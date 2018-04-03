import React from "react";

import DomPixel from "./DomPixel";

class TransactionBlob extends React.Component {
  render() {
    const { transaction, select, pixels } = this.props;
    let classes = "TransactionBlob col";
    if (transaction.contractCreation) classes += " contract-creation";
    return (
      <div
        className={classes}
        data-tip={`Transaction: ${transaction}`}
        onClick={() => select(this)}
      >
        <div className="row">
          <div className="col">
            {transaction.contractCreation ? (
              <h4>contract creation</h4>
            ) : (
              <h4>Transaction</h4>
            )}
            {/* <p>from: {JSON.stringify(transaction.from)}</p>
          <p>to: {JSON.stringify(transaction.to)}</p>
          <p>value: {JSON.stringify(transaction.value)}</p> */}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 pixelline">
            {pixels.map((pixel, i) => <DomPixel key={i} pixel={pixel} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default TransactionBlob;
