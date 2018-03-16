import React from 'react';
import './ethereum.scss';
import { Easing, Tween, autoPlay } from 'es6-tween'

import TransactionBlob from './TransactionBlob'

class BlockEnhanced extends React.Component{

  zoomIn() {
  }
   onClick(e) {
     debugger
   }

  render() {

  return(
    <div className="block" onClick={() => this.props.select(this)}>
    <h1 onClick={ () => this.props.showBlock(this.props.block) } >{`Block # ${this.props.block.number}`}</h1>
    <div key={this.props.index} className="blockEnhanced">
      {this.props.block.pixelArray.map( (transaction, i) => 
      <TransactionBlob 
      pixels={transaction} 
      showTransactionDetails={this.props.showTransactionDetails} 
      toolTipCB={ this.props.toolTipCB } 
      transaction={this.props.block.transactions[i]} 
      key={i} /> )}
    </div>
    </div>
    )
  }
}
  

  export default BlockEnhanced;
