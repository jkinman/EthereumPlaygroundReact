import React from 'react';
import './ethereum.scss';

import TransactionBlob from './TransactionBlob'

const BlockEnhanced = props => {

  return(
    <div className="block">
    <h1 onClick={ () => props.showBlock(props.block) } >{`Block # ${props.block.number}`}</h1>
    <div key={props.index} className="blockEnhanced">
      {props.block.pixelArray.map( (transaction, i) => 
      <TransactionBlob pixels={transaction} showTransactionDetails={props.showTransactionDetails} toolTipCB={ props.toolTipCB } transaction={props.block.transactions[i]} key={i} /> )}
    </div>
    </div>
    )
  }

  export default BlockEnhanced;
